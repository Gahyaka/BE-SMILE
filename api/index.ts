import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

let requestHandler: any

export default async function handler(req: any, res: any) {
  if (!requestHandler) {
    const ignitor = new Ignitor(new URL('..', import.meta.url))
    const app = ignitor.createApp('web')

    await app.init()
    await app.boot()
    await app.start(() => {})

    // Ambil server instance dari container Adonis v6
    const server = await app.container.make('adonis.http.server')
    requestHandler = server.handle.bind(server)
  }

  return requestHandler(req, res)
}
