import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

export default class TabunganController {
  /**
   * GET /api/v1/tabungan/summary
   * Ringkasan Saldo Tabungan Seluruh Murid (Untuk Tabel Atas UI)
   */
  public async summary({ request, response }: HttpContext) {
    try {
      const { kelasId, search } = request.qs()

      const whereClause: any = {}

      if (kelasId) {
        whereClause.kelasId = kelasId
      }

      if (search) {
        whereClause.namaLengkap = {
          contains: search,
        }
      }

      const listSiswa = await prisma.siswa.findMany({
        where: whereClause,
        select: {
          id: true,
          nis: true,
          namaLengkap: true,
          saldoTabungan: true,
          kelas: {
            select: {
              id: true,
              namaKelas: true,
            },
          },
        },
        orderBy: {
          namaLengkap: 'asc',
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil ringkasan saldo tabungan murid',
        data: listSiswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil ringkasan tabungan',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/tabungan/siswa/:siswaId
   * Buku Rekening Tabungan Personal Murid (Untuk Tabel Bawah UI)
   */
  public async showBySiswa({ params, response }: HttpContext) {
    try {
      const siswa = await prisma.siswa.findUnique({
        where: { id: params.siswaId },
        include: { kelas: true },
      })

      if (!siswa) {
        return response.notFound({ success: false, message: 'Data siswa tidak ditemukan' })
      }

      // Ambil seluruh mutasi tabungan milik siswa ini
      const listMutasi = await prisma.mutasiTabungan.findMany({
        where: {
          siswaId: params.siswaId,
          deletedAt: null,
        },
        include: {
          petugas: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
        orderBy: {
          tanggal: 'desc',
        },
      })

      return response.ok({
        success: true,
        message: `Berhasil mengambil riwayat tabungan ${siswa.namaLengkap}`,
        siswa: {
          id: siswa.id,
          namaLengkap: siswa.namaLengkap,
          kelas: siswa.kelas?.namaKelas || '-',
          saldoSaatIni: Number(siswa.saldoTabungan),
        },
        data: listMutasi,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil riwayat mutasi tabungan',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/tabungan/mutasi
   * Catat Mutasi Tabungan Baru (Setoran DEBET / Penarikan KREDIT)
   */
  public async storeMutasi({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser
      const { siswaId, jenisMutasi, nominal, keterangan, tanggal } = request.only([
        'siswaId',
        'jenisMutasi', // DEBET | KREDIT
        'nominal',
        'keterangan',
        'tanggal',
      ])

      if (!siswaId || !jenisMutasi || !nominal) {
        return response.badRequest({
          success: false,
          message: 'Siswa, jenis mutasi, dan nominal wajib diisi',
        })
      }

      const amount = Number(nominal)
      if (amount <= 0) {
        return response.badRequest({ success: false, message: 'Nominal harus lebih dari 0' })
      }

      // $transaction agar kalkulasi saldo & pencatatan mutasi aman dari race condition
      const result = await prisma.$transaction(async (tx) => {
        const siswa = await tx.siswa.findUnique({
          where: { id: siswaId },
        })

        if (!siswa) {
          throw new Error('Siswa tidak ditemukan')
        }

        const saldoAwal = Number(siswa.saldoTabungan)
        let saldoAkhir = saldoAwal

        if (jenisMutasi === 'DEBET') {
          // Setoran -> Saldo bertambah
          saldoAkhir = saldoAwal + amount
        } else if (jenisMutasi === 'KREDIT') {
          // Penarikan -> Saldo berkurang (Validasi kecukupan saldo)
          if (saldoAwal < amount) {
            throw new Error(`Saldo tidak mencukupi! Saldo saat ini: Rp ${saldoAwal.toLocaleString('id-ID')}`)
          }
          saldoAkhir = saldoAwal - amount
        } else {
          throw new Error('Jenis mutasi tidak valid (Gunakan DEBET atau KREDIT)')
        }

        // 1. Update Saldo Terkini di Model Siswa
        await tx.siswa.update({
          where: { id: siswaId },
          data: { saldoTabungan: saldoAkhir },
        })

        // 2. Buat Record Mutasi Tabungan
        const mutasi = await tx.mutasiTabungan.create({
          data: {
            siswaId,
            jenisMutasi,
            nominal: amount,
            saldoSebelum: saldoAwal,
            saldoSesudah: saldoAkhir,
            keterangan: keterangan || (jenisMutasi === 'DEBET' ? 'Setoran Tabungan' : 'Penarikan Tabungan'),
            tanggal: tanggal ? new Date(tanggal) : new Date(),
            petugasId: authUser?.id || null,
          },
          include: {
            petugas: { select: { nama: true } },
          },
        })

        return mutasi
      })

      return response.created({
        success: true,
        message: 'Berhasil mencatat mutasi tabungan',
        data: result,
      })
    } catch (error: any) {
      return response.badRequest({
        success: false,
        message: error.message || 'Gagal mencatat mutasi tabungan',
      })
    }
  }

  /**
   * DELETE /api/v1/tabungan/mutasi/:id
   * Soft Delete Mutasi Tabungan + Revert Saldo Otomatis
   */
  public async destroyMutasi({ params, response }: HttpContext) {
    try {
      await prisma.$transaction(async (tx) => {
        const mutasi = await tx.mutasiTabungan.findFirst({
          where: { id: params.id, deletedAt: null },
        })

        if (!mutasi) {
          throw new Error('Mutasi tabungan tidak ditemukan atau sudah dihapus')
        }

        const siswa = await tx.siswa.findUnique({
          where: { id: mutasi.siswaId },
        })

        if (!siswa) {
          throw new Error('Data siswa tidak ditemukan')
        }

        const currentSaldo = Number(siswa.saldoTabungan)
        const amount = Number(mutasi.nominal)
        let newSaldo = currentSaldo

        // Kembalikan efek transaksi (Revert Balance)
        if (mutasi.jenisMutasi === 'DEBET') {
          // Dulu setoran, pas dibatalkan maka saldo dikurangi
          newSaldo = currentSaldo - amount
        } else if (mutasi.jenisMutasi === 'KREDIT') {
          // Dulu penarikan, pas dibatalkan maka saldo dikembalikan (ditambah)
          newSaldo = currentSaldo + amount
        }

        // 1. Update Saldo Siswa
        await tx.siswa.update({
          where: { id: mutasi.siswaId },
          data: { saldoTabungan: newSaldo },
        })

        // 2. Set Soft Delete pada Mutasi
        await tx.mutasiTabungan.update({
          where: { id: params.id },
          data: { deletedAt: new Date() },
        })
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus mutasi dan mengembalikan saldo siswa',
      })
    } catch (error: any) {
      return response.badRequest({
        success: false,
        message: error.message || 'Gagal menghapus mutasi tabungan',
      })
    }
  }
    /**
     * PUT /api/v1/tabungan/mutasi/:id/restore
     * Mengembalikan mutasi tabungan yang ter-soft-delete + Auto recalculate saldo siswa
     */
  public async restoreMutasi({ params, response }: HttpContext) {
    try {
        await prisma.$transaction(async (tx) => {
        // 1. Cari mutasi yang sedang ter-soft-delete
        const mutasi = await tx.mutasiTabungan.findFirst({
            where: {
            id: params.id,
            deletedAt: { not: null },
            },
        })

        if (!mutasi) {
            throw new Error('Mutasi tabungan tidak ditemukan atau tidak dalam status terhapus')
        }

        const siswa = await tx.siswa.findUnique({
            where: { id: mutasi.siswaId },
        })

        if (!siswa) {
            throw new Error('Data siswa tidak ditemukan')
        }

        const currentSaldo = Number(siswa.saldoTabungan)
        const amount = Number(mutasi.nominal)
        let newSaldo = currentSaldo

        // 2. Terapkan kembali efek transaksi ke Saldo Siswa
        if (mutasi.jenisMutasi === 'DEBET') {
            // Dulu setoran yang dibatalkan, sekarang di-restore -> Saldo bertambah lagi
            newSaldo = currentSaldo + amount
        } else if (mutasi.jenisMutasi === 'KREDIT') {
            // Dulu penarikan yang dibatalkan, sekarang di-restore -> Saldo berkurang lagi (Cek kecukupan saldo)
            if (currentSaldo < amount) {
            throw new Error(`Gagal restore! Saldo siswa saat ini (Rp ${currentSaldo.toLocaleString('id-ID')}) tidak cukup untuk menampung penarikan Rp ${amount.toLocaleString('id-ID')}`)
            }
            newSaldo = currentSaldo - amount
        }

        // 3. Update Saldo Siswa
        await tx.siswa.update({
            where: { id: mutasi.siswaId },
            data: { saldoTabungan: newSaldo },
        })

        // 4. Reset deletedAt menjadi null
        await tx.mutasiTabungan.update({
            where: { id: params.id },
            data: { deletedAt: null },
        })
        })

        return response.ok({
        success: true,
        message: 'Berhasil mengembalikan mutasi tabungan dan memperbarui saldo siswa',
        })
    } catch (error: any) {
        return response.badRequest({
        success: false,
        message: error.message || 'Gagal mengembalikan mutasi tabungan',
        })
    }
  }
}