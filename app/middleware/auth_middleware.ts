import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.APP_KEY || 'super-secret-key-min-32-chars-long'

// Extend HttpContext Request biar ada authUser
declare module '@adonisjs/core/http' {
  interface Request {
    authUser?: any
  }
}

export default class AuthMiddleware {
  public async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Akses ditolak! Token tidak ditemukan.',
      })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
    ;(ctx.request as any).authUser = decoded
    return await next()
    } catch (error) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Token tidak valid atau sudah kedaluwarsa.',
      })
    }
  }
}