import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  public async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { roles: string[] } = { roles: [] }
  ) {
    const authUser = (ctx.request as any).authUser

    if (!authUser) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Akses ditolak! User belum terautentikasi.',
      })
    }

    // Pengecekan role
    const allowedRoles = options.roles || []
    if (!allowedRoles.includes(authUser.role)) {
      return ctx.response.forbidden({
        success: false,
        message: 'Akses ditolak! Anda tidak memiliki hak akses (Role) untuk tindakan ini.',
      })
    }

    return await next()
  }
}