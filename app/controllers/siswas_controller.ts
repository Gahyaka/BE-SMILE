import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'
import bcrypt from 'bcryptjs'

function generateRandomPassword(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default class SiswaController {
  /**
   * GET /api/v1/siswa/me
   * Mengambil data siswa milik user yang sedang login
   */
  public async me({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser

      const userWithSiswa = await prisma.user.findUnique({
        where: { id: authUser.id },
        include: {
          siswa: {
            include: {
              kelas: true,
            },
          },
        },
      })

      if (!userWithSiswa || !userWithSiswa.siswa) {
        return response.notFound({
          success: false,
          message: 'Data siswa untuk akun ini belum dikaitkan',
        })
      }

      return response.ok({
        success: true,
        message: 'Berhasil mengambil data siswa profil',
        data: userWithSiswa.siswa,
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
              { nisn: { contains: search } },
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
      const {
        nis,
        nisn,
        namaLengkap,
        namaOrangTua,
        alamat,
        tinggiBadan,
        beratBadan,
        lingkarKepala,
        semester,
        tahunAjaran,
        kelasId,
      } = request.body()

      if (!namaLengkap || !namaOrangTua) {
        return response.badRequest({
          success: false,
          message: 'Nama lengkap dan nama orang tua wajib diisi',
        })
      }

      // Cek keunikan NIS (jika dikirim)
      if (nis) {
        const existingNis = await prisma.siswa.findUnique({
          where: { nis },
        })
        if (existingNis) {
          return response.conflict({
            success: false,
            message: 'NIS sudah terdaftar',
          })
        }
      }

      // Cek keunikan NISN (jika dikirim)
      if (nisn) {
        const existingNisn = await prisma.siswa.findUnique({
          where: { nisn },
        })
        if (existingNisn) {
          return response.conflict({
            success: false,
            message: 'NISN sudah terdaftar',
          })
        }
      }

      // Simpan data siswa baru
      const newSiswa = await prisma.siswa.create({
        data: {
          nis: nis || null,
          nisn: nisn || null,
          namaLengkap,
          namaOrangTua,
          alamat: alamat || null,
          tinggiBadan: tinggiBadan ? parseFloat(tinggiBadan) : null,
          beratBadan: beratBadan ? parseFloat(beratBadan) : null,
          lingkarKepala: lingkarKepala ? parseFloat(lingkarKepala) : null,
          semester: semester || null,
          tahunAjaran: tahunAjaran || null,
          kelasId: kelasId || null,
        },
        include: {
          kelas: true,
        },
      })

      // Generate Username: prioritas NISN -> NIS -> Random ID
      const identifier = nisn || nis
      const username = identifier
        ? `siswa_${identifier}`
        : `siswa_${newSiswa.id.replace(/-/g, '').slice(0, 6)}`

      // Password Default: 'Paud@' + identifier ATAU Random Password
      const plainPassword = identifier ? `Paud@${identifier}` : generateRandomPassword(6)

      // Hash Password
      const hashedPassword = await bcrypt.hash(plainPassword, 10)

      // Otomatis Buat Akun User untuk Siswa ini
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          nama: namaLengkap,
          role: 'SISWA',
          siswaId: newSiswa.id,
        },
        select: {
          id: true,
          username: true,
          role: true,
        },
      })

      return response.created({
        success: true,
        message: 'Berhasil menambahkan data dan membuat akun siswa',
        data: {
          siswa: newSiswa,
          account: {
            userId: newUser.id,
            username: newUser.username,
            defaultPassword: plainPassword,
            role: newUser.role,
          },
        },
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
          transaksiSpp: {
            orderBy: { createdAt: 'desc' },
            take: 5, // 5 Transaksi SPP terakhir
          },
          mutasiTabungan: {
            orderBy: { createdAt: 'desc' },
            take: 5, 
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
      const {
        nis,
        nisn,
        namaLengkap,
        namaOrangTua,
        alamat,
        tinggiBadan,
        beratBadan,
        lingkarKepala,
        semester,
        tahunAjaran,
        kelasId,
      } = request.body()

      const updatedSiswa = await prisma.siswa.update({
        where: { id: params.id },
        data: {
          ...(nis !== undefined && { nis }),
          ...(nisn !== undefined && { nisn }),
          ...(namaLengkap && { namaLengkap }),
          ...(namaOrangTua && { namaOrangTua }),
          ...(alamat !== undefined && { alamat }),
          ...(tinggiBadan !== undefined && {
            tinggiBadan: tinggiBadan ? parseFloat(tinggiBadan) : null,
          }),
          ...(beratBadan !== undefined && {
            beratBadan: beratBadan ? parseFloat(beratBadan) : null,
          }),
          ...(lingkarKepala !== undefined && {
            lingkarKepala: lingkarKepala ? parseFloat(lingkarKepala) : null,
          }),
          ...(semester !== undefined && { semester }),
          ...(tahunAjaran !== undefined && { tahunAjaran }),
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