import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  // Public Routes
  router.post('/auth/register', [AuthController, 'register'])
  router.post('/auth/login', [AuthController, 'login'])

  // Protected Routes (Harus pake Bearer Token)
  router.group(() => {
    router.get('/auth/me', [AuthController, 'me'])
  }).use(middleware.auth())

}).prefix('/api/v1')