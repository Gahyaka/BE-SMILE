import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'

export default class MurojaahController {
  // ==========================================
  // 1. CRUD KATEGORI MUROJAAH
  // ==========================================

  /**
   * GET /api/v1/murojaah/kategori
   * Get All Master Kategori beserta daftar Materi di dalamnya
   */
  public async getMasterData({ response }: HttpContext) {
    try {
      const data = await prisma.kategoriMurojaah.findMany({
        orderBy: { urutan: 'asc' },
        include: {
          materi: {
            orderBy: { urutan: 'asc' },
          },
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil master data murojaah',
        data,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil master data murojaah',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/murojaah/kategori
   * Create Kategori Murojaah Baru
   */
  public async storeKategori({ request, response }: HttpContext) {
    try {
      const { nama, urutan } = request.only(['nama', 'urutan'])

      if (!nama) {
        return response.badRequest({ success: false, message: 'Nama kategori wajib diisi' })
      }

      const kategori = await prisma.kategoriMurojaah.create({
        data: {
          nama,
          urutan: urutan ? Number(urutan) : 0,
        },
      })

      return response.created({
        success: true,
        message: 'Berhasil menambahkan kategori murojaah',
        data: kategori,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menambahkan kategori murojaah',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/murojaah/kategori/:id
   * Update Kategori Murojaah
   */
  public async updateKategori({ params, request, response }: HttpContext) {
    try {
      const { nama, urutan } = request.only(['nama', 'urutan'])

      const kategori = await prisma.kategoriMurojaah.findUnique({
        where: { id: params.id },
      })

      if (!kategori) {
        return response.notFound({ success: false, message: 'Kategori tidak ditemukan' })
      }

      const updated = await prisma.kategoriMurojaah.update({
        where: { id: params.id },
        data: {
          ...(nama && { nama }),
          ...(urutan !== undefined && { urutan: Number(urutan) }),
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui kategori murojaah',
        data: updated,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui kategori murojaah',
        error: error.message,
      })
    }
  }

  /**
   * DELETE /api/v1/murojaah/kategori/:id
   * Delete Kategori Murojaah (Otomatis menghapus materi & nilai di dalamnya)
   */
  public async destroyKategori({ params, response }: HttpContext) {
    try {
      const kategori = await prisma.kategoriMurojaah.findUnique({
        where: { id: params.id },
      })

      if (!kategori) {
        return response.notFound({ success: false, message: 'Kategori tidak ditemukan' })
      }

      await prisma.kategoriMurojaah.delete({
        where: { id: params.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus kategori beserta materi di dalamnya',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus kategori murojaah',
        error: error.message,
      })
    }
  }
  /**
   * POST /api/v1/murojaah/materi
   * Create Materi/Item Murojaah Baru
   */
  public async storeMateri({ request, response }: HttpContext) {
    try {
      const { kategoriId, nama, urutan } = request.only(['kategoriId', 'nama', 'urutan'])

      if (!kategoriId || !nama) {
        return response.badRequest({
          success: false,
          message: 'Kategori dan nama materi wajib diisi',
        })
      }

      const materi = await prisma.materiMurojaah.create({
        data: {
          kategoriId,
          nama,
          urutan: urutan ? Number(urutan) : 0,
        },
      })

      return response.created({
        success: true,
        message: 'Berhasil menambahkan materi murojaah',
        data: materi,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menambahkan materi murojaah',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/murojaah/materi/:id
   * Update Materi Murojaah
   */
  public async updateMateri({ params, request, response }: HttpContext) {
    try {
      const { kategoriId, nama, urutan } = request.only(['kategoriId', 'nama', 'urutan'])

      const materi = await prisma.materiMurojaah.findUnique({
        where: { id: params.id },
      })

      if (!materi) {
        return response.notFound({ success: false, message: 'Materi tidak ditemukan' })
      }

      const updated = await prisma.materiMurojaah.update({
        where: { id: params.id },
        data: {
          ...(kategoriId && { kategoriId }),
          ...(nama && { nama }),
          ...(urutan !== undefined && { urutan: Number(urutan) }),
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui materi murojaah',
        data: updated,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui materi murojaah',
        error: error.message,
      })
    }
  }

  /**
   * DELETE /api/v1/murojaah/materi/:id
   * Delete Materi Murojaah
   */
  public async destroyMateri({ params, response }: HttpContext) {
    try {
      const materi = await prisma.materiMurojaah.findUnique({
        where: { id: params.id },
      })

      if (!materi) {
        return response.notFound({ success: false, message: 'Materi tidak ditemukan' })
      }

      await prisma.materiMurojaah.delete({
        where: { id: params.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus materi murojaah',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus materi murojaah',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/murojaah/siswa/:siswaId
   * Ambil Lembar Kerja & Rekapan Nilai Murojaah Siswa
   */
  public async getNilaiSiswa({ params, request, response }: HttpContext) {
    try {
      const { kategoriId } = request.qs()

      const siswa = await prisma.siswa.findUnique({
        where: { id: params.siswaId },
        include: { kelas: true },
      })

      if (!siswa) {
        return response.notFound({ success: false, message: 'Data siswa tidak ditemukan' })
      }

      const whereKategori: any = {}
      if (kategoriId) {
        whereKategori.id = kategoriId
      }

      const daftarKategori = await prisma.kategoriMurojaah.findMany({
        where: whereKategori,
        orderBy: { urutan: 'asc' },
        include: {
          materi: {
            orderBy: { urutan: 'asc' },
            include: {
              penilaian: {
                where: { siswaId: params.siswaId },
                select: {
                  id: true,
                  predikat: true,
                  updatedAt: true,
                },
              },
            },
          },
        },
      })

      const lembarKerja = daftarKategori.map((kat) => ({
        kategoriId: kat.id,
        namaKategori: kat.nama,
        materiList: kat.materi.map((mat) => {
          const recordNilai = mat.penilaian[0]
          return {
            materiId: mat.id,
            namaMateri: mat.nama,
            predikat: recordNilai?.predikat || null,
            penilaianId: recordNilai?.id || null,
          }
        }),
      }))

      return response.ok({
        success: true,
        message: `Berhasil mengambil lembar murojaah ${siswa.namaLengkap}`,
        siswa: {
          id: siswa.id,
          namaLengkap: siswa.namaLengkap,
          kelas: siswa.kelas?.namaKelas || '-',
        },
        data: lembarKerja,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil lembar nilai murojaah',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/murojaah/penilaian
   * Upsert Nilai (Click Button SB/B/C/K/- Langsung Terupdate)
   */
  public async saveNilai({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser
      const { siswaId, materiId, predikat } = request.only(['siswaId', 'materiId', 'predikat'])

      if (!siswaId || !materiId) {
        return response.badRequest({
          success: false,
          message: 'Siswa ID dan Materi ID wajib diisi',
        })
      }

      const validPredikat = ['SB', 'B', 'C', 'K']
      let targetPredikat = predikat ? String(predikat).toUpperCase() : null

      if (targetPredikat && !validPredikat.includes(targetPredikat)) {
        return response.badRequest({
          success: false,
          message: 'Predikat tidak valid. Gunakan SB, B, C, K, atau null',
        })
      }

      const result = await prisma.penilaianMurojaah.upsert({
        where: {
          siswaId_materiId: {
            siswaId,
            materiId,
          },
        },
        update: {
          predikat: targetPredikat as any,
          petugasId: authUser?.id || null,
        },
        create: {
          siswaId,
          materiId,
          predikat: targetPredikat as any,
          petugasId: authUser?.id || null,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menyimpan nilai murojaah',
        data: result,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menyimpan nilai murojaah',
        error: error.message,
      })
    }
  }
}