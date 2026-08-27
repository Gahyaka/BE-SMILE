import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

// Helper sederhana pembuat Nomor Kwitansi Otomatis: KW-SPP-202608-XXXX
function generateKwitansi(): string {
  const dateStr = new Date().toISOString().slice(0, 7).replace('-', '')
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return `KW-SPP-${dateStr}-${randomNum}`
}

// 12 Bulan Tahun Ajaran PAUD (Juli s.d. Juni)
const DAFTAR_BULAN_TAHUN_AJARAN = [
  { key: 'JULI', nomorBulan: 7 },
  { key: 'AGUSTUS', nomorBulan: 8 },
  { key: 'SEPTEMBER', nomorBulan: 9 },
  { key: 'OKTOBER', nomorBulan: 10 },
  { key: 'NOVEMBER', nomorBulan: 11 },
  { key: 'DESEMBER', nomorBulan: 12 },
  { key: 'JANUARI', nomorBulan: 1 },
  { key: 'FEBRUARI', nomorBulan: 2 },
  { key: 'MARET', nomorBulan: 3 },
  { key: 'APRIL', nomorBulan: 4 },
  { key: 'MEI', nomorBulan: 5 },
  { key: 'JUNI', nomorBulan: 6 },
]

export default class PembayaranSppLesController {
  /**
   * GET /api/v1/pembayaran-spp-les
   * Ambil List Transaksi + Hitung Kas Riil & Kas Pending untuk Card Atas UI
   */
  public async index({ request, response }: HttpContext) {
    try {
      const { tahun, statusSetoran, kelasId } = request.qs()

      const whereClause: any = {
        deletedAt: null,
      }

      if (statusSetoran) {
        whereClause.statusSetoran = statusSetoran
      }

      if (kelasId) {
        whereClause.siswa = { kelasId }
      }

      if (tahun) {
        whereClause.tanggalBayar = {
          gte: new Date(`${tahun}-01-01T00:00:00.000Z`),
          lte: new Date(`${tahun}-12-31T23:59:59.999Z`),
        }
      }

      const listTransaksi = await prisma.transaksiSpp.findMany({
        where: whereClause,
        include: {
          siswa: {
            include: {
              kelas: true,
            },
          },
          petugas: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
        orderBy: {
          tanggalBayar: 'desc',
        },
      })

      // Hitung Kas Riil (Sudah Disetor) & Kas Pending (Belum Disetor)
      const kasRiil = await prisma.transaksiSpp.aggregate({
        _sum: { totalBayar: true },
        where: { ...whereClause, statusSetoran: 'SUDAH' },
      })

      const kasPending = await prisma.transaksiSpp.aggregate({
        _sum: { totalBayar: true },
        where: { ...whereClause, statusSetoran: 'BELUM' },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil data pencatatan SPP & Les',
        summary: {
          kasRiil: Number(kasRiil._sum.totalBayar || 0),
          kasPending: Number(kasPending._sum.totalBayar || 0),
        },
        data: listTransaksi,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil data transaksi',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/pembayaran-spp-les/matriks
   * Matriks Monitoring SPP (Juli s.d. Juni) + Total Murid / Lunas / Tunggakan
   */
  public async matriks({ request, response }: HttpContext) {
    try {
      const { tahunAjaran = '2026/2027', kelasId } = request.qs()

      const siswaList = await prisma.siswa.findMany({
        where: {
          ...(kelasId && { kelasId }),
        },
        include: {
          kelas: {
            select: { id: true, namaKelas: true },
          },
          transaksiSpp: {
            where: {
              deletedAt: null,
              nominalSpp: { gt: 0 },
            },
          },
        },
        orderBy: { namaLengkap: 'asc' },
      })

      let countLunas = 0
      let countTunggakan = 0

      const matriksData = siswaList.map((siswa) => {
        const paidMonths = new Set(
          siswa.transaksiSpp.map((t) => Number(t.bulan))
        )

        const statusBulan: Record<string, boolean> = {}
        let bulanTerbayarCount = 0

        DAFTAR_BULAN_TAHUN_AJARAN.forEach((b) => {
          const isLunas = paidMonths.has(b.nomorBulan)
          statusBulan[b.key] = isLunas
          if (isLunas) bulanTerbayarCount++
        })

        if (bulanTerbayarCount === 12) {
          countLunas++
        } else {
          countTunggakan++
        }

        return {
          siswaId: siswa.id,
          namaLengkap: siswa.namaLengkap,
          nisn: siswa.nisn,
          kelas: siswa.kelas ? siswa.kelas.namaKelas : '-',
          totalBulanLunas: bulanTerbayarCount,
          totalTunggakanBulan: 12 - bulanTerbayarCount,
          matriks: statusBulan,
        }
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil matriks monitoring SPP',
        summary: {
          totalMurid: siswaList.length,
          lunasSpp: countLunas,
          tunggakan: countTunggakan,
          tahunAjaran,
        },
        data: matriksData,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil matriks SPP',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/pembayaran-spp-les
   * Simpan Pembayaran SPP & Les Baru (Support Single & Multi-Bulan)
   */
public async store({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser

      const {
        siswaId,
        tanggalBayar,
        nominalSpp = 0,
        nominalLes = 0,
        catatan,
        statusSetoran = 'BELUM',
        bulanList,
        tahunAjaran,
      } = request.only([
        'siswaId',
        'tanggalBayar',
        'nominalSpp',
        'nominalLes',
        'catatan',
        'statusSetoran',
        'bulanList',
        'tahunAjaran',
      ])

      if (!siswaId || !tanggalBayar) {
        return response.badRequest({
          success: false,
          message: 'Siswa dan Tanggal Bayar wajib diisi',
        })
      }

      // Pastikan petugasId valid jika ada authUser
      let validPetugasId: string | null = null
      if (authUser?.id) {
        const checkUser = await prisma.user.findUnique({
          where: { id: authUser.id },
          select: { id: true },
        })
        if (checkUser) {
          validPetugasId = checkUser.id
        }
      }

      const dateObj = new Date(tanggalBayar)

      if (Array.isArray(bulanList) && bulanList.length > 0) {
        const sppPerBulan = Number(nominalSpp)
        const lesPerBulan = Number(nominalLes)
        const totalPerBulan = sppPerBulan + lesPerBulan

        if (totalPerBulan <= 0) {
          return response.badRequest({
            success: false,
            message: 'Total pembayaran per bulan harus lebih besar dari 0',
          })
        }

        // 1. Ambil semua data (aktif maupun soft-deleted) untuk bulan yang diminta
        const existingPayments = await prisma.transaksiSpp.findMany({
          where: {
            siswaId,
            OR: bulanList.map((item: { bulan: number; tahun: number }) => ({
              bulan: Number(item.bulan),
              tahun: Number(item.tahun),
            })),
          },
        })

        // 2. Cek apakah ada yang statusnya MASIH AKTIF (deletedAt === null)
        const activePayments = existingPayments.filter((p) => p.deletedAt === null)
        if (activePayments.length > 0) {
          const daftarBulanSudahBayar = activePayments
            .map((p) => `Bulan ${p.bulan}/${p.tahun}`)
            .join(', ')
          return response.conflict({
            success: false,
            message: `Pembayaran ditolak: ${daftarBulanSudahBayar} sudah pernah dibayar sebelumnya.`,
          })
        }

        // 3. Eksekusi Upsert / Restore dalam transaksi database
        const createdBatch = await prisma.$transaction(
          bulanList.map((item: { bulan: number; tahun: number }) => {
            const b = Number(item.bulan)
            const t = Number(item.tahun)
            const softDeleted = existingPayments.find(
              (p) => p.bulan === b && p.tahun === t && p.deletedAt !== null
            )

            const payloadData = {
              nomorKwitansi: generateKwitansi(),
              siswaId,
              tanggalBayar: dateObj,
              bulan: b,
              tahun: t,
              tahunAjaran: tahunAjaran || '2026/2027',
              nominalSpp: sppPerBulan,
              nominalLes: lesPerBulan,
              totalBayar: totalPerBulan,
              catatan: catatan || `Pembayaran periode bulan ${b}/${t}`,
              statusSetoran,
              petugasId: validPetugasId,
              deletedAt: null, // Pulihkan jika sebelumnya soft-deleted
            }

            if (softDeleted) {
              return prisma.transaksiSpp.update({
                where: { id: softDeleted.id },
                data: payloadData,
                include: { siswa: true },
              })
            }

            return prisma.transaksiSpp.create({
              data: payloadData,
              include: { siswa: true },
            })
          })
        )

        return response.created({
          success: true,
          message: `Berhasil mencatat transaksi pembayaran SPP & Les untuk ${createdBatch.length} bulan`,
          totalKeseluruhan: totalPerBulan * createdBatch.length,
          data: createdBatch,
        })
      }

      const targetBulan = dateObj.getMonth() + 1
      const targetTahun = dateObj.getFullYear()

      // Cek apakah bulan tersebut sudah ada di database
      const existingPayment = await prisma.transaksiSpp.findFirst({
        where: {
          siswaId,
          bulan: targetBulan,
          tahun: targetTahun,
        },
      })

      // Jika data ada dan MASIH AKTIF, tolak
      if (existingPayment && existingPayment.deletedAt === null) {
        return response.conflict({
          success: false,
          message: `Siswa ini sudah membayar SPP untuk periode Bulan ${targetBulan}/${targetTahun}.`,
        })
      }

      const totalBayar = Number(nominalSpp) + Number(nominalLes)

      if (totalBayar <= 0) {
        return response.badRequest({
          success: false,
          message: 'Total pembayaran harus lebih besar dari 0',
        })
      }

      const singlePayload = {
        nomorKwitansi: generateKwitansi(),
        siswaId,
        tanggalBayar: dateObj,
        bulan: targetBulan,
        tahun: targetTahun,
        tahunAjaran: tahunAjaran || '2026/2027',
        nominalSpp,
        nominalLes,
        totalBayar,
        catatan,
        statusSetoran,
        petugasId: validPetugasId,
        deletedAt: null,
      }

      let resultTransaksi

      if (existingPayment && existingPayment.deletedAt !== null) {
        // Restore data lama yang pernah di-soft delete
        resultTransaksi = await prisma.transaksiSpp.update({
          where: { id: existingPayment.id },
          data: singlePayload,
          include: { siswa: true },
        })
      } else {
        // Buat data baru
        resultTransaksi = await prisma.transaksiSpp.create({
          data: singlePayload,
          include: { siswa: true },
        })
      }

      return response.created({
        success: true,
        message: 'Berhasil mencatat transaksi pembayaran SPP & Les',
        data: resultTransaksi,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mencatat transaksi',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/pembayaran-spp-les/:id
   * Update Transaksi (Misal perbaiki nominal, catatan, atau ubah status setoran dari BELUM ke SUDAH)
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      // 1. Cek apakah transaksi ada dan belum di-soft-delete
      const transaksi = await prisma.transaksiSpp.findFirst({
        where: {
          id: params.id,
          deletedAt: null,
        },
      })

      if (!transaksi) {
        return response.notFound({
          success: false,
          message: 'Transaksi tidak ditemukan atau sudah dihapus',
        })
      }

      const { nominalSpp, nominalLes, catatan, statusSetoran, tanggalBayar } = request.only([
        'nominalSpp',
        'nominalLes',
        'catatan',
        'statusSetoran',
        'tanggalBayar',
      ])

      // Hitung ulang totalBayar jika ada perubahan nominal
      const newSpp = nominalSpp !== undefined ? Number(nominalSpp) : Number(transaksi.nominalSpp)
      const newLes = nominalLes !== undefined ? Number(nominalLes) : Number(transaksi.nominalLes)
      const totalBayar = newSpp + newLes

      if (totalBayar <= 0) {
        return response.badRequest({
          success: false,
          message: 'Total nominal pembayaran harus lebih dari 0',
        })
      }

      // 2. Eksekusi Update Data
      const updated = await prisma.transaksiSpp.update({
        where: { id: params.id },
        data: {
          ...(nominalSpp !== undefined && { nominalSpp: newSpp }),
          ...(nominalLes !== undefined && { nominalLes: newLes }),
          totalBayar,
          ...(catatan !== undefined && { catatan }),
          ...(statusSetoran && { statusSetoran }),
          ...(tanggalBayar && { tanggalBayar: new Date(tanggalBayar) }),
        },
        include: {
          siswa: true,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui data transaksi',
        data: updated,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui transaksi',
        error: error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      // Cek apakah data transaksi ada dan belum di-soft-delete
      const transaksi = await prisma.transaksiSpp.findFirst({
        where: {
          id: params.id,
          deletedAt: null,
        },
      })

      if (!transaksi) {
        return response.notFound({
          success: false,
          message: 'Transaksi tidak ditemukan atau sudah dihapus',
        })
      }

      // Lakukan Soft Delete dengan me-update timestamp deletedAt
      await prisma.transaksiSpp.update({
        where: { id: params.id },
        data: {
          deletedAt: new Date(),
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus catatan transaksi (Soft Delete)',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus transaksi',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/pembayaran-spp-les/:id/restore
   * Mengembalikan transaksi yang ter-soft-delete
   */
  public async restore({ params, response }: HttpContext) {
    try {
      // 1. Cek apakah transaksi ada di DB (tanpa filter deletedAt dulu)
      const transaksi = await prisma.transaksiSpp.findUnique({
        where: { id: params.id },
      })

      // Jika transaksi memang tidak ada di DB
      if (!transaksi) {
        return response.notFound({
          success: false,
          message: 'Data transaksi tidak ditemukan',
        })
      }

      // 2. Cek apakah transaksi sedang TIDAK terhapus (deletedAt === null)
      if (transaksi.deletedAt === null) {
        return response.badRequest({
          success: false,
          message: 'Transaksi ini tidak dalam status terhapus (sudah aktif)',
        })
      }

      // 3. Kembalikan deletedAt menjadi null
      const restored = await prisma.transaksiSpp.update({
        where: { id: params.id },
        data: {
          deletedAt: null,
        },
        include: {
          siswa: true,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengembalikan catatan transaksi',
        data: restored,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengembalikan transaksi',
        error: error.message,
      })
    }
  }
}