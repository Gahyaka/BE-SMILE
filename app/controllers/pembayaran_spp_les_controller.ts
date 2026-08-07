import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

// Helper sederhana pembuat Nomor Kwitansi Otomatis: KW-SPP-202608-XXXX
function generateKwitansi(): string {
  const dateStr = new Date().toISOString().slice(0, 7).replace('-', '')
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return `KW-SPP-${dateStr}-${randomNum}`
}

export default class PembayaranSppLesController {
  /**
   * GET /api/v1/pembayaran-spp-les
   * Ambil List Transaksi + Hitung Kas Riil & Kas Pending untuk Card Atas UI
   */
  public async index({ request, response }: HttpContext) {
    try {
      const { tahun, statusSetoran } = request.qs()

      const whereClause: any = {
        deletedAt: null,
      }

    if (statusSetoran) {
            whereClause.statusSetoran = statusSetoran
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
   * POST /api/v1/pembayaran-spp-les
   * Simpan Pembayaran SPP & Les Baru
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
      } = request.only([
        'siswaId',
        'tanggalBayar',
        'nominalSpp',
        'nominalLes',
        'catatan',
        'statusSetoran',
      ])

      if (!siswaId || !tanggalBayar) {
        return response.badRequest({
          success: false,
          message: 'Siswa dan Tanggal Bayar wajib diisi',
        })
      }

      const totalBayar = Number(nominalSpp) + Number(nominalLes)

      if (totalBayar <= 0) {
        return response.badRequest({
          success: false,
          message: 'Total pembayaran harus lebih besar dari 0',
        })
      }

      const dateObj = new Date(tanggalBayar)

      const newTransaksi = await prisma.transaksiSpp.create({
        data: {
          nomorKwitansi: generateKwitansi(),
          siswaId,
          tanggalBayar: dateObj,
          bulan: dateObj.getMonth() + 1,
          tahun: dateObj.getFullYear(),
          nominalSpp,
          nominalLes,
          totalBayar,
          catatan,
          statusSetoran,
          petugasId: authUser?.id || null, // Mencatat admin/petugas yang menginput
        },
        include: {
          siswa: true,
        },
      })

      return response.created({
        success: true,
        message: 'Berhasil mencatat transaksi pembayaran SPP & Les',
        data: newTransaksi,
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