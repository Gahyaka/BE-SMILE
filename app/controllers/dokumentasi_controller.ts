import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'
import { GDriveService } from '#services/gdrive_service'

export default class DokumentasiController {
  /**
   * Menampilkan semua daftar kegiatan & foto dokumentasi
   * GET /api/v1/dokumentasi
   */
  public async index({ response }: HttpContext) {
    try {
      const data = await prisma.kegiatanDokumentasi.findMany({
        orderBy: {
          tanggalKegiatan: 'desc',
        },
        include: {
          foto: true,
          petugas: {
            select: {
              id: true,
              nama: true,
              username: true
            },
          },
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil seluruh dokumentasi',
        data,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil data dokumentasi',
        error: error.message,
      })
    }
  }

  /**
   * Detail satu kegiatan beserta foto-fotonya
   * GET /api/v1/dokumentasi/:id
   */
  public async show({ params, response }: HttpContext) {
    try {
      const kegiatan = await prisma.kegiatanDokumentasi.findUnique({
        where: { id: String(params.id) },
        include: {
          foto: true,
          petugas: {
            select: {
              id: true,
              nama: true,
              username: true
            },
          },
        },
      })

      if (!kegiatan) {
        return response.notFound({
          success: false,
          message: 'Data kegiatan dokumentasi tidak ditemukan',
        })
      }

      return response.ok({
        success: true,
        message: 'Berhasil mengambil detail kegiatan',
        data: kegiatan,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil detail dokumentasi',
        error: error.message,
      })
    }
  }

/**
   * Upload dokumentasi baru (Otomatis merge folder jika nama kegiatan sudah ada)
   * POST /api/v1/dokumentasi
   */
  public async store({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser
      const namaKegiatan = request.input('namaKegiatan')
      const kategori = request.input('kategori')
      const deskripsi = request.input('deskripsi')
      const tanggalKegiatan = request.input('tanggalKegiatan')

      if (!namaKegiatan) {
        return response.badRequest({ success: false, message: 'Nama kegiatan wajib diisi' })
      }

      // Ambil file foto (support single maupun multiple)
      const singleFoto = request.file('foto', {
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp'],
      })

      const multiFoto = request.files('foto', {
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg', 'webp'],
      })

      let filesToUpload = multiFoto.length > 0 ? multiFoto : (singleFoto ? [singleFoto] : [])

      if (filesToUpload.length === 0) {
        return response.badRequest({
          success: false,
          message: 'Pilih minimal 1 file foto dokumentasi untuk diunggah',
        })
      }

      // 1. Cek apakah kegiatan dengan nama yang sama sudah pernah dibuat
    let kegiatan = await prisma.kegiatanDokumentasi.findFirst({
    where: {
        namaKegiatan: namaKegiatan,
    },
    })

    let folderId: string | null | undefined
    let folderUrl: string | null | undefined

      if (kegiatan) {
        // Jika sudah ada, gunakan ID & URL folder yang sudah ada
        folderId = kegiatan.gdriveFolderId
        folderUrl = kegiatan.gdriveFolderUrl
      } else {
        // Jika belum ada, buat folder baru di Google Drive
        const gdriveFolder = await GDriveService.createFolder(namaKegiatan)
        folderId = gdriveFolder.folderId
        folderUrl = gdriveFolder.webViewLink
      }

      // 2. Upload file-file foto ke Google Drive (ke folder yang sesuai)
      const uploadedPhotosData: any[] = []

      for (const file of filesToUpload) {
        if (file.tmpPath) {
          const mimeType = file.headers['content-type'] || 'image/jpeg'
          const fileName = file.clientName || `foto-${Date.now()}.jpg`

          const uploaded = await GDriveService.uploadFile(
            file.tmpPath,
            fileName,
            mimeType,
            folderId!
          )

          uploadedPhotosData.push({
            namaFile: fileName,
            gdriveFileId: uploaded.fileId,
            viewUrl: uploaded.viewUrl,
            downloadUrl: uploaded.webViewLink,
          })
        }
      }

      // 3. Simpan relasi foto ke Database
      if (kegiatan) {
        // Jika kegiatan lama: Tambahkan foto baru ke kegiatan tersebut
        kegiatan = await prisma.kegiatanDokumentasi.update({
          where: { id: kegiatan.id },
          data: {
            deskripsi: deskripsi || kegiatan.deskripsi,
            foto: {
              create: uploadedPhotosData,
            },
          },
          include: {
            foto: true,
          },
        })
      } else {
        // Jika kegiatan baru: Buat record baru
        kegiatan = await prisma.kegiatanDokumentasi.create({
          data: {
            namaKegiatan,
            kategori,
            deskripsi,
            tanggalKegiatan: tanggalKegiatan ? new Date(tanggalKegiatan) : new Date(),
            gdriveFolderId: folderId,
            gdriveFolderUrl: folderUrl,
            petugasId: authUser?.id || null,
            foto: {
              create: uploadedPhotosData,
            },
          },
          include: {
            foto: true,
          },
        })
      }

      return response.created({
        success: true,
        message: 'Berhasil mengunggah dokumentasi ke folder kegiatan',
        data: kegiatan,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengunggah dokumentasi ke Google Drive',
        error: error.message,
      })
    }
  }

 /**
   * Update info kegiatan (nama, deskripsi, tanggal)
   * Otomatis me-rename folder di Google Drive jika nama kegiatan berubah
   * PUT /api/v1/dokumentasi/:id
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const kegiatan = await prisma.kegiatanDokumentasi.findUnique({
        where: { id: String(params.id) },
      })

      if (!kegiatan) {
        return response.notFound({ success: false, message: 'Kegiatan tidak ditemukan' })
      }

      const { namaKegiatan, kategori, deskripsi, tanggalKegiatan } = request.only([
        'namaKegiatan',
        'kategori',
        'deskripsi',
        'tanggalKegiatan',
      ])

      // 1. Jika nama kegiatan diubah, rename juga foldernya di Google Drive
      if (namaKegiatan && namaKegiatan !== kegiatan.namaKegiatan && kegiatan.gdriveFolderId) {
        await GDriveService.renameFolder(kegiatan.gdriveFolderId, namaKegiatan)
      }

      // 2. Update data di database
      const updated = await prisma.kegiatanDokumentasi.update({
        where: { id: kegiatan.id },
        data: {
          namaKegiatan: namaKegiatan || kegiatan.namaKegiatan,
          kategori: kategori || kegiatan.kategori,
          deskripsi: deskripsi !== undefined ? deskripsi : kegiatan.deskripsi,
          tanggalKegiatan: tanggalKegiatan ? new Date(tanggalKegiatan) : kegiatan.tanggalKegiatan,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui data kegiatan dan nama folder Google Drive',
        data: updated,
      })
    } catch (error: any) {
      return response.internalServerError({ success: false, error: error.message })
    }
  }

  /**
   * Hapus 1 kegiatan beserta seluruh fotonya di DB & Google Drive
   * DELETE /api/v1/dokumentasi/:id
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const kegiatan = await prisma.kegiatanDokumentasi.findUnique({
        where: { id: String(params.id) },
        include: { foto: true },
      })

      if (!kegiatan) {
        return response.notFound({ success: false, message: 'Kegiatan tidak ditemukan' })
      }

      // Hapus foldernya di Google Drive (semua file di dalamnya ikut terhapus)
      if (kegiatan.gdriveFolderId) {
        await GDriveService.deleteFileOrFolder(kegiatan.gdriveFolderId)
      }

      // Hapus data kegiatan di database (otomatis cascade hapus foto-fotonya jika sudah cascade)
      await prisma.fotoDokumentasi.deleteMany({ where: { kegiatanId: kegiatan.id } })
      await prisma.kegiatanDokumentasi.delete({ where: { id: kegiatan.id } })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus kegiatan dan folder Google Drive',
      })
    } catch (error: any) {
      return response.internalServerError({ success: false, error: error.message })
    }
  }

  /**
   * Hapus 1 file foto spesifik di DB & Google Drive
   * DELETE /api/v1/dokumentasi/foto/:fotoId
   */
  public async destroyFoto({ params, response }: HttpContext) {
    try {
      const foto = await prisma.fotoDokumentasi.findUnique({
        where: { id: String(params.fotoId) },
      })

      if (!foto) {
        return response.notFound({ success: false, message: 'Foto tidak ditemukan' })
      }

      // Hapus file dari Google Drive
      if (foto.gdriveFileId) {
        await GDriveService.deleteFileOrFolder(foto.gdriveFileId)
      }

      // Hapus dari DB
      await prisma.fotoDokumentasi.delete({
        where: { id: foto.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus foto dari Google Drive & Database',
      })
    } catch (error: any) {
      return response.internalServerError({ success: false, error: error.message })
    }
  }

  /**
   * GET /api/v1/public/galeri
   * Public Endpoint (Landing Page, Tanpa Auth)
   */
  public async publicGallery({ response }: HttpContext) {
    try {
      const galeri = await prisma.kegiatanDokumentasi.findMany({
        where: { isPublic: true },
        orderBy: { tanggalKegiatan: 'desc' },
        include: {
          foto: {
            take: 1, // Fallback ambil 1 foto teratas jika thumbnail tidak diset spesifik
          },
        },
      })

      // Format response agar frontend landing page mudah render
      const formatted = await Promise.all(
        galeri.map(async (kegiatan) => {
          let coverFoto = kegiatan.foto[0] || null

          if (kegiatan.thumbnailFotoId) {
            const specificCover = await prisma.fotoDokumentasi.findUnique({
              where: { id: kegiatan.thumbnailFotoId },
            })
            if (specificCover) coverFoto = specificCover
          }

          return {
            id: kegiatan.id,
            namaKegiatan: kegiatan.namaKegiatan,
            deskripsi: kegiatan.deskripsi,
            tanggalKegiatan: kegiatan.tanggalKegiatan,
            folderGdriveUrl: kegiatan.gdriveFolderUrl,
            cover: coverFoto
              ? {
                  id: coverFoto.id,
                  namaFile: coverFoto.namaFile,
                  viewUrl: coverFoto.viewUrl,
                }
              : null,
          }
        })
      )

      return response.ok({
        success: true,
        message: 'Berhasil mengambil galeri kegiatan publik',
        data: formatted,
      })
    } catch (error: any) {
      return response.internalServerError({ success: false, error: error.message })
    }
  }

/**
   * PATCH /api/v1/dokumentasi/:id/toggle-public
   * Khusus Admin: Mengatur status tayang di landing page & pilih cover foto
   */
  public async togglePublicGallery({ params, request, response }: HttpContext) {
    try {
      const { isPublic, thumbnailFotoId } = request.only(['isPublic', 'thumbnailFotoId'])

      const kegiatan = await prisma.kegiatanDokumentasi.findUnique({
        where: { id: String(params.id) },
      })

      if (!kegiatan) {
        return response.notFound({ success: false, message: 'Kegiatan tidak ditemukan' })
      }

      // Validasi kepemilikan foto thumbnail
      if (thumbnailFotoId) {
        const fotoExists = await prisma.fotoDokumentasi.findFirst({
          where: {
            id: String(thumbnailFotoId),
            kegiatanId: kegiatan.id, // Pastikan foto ini memang milik kegiatan terkait
          },
        })

        if (!fotoExists) {
          return response.badRequest({
            success: false,
            message: 'Foto yang dipilih tidak ditemukan dalam kegiatan ini',
          })
        }
      }

      const updated = await prisma.kegiatanDokumentasi.update({
        where: { id: kegiatan.id },
        data: {
          isPublic: isPublic !== undefined ? isPublic : !kegiatan.isPublic,
          thumbnailFotoId: thumbnailFotoId !== undefined ? thumbnailFotoId : kegiatan.thumbnailFotoId,
        },
      })

      return response.ok({
        success: true,
        message: `Status galeri publik berhasil diperbarui`,
        data: updated,
      })
    } catch (error: any) {
      return response.internalServerError({ success: false, error: error.message })
    }
  }
}