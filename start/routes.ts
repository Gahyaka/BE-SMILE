import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const KelasController = () => import('#controllers/kelas_controller')
const SiswaController = () => import('#controllers/siswas_controller')

router.group(() => {
  // Public Routes
  router.post('/auth/register', [AuthController, 'register'])
  router.post('/auth/login', [AuthController, 'login'])

// Protected Routes (Butuh Bearer Token)
  router.group(() => {
    // Auth Profile
    router.get('/auth/me', [AuthController, 'me'])
    router.post('/auth/logout', [AuthController, 'logout'])

    // boleh diakses guru
    router.get('/kelas', [KelasController, 'index'])
    router.get('/kelas/:id', [KelasController, 'show'])

    // Cuma Boleh ADMIN
    router.group(() => {
      router.post('/kelas', [KelasController, 'store'])
      router.put('/kelas/:id', [KelasController, 'update'])
      router.delete('/kelas/:id', [KelasController, 'destroy']) 
    }).use(middleware.role({ roles: ['ADMIN'] }))

    // Master Data Siswa
    router.get('/siswa', [SiswaController, 'index'])
    router.post('/siswa', [SiswaController, 'store'])
    router.put('/siswa/:id', [SiswaController, 'update'])
    router.get('/siswa/:id', [SiswaController, 'show'])
    router.delete('/siswa/:id', [SiswaController, 'destroy'])

  }).use(middleware.auth())

}).prefix('/api/v1')