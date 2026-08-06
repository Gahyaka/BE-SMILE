import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

export default class KelasController {
  /**
   * GET /api/v1/kelas (Get All Kelas)
   */
  public async index({ response }: HttpContext) {
    try {
      const kelasList = await prisma.kelas.findMany({
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
      const { namaKelas, tahunAjaran, waliKelas } = request.body()

      if (!namaKelas || !tahunAjaran) {
        return response.badRequest({
          success: false,
          message: 'Nama kelas dan tahun ajaran wajib diisi',
        })
      }

      const newKelas = await prisma.kelas.create({
        data: {
          namaKelas,
          tahunAjaran,
          waliKelas: waliKelas || null,
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
      const { namaKelas, tahunAjaran, waliKelas } = request.body()

      const updatedKelas = await prisma.kelas.update({
        where: { id: params.id },
        data: {
          ...(namaKelas && { namaKelas }),
          ...(tahunAjaran && { tahunAjaran }),
          ...(waliKelas !== undefined && { waliKelas }),
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