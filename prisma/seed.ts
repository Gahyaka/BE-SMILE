import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding database...')

  // Hash password default untuk admin
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // 1. Bikin Super Admin (ADMIN_ADMINISTRASI)
  const adminAdmin = await prisma.user.upsert({
    where: { username: 'admin_adm' },
    update: {},
    create: {
      username: 'admin_adm',
      nama: 'Super Admin Administrasi',
      password: hashedPassword,
      role: Role.ADMIN_ADMINISTRASI,
    },
  })

  // 2. Bikin Admin Transaksi Default
  const adminTx = await prisma.user.upsert({
    where: { username: 'admin_tx' },
    update: {},
    create: {
      username: 'admin_tx',
      nama: 'Admin Keuangan & Transaksi',
      password: hashedPassword,
      role: Role.ADMIN_TRANSAKSI,
    },
  })

  console.log('✅ Seeding berhasil!')
  console.log({ adminAdmin, adminTx })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Seeding gagal:', e)
    await prisma.$disconnect()
    process.exit(1)
  })