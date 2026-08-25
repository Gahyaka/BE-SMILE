import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

export default class KelasController {
  /**
   * GET /api/v1/kelas (Get All Kelas)
   */
  public async index({ request, response }: HttpContext) {
      try {
        const authUser = (request as any).authUser

        // Filter dasar
        let whereCondition: any = {}

        // Jika role GURU: Batasi hanya melihat kelas yang dia ampu
        if (authUser?.role === 'GURU') {
          whereCondition = {
            OR: [
              { guruId: authUser.id },
              { waliKelas: authUser.namaLengkap || authUser.nama || '' },
            ],
          }
        }

        const kelasList = await prisma.kelas.findMany({
          where: whereCondition,
          include: {
            _count: {
              select: { siswa: true }, // Menghitung jumlah siswa di tiap kelas
            },
          },
          orderBy: { namaKelas: 'asc' },
        })

        return response.ok({
          success: true,
          message: 'Berhasil mengambil daftar kelas',
          data: kelasList,
        })
      } catch (error: any) {
        return response.internalServerError({
          success: false,
          message: 'Gagal mengambil data kelas',
          error: error.message,
        })
      }
    }

  /**
   * POST /api/v1/kelas (Create Kelas Baru)
   */
  public async store({ request, response }: HttpContext) {
      try {
        const { namaKelas, tahunAjaran, guruId, waliKelas } = request.body()

        if (!namaKelas || !tahunAjaran) {
          return response.badRequest({
            success: false,
            message: 'Nama kelas dan tahun ajaran wajib diisi',
          })
        }

        // Cek duplikasi nama kelas pada tahun ajaran yang sama
        const existingKelas = await prisma.kelas.findFirst({
          where: {
            namaKelas: namaKelas.trim(),
            tahunAjaran: tahunAjaran.trim(),
          },
        })

        if (existingKelas) {
          return response.badRequest({
            success: false,
            message: `Kelas '${namaKelas}' pada tahun ajaran '${tahunAjaran}' sudah ada`,
          })
        }

        let namaWali = waliKelas || null

        if (guruId) {
          const guru = await prisma.user.findUnique({
            where: { id: guruId },
            select: {
              nama: true,
            },
          })

          if (guru?.nama) {
            namaWali = guru.nama
          }
        }

        const newKelas = await prisma.kelas.create({
          data: {
            namaKelas: namaKelas.trim(),
            tahunAjaran: tahunAjaran.trim(),
            guruId: guruId || null,
            waliKelas: namaWali,
          },
          include: {
            guru: {
              select: {
                id: true,
                nama: true,
                username: true,
              },
            },
          },
        })

        return response.created({
          success: true,
          message: 'Berhasil membuat kelas baru',
          data: newKelas,
        })
      } catch (error: any) {
        return response.internalServerError({
          success: false,
          message: 'Gagal membuat kelas baru',
          error: error.message,
        })
      }
    }

  /**
   * GET /api/v1/kelas/:id (Get Detail Kelas + List Siswanya)
   */
  public async show({ params, response }: HttpContext) {
    try {
      const kelas = await prisma.kelas.findUnique({
        where: { id: params.id },
        include: {
          siswa: true, // Ambil semua data siswa di kelas ini
        },
      })

      if (!kelas) {
        return response.notFound({
          success: false,
          message: 'Data kelas tidak ditemukan',
        })
      }

      return response.ok({
        success: true,
        message: 'Detail kelas berhasil diambil',
        data: kelas,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil detail kelas',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/kelas/:id (Update Kelas)
   */
  public async update({ params, request, response }: HttpContext) {
      try {
        const { namaKelas, tahunAjaran, guruId, waliKelas } = request.body()

        const currentKelas = await prisma.kelas.findUnique({
          where: { id: params.id },
        })

        if (!currentKelas) {
          return response.notFound({
            success: false,
            message: 'Data kelas tidak ditemukan',
          })
        }

        // Cek duplikasi jika namaKelas atau tahunAjaran diubah
        if (namaKelas || tahunAjaran) {
          const checkNama = (namaKelas || currentKelas.namaKelas).trim()
          const checkTahun = (tahunAjaran || currentKelas.tahunAjaran).trim()

          const duplicate = await prisma.kelas.findFirst({
            where: {
              namaKelas: checkNama,
              tahunAjaran: checkTahun,
              NOT: { id: params.id },
            },
          })

          if (duplicate) {
            return response.badRequest({
              success: false,
              message: `Kelas '${checkNama}' pada tahun ajaran '${checkTahun}' sudah terdaftar`,
            })
          }
        }

        let namaWali = waliKelas

        if (guruId !== undefined) {
          if (guruId) {
            const guru = await prisma.user.findUnique({
              where: { id: guruId },
              select: {
                nama: true,
              },
            })
            if (guru?.nama) {
              namaWali = guru.nama
            }
          } else {
            namaWali = null
          }
        }

        const updatedKelas = await prisma.kelas.update({
          where: { id: params.id },
          data: {
            ...(namaKelas && { namaKelas: namaKelas.trim() }),
            ...(tahunAjaran && { tahunAjaran: tahunAjaran.trim() }),
            ...(guruId !== undefined && { guruId: guruId || null }),
            ...(namaWali !== undefined && { waliKelas: namaWali }),
          },
          include: {
            guru: {
              select: {
                id: true,
                nama: true,
                username: true,
              },
            },
            _count: {
              select: { siswa: true },
            },
          },
        })

        return response.ok({
          success: true,
          message: 'Berhasil memperbarui data kelas',
          data: updatedKelas,
        })
      } catch (error: any) {
        return response.internalServerError({
          success: false,
          message: 'Gagal memperbarui data kelas',
          error: error.message,
        })
      }
    }

  /**
   * DELETE /api/v1/kelas/:id (Hapus Kelas)
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await prisma.kelas.delete({
        where: { id: params.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus kelas',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus kelas',
        error: error.message,
      })
    }
  }
}