import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'

let server: any

export default async function handler(req: any, res: any) {
  if (!server) {
    const ignitor = new Ignitor(new URL('..', import.meta.url))
    const app = ignitor.createApp('web')
    
    await app.init()
    await app.boot()
    await app.start(() => {})
    
    server = await app.container.make('server')
  }

  return server.handle(req, res)
}