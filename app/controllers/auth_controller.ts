import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.APP_KEY || 'super-secret-key-min-32-chars-long'

export default class AuthController {
  /**
   * Get semua data user
   */
  public async index({ response }: HttpContext) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          nama: true,
          role: true,
          createdAt: true,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil mengambil data user',
        data: users,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil data user',
        error: error.message,
      })
    }
  }
  public async register({ request, response }: HttpContext) {
    try {
      const { username, password, nama, role } = request.only(['username', 'password', 'nama', 'role'])

      if (!username || !password || !nama) {
        return response.badRequest({
          success: false,
          message: 'username, password, dan nama wajib diisi',
        })
      }

      // Cek apakah username sudah terdaftar
      const existingUser = await prisma.user.findUnique({
        where: { username },
      })

      if (existingUser) {
        return response.conflict({
          success: false,
          message: 'username sudah terdaftar',
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Simpan user baru ke MySQL
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          nama,
          role: role || 'GURU',
        },
        select: {
          id: true,
          username: true,
          nama: true,
          role: true,
          createdAt: true,
        },
      })

      return response.created({
        success: true,
        message: 'Registrasi berhasil',
        data: user,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal melakukan registrasi',
        error: error.message,
      })
    }
  }

  /**
   * POST /api/v1/auth/login
   */
  public async login({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])

      if (!username || !password) {
        return response.badRequest({
          success: false,
          message: 'username dan password wajib diisi',
        })
      }

      // Cari user
      const user = await prisma.user.findUnique({
        where: { username },
      })

      if (!user) {
        return response.unauthorized({
          success: false,
          message: 'username atau password salah',
        })
      }

      // Validasi password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return response.unauthorized({
          success: false,
          message: 'username atau password salah',
        })
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      )

      return response.ok({
        success: true,
        message: 'Login berhasil',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            nama: user.nama,
            role: user.role,
          },
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal melakukan login',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/auth/me
   */
  public async me({ request, response }: HttpContext) {
    const authUser = (request as any).authUser

    return response.ok({
      success: true,
      message: 'Profil user berhasil diambil',
      data: authUser,
    })
  }

  /**
   * POST /api/v1/auth/logout
   */
  public async logout({ response }: HttpContext) {
    return response.ok({
      success: true,
      message: 'Logout berhasil, silakan hapus token dari client',
    })
  }
  /**
 * PUT /api/v1/auth/change-password
 */
  public async changePassword({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser
      const { oldPassword, newPassword } = request.only(['oldPassword', 'newPassword'])

      if (!oldPassword || !newPassword) {
        return response.badRequest({
          success: false,
          message: 'Password lama dan password baru wajib diisi',
        })
      }

      // Ambil data user dari DB
      const user = await prisma.user.findUnique({
        where: { id: authUser.id },
      })

      if (!user) {
        return response.notFound({ success: false, message: 'User tidak ditemukan' })
      }

      // Validasi password lama
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
      if (!isOldPasswordValid) {
        return response.badRequest({
          success: false,
          message: 'Password lama tidak sesuai',
        })
      }

      // Hash password baru dan update DB
      const hashedNewPassword = await bcrypt.hash(newPassword, 10)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
      })

      return response.ok({
        success: true,
        message: 'Password berhasil diperbarui',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui password',
        error: error.message,
      })
    }
  }
  /**
 * PUT /api/v1/users/:id/reset-password
 * Khusus ADMIN_ADMINISTRASI untuk mereset/mengubah password user lain
 */
  public async resetPassword({ params, request, response }: HttpContext) {
    try {
      const { newPassword } = request.only(['newPassword'])

      if (!newPassword || newPassword.length < 6) {
        return response.badRequest({
          success: false,
          message: 'Password baru wajib diisi dan minimal 6 karakter',
        })
      }

      // Cek keberadaan user target
      const targetUser = await prisma.user.findUnique({
        where: { id: params.id },
      })

      if (!targetUser) {
        return response.notFound({
          success: false,
          message: 'User tidak ditemukan',
        })
      }

      // Hash password baru
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      // Update password di database
      await prisma.user.update({
        where: { id: params.id },
        data: { password: hashedPassword },
      })

      return response.ok({
        success: true,
        message: `Berhasil mengubah password untuk user @${targetUser.username}`,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mereset password user',
        error: error.message,
      })
    }
  }
/**
   * DELETE /api/v1/users/:id
   */
  public async destroy({ params, request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser
      const targetUserId = params.id

      // 1. Validasi Keberadaan User Target
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
      })

      if (!targetUser) {
        return response.notFound({
          success: false,
          message: 'User tidak ditemukan',
        })
      }

      // 2. Proteksi 1: Tidak boleh menghapus akun sendiri
      if (targetUser.id === authUser.id) {
        return response.forbidden({
          success: false,
          message: 'Anda tidak dapat menghapus akun Anda sendiri',
        })
      }

      // 3. Proteksi 2: Tidak boleh menghapus sesama role ADMIN_ADM
      if (targetUser.role === 'ADMIN_ADMINISTRASI') {
        return response.forbidden({
          success: false,
          message: 'User dengan hak akses ADMIN_ADM tidak dapat dihapus',
        })
      }

      // 4. Eksekusi Hapus User
      await prisma.user.delete({
        where: { id: targetUserId },
      })

      return response.ok({
        success: true,
        message: `User '${targetUser.nama || targetUser.username}' (${targetUser.role}) berhasil dihapus`,
      })
    } catch (error: any) {
      // Penanganan jika ada foreign key constraint (misal: user terkait data transaksi/kegiatan yang restricted)
      if (error.code === 'P2003') {
        return response.badRequest({
          success: false,
          message: 'Gagal menghapus user karena masih terhubung dengan data aktif lain (kelas/transaksi)',
          error: error.message,
        })
      }

      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus user',
        error: error.message,
      })
    }
  }
}