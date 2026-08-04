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
}