import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

export default class SiswaController {
  /**
   * GET /api/v1/siswa (Get All Siswa)
   */
  public async index({ request, response }: HttpContext) {
    try {
      const { search, kelasId } = request.qs()

      const siswaList = await prisma.siswa.findMany({
        where: {
          ...(kelasId && { kelasId }),
          ...(search && {
            OR: [
              { namaLengkap: { contains: search } },
              { nis: { contains: search } },
            ],
          }),
        },
        include: {
          kelas: {
            select: {
              id: true,
              namaKelas: true,
              tahunAjaran: true,
              waliKelas: true,
            },
          },
        },
        orderBy: { namaLengkap: 'asc' },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil data siswa',
        data: siswaList,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil data siswa',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/siswa (Tambah Siswa Baru)
   */
  public async store({ request, response }: HttpContext) {
    try {
      const { nis, namaLengkap, namaOrangTua, kelasId } = request.body()

      if (!namaLengkap || !namaOrangTua) {
        return response.badRequest({
          success: false,
          message: 'Nama lengkap dan nama orang tua wajib diisi',
        })
      }

      // Cek jika NIS sudah ada
      if (nis) {
        const existingSiswa = await prisma.siswa.findUnique({
          where: { nis },
        })

        if (existingSiswa) {
          return response.conflict({
            success: false,
            message: 'NIS sudah terdaftar',
          })
        }
      }

      const newSiswa = await prisma.siswa.create({
        data: {
          nis: nis || null,
          namaLengkap,
          namaOrangTua,
          kelasId: kelasId || null,
        },
        include: {
          kelas: true,
        },
      })

      return response.created({
        success: true,
        message: 'Berhasil menambahkan data siswa',
        data: newSiswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menambahkan data siswa',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/siswa/:id (Detail Siswa + Riwayat SPP & Tabungan)
   */
  public async show({ params, response }: HttpContext) {
    try {
      const siswa = await prisma.siswa.findUnique({
        where: { id: params.id },
        include: {
          kelas: true,
          spp: {
            orderBy: { createdAt: 'desc' },
            take: 5, // 5 Transaksi SPP terakhir
          },
          tabungan: {
            orderBy: { createdAt: 'desc' },
            take: 5, // 5 Mutasi Tabungan terakhir
          },
        },
      })

      if (!siswa) {
        return response.notFound({
          success: false,
          message: 'Data siswa tidak ditemukan',
        })
      }

      return response.ok({
        success: true,
        message: 'Detail siswa berhasil diambil',
        data: siswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil detail siswa',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/siswa/:id (Update Data Siswa)
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const { nis, namaLengkap, namaOrangTua, kelasId } = request.body()

      const updatedSiswa = await prisma.siswa.update({
        where: { id: params.id },
        data: {
          ...(nis !== undefined && { nis }),
          ...(namaLengkap && { namaLengkap }),
          ...(namaOrangTua && { namaOrangTua }),
          ...(kelasId !== undefined && { kelasId }),
        },
        include: {
          kelas: true,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui data siswa',
        data: updatedSiswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui data siswa',
        error: error.message,
      })
    }
  }

  /**
   * DELETE /api/v1/siswa/:id (Hapus Siswa)
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await prisma.siswa.delete({
        where: { id: params.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus data siswa',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus data siswa',
        error: error.message,
      })
    }
  }
}