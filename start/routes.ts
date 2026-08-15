import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const KelasController = () => import('#controllers/kelas_controller')
const SiswaController = () => import('#controllers/siswas_controller')
const PembayaranSppLesController = () => import('#controllers/pembayaran_spp_les_controller')
const TabunganController = () => import('#controllers/tabungan_controller')
const MurojaahController = () => import('#controllers/murojaah_controller')
const DokumentasiController = () => import('#controllers/dokumentasi_controller')

router.group(() => {
  // Public Routes
  router.post('/auth/login', [AuthController, 'login'])
  router.get('/public/galeri', [DokumentasiController, 'publicGallery'])

// Protected Routes (Butuh Bearer Token)
  router.group(() => {
    // Auth Profile
    router.get('/auth/me', [AuthController, 'me'])
    router.put('/auth/change-password', [AuthController, 'changePassword'])
    router.post('/auth/logout', [AuthController, 'logout'])

    router.get('/murojaah/kategori', [MurojaahController, 'getMasterData'])
    router.get('/murojaah/siswa/:siswaId', [MurojaahController, 'getNilaiSiswa'])

    router.get('/dokumentasi', [DokumentasiController, 'index'])
    router.get('/dokumentasi/:id', [DokumentasiController, 'show'])
    
//Endpoint Khusus SISWA (Cuma bisa lihat data dirinya sendiri)
    router.get('/siswa/me', [SiswaController, 'me'])
    .use(middleware.role({ roles: ['SISWA'] }))

// KELOLA USER (Cuma ADMIN_ADMINISTRASI)
  router.group(() => {
        router.get('/users', [AuthController, 'index'])
        router.post('/auth/register', [AuthController, 'register'])
      }).use(middleware.role({ roles: ['ADMIN_ADMINISTRASI'] }))

// Read: ADMIN_ADMINISTRASI, ADMIN_TRANSAKSI, GURU, SISWA
    router.get('/kelas', [KelasController, 'index'])

// Read: ADMIN_ADMINISTRASI, ADMIN_TRANSAKSI, & GURU
    router.group(() => {
      router.get('/siswa', [SiswaController, 'index'])
      router.get('/siswa/:id', [SiswaController, 'show'])
      router.get('/kelas/:id', [KelasController, 'show'])

      router.get('/pembayaran-spp-les', [PembayaranSppLesController, 'index'])
  }).use(middleware.role({ roles: ['ADMIN_ADMINISTRASI', 'ADMIN_TRANSAKSI', 'GURU'] }))

    router.group(() => {
      router.post('/murojaah/kategori', [MurojaahController, 'storeKategori'])
      router.put('/murojaah/kategori/:id', [MurojaahController, 'updateKategori'])
      router.delete('/murojaah/kategori/:id', [MurojaahController, 'destroyKategori'])

      router.post('/murojaah/materi', [MurojaahController, 'storeMateri'])
      router.put('/murojaah/materi/:id', [MurojaahController, 'updateMateri'])
      router.delete('/murojaah/materi/:id', [MurojaahController, 'destroyMateri'])

      router.post('/murojaah/penilaian', [MurojaahController, 'saveNilai'])

      router.post('/dokumentasi', [DokumentasiController, 'store'])
      router.put('/dokumentasi/:id', [DokumentasiController, 'update'])
      router.delete('/dokumentasi/:id', [DokumentasiController, 'destroy'])
      router.delete('/dokumentasi/foto/:fotoId', [DokumentasiController, 'destroyFoto'])
    }).use(middleware.role({ roles: ['ADMIN_ADMINISTRASI', 'GURU'] }))
      
// Write / Mutation: Cuma ADMIN_ADMINISTRASI
    router.group(() => {
      router.post('/kelas', [KelasController, 'store'])  
      router.put('/kelas/:id', [KelasController, 'update'])
      router.delete('/kelas/:id', [KelasController, 'destroy'])

      router.post('/siswa', [SiswaController, 'store'])
      router.put('/siswa/:id', [SiswaController, 'update'])
      router.delete('/siswa/:id', [SiswaController, 'destroy'])

      router.put('/users/:id/reset-password', [AuthController, 'resetPassword'])
      router.patch('/dokumentasi/:id/toggle-public', [DokumentasiController, 'togglePublicGallery'])
    }).use(middleware.role({ roles: ['ADMIN_ADMINISTRASI'] }))

      router.group(() => {
      router.post('/pembayaran-spp-les', [PembayaranSppLesController, 'store'])
      router.put('/pembayaran-spp-les/:id', [PembayaranSppLesController, 'update'])
      router.put('/pembayaran-spp-les/:id/restore', [PembayaranSppLesController, 'restore'])
      router.delete('/pembayaran-spp-les/:id', [PembayaranSppLesController, 'destroy'])
      router.post('/tabungan/mutasi', [TabunganController, 'storeMutasi'])
      router.delete('/tabungan/mutasi/:id', [TabunganController, 'destroyMutasi'])
      router.put('/tabungan/mutasi/:id/restore', [TabunganController, 'restoreMutasi'])
      router.get('/tabungan/summary', [TabunganController, 'summary'])
      router.get('/tabungan/siswa/:siswaId', [TabunganController, 'showBySiswa']) 
    }).use(middleware.role({ roles: ['ADMIN_TRANSAKSI', 'ADMIN_ADMINISTRASI'] }))

  }).use(middleware.auth())

}).prefix('/api/v1')