import { PrismaClient } from '@prisma/client'

class PrismaService {
  public prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }
}

const prismaService = new PrismaService()
export default prismaService.prisma