/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/me',
    tokens: [{"old":"/api/v1/auth/me","type":0,"val":"api","end":""},{"old":"/api/v1/auth/me","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/me","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.change_password': {
    methods: ["PUT"],
    pattern: '/api/v1/auth/change-password',
    tokens: [{"old":"/api/v1/auth/change-password","type":0,"val":"api","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"change-password","end":""}],
    types: placeholder as Registry['auth.change_password']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'murojaah.get_master_data': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/murojaah/kategori',
    tokens: [{"old":"/api/v1/murojaah/kategori","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"kategori","end":""}],
    types: placeholder as Registry['murojaah.get_master_data']['types'],
  },
  'murojaah.get_nilai_siswa': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/murojaah/siswa/:siswaId',
    tokens: [{"old":"/api/v1/murojaah/siswa/:siswaId","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/siswa/:siswaId","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/siswa/:siswaId","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/siswa/:siswaId","type":0,"val":"siswa","end":""},{"old":"/api/v1/murojaah/siswa/:siswaId","type":1,"val":"siswaId","end":""}],
    types: placeholder as Registry['murojaah.get_nilai_siswa']['types'],
  },
  'siswa.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/siswa/me',
    tokens: [{"old":"/api/v1/siswa/me","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/me","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/me","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['siswa.me']['types'],
  },
  'auth.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['auth.index']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'kelas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/kelas',
    tokens: [{"old":"/api/v1/kelas","type":0,"val":"api","end":""},{"old":"/api/v1/kelas","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas","type":0,"val":"kelas","end":""}],
    types: placeholder as Registry['kelas.index']['types'],
  },
  'siswa.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/siswa',
    tokens: [{"old":"/api/v1/siswa","type":0,"val":"api","end":""},{"old":"/api/v1/siswa","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa","type":0,"val":"siswa","end":""}],
    types: placeholder as Registry['siswa.index']['types'],
  },
  'siswa.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/siswa/:id',
    tokens: [{"old":"/api/v1/siswa/:id","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['siswa.show']['types'],
  },
  'kelas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/kelas/:id',
    tokens: [{"old":"/api/v1/kelas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"kelas","end":""},{"old":"/api/v1/kelas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['kelas.show']['types'],
  },
  'pembayaran_spp_les.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/pembayaran-spp-les',
    tokens: [{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"api","end":""},{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"v1","end":""},{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"pembayaran-spp-les","end":""}],
    types: placeholder as Registry['pembayaran_spp_les.index']['types'],
  },
  'murojaah.store_kategori': {
    methods: ["POST"],
    pattern: '/api/v1/murojaah/kategori',
    tokens: [{"old":"/api/v1/murojaah/kategori","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/kategori","type":0,"val":"kategori","end":""}],
    types: placeholder as Registry['murojaah.store_kategori']['types'],
  },
  'murojaah.update_kategori': {
    methods: ["PUT"],
    pattern: '/api/v1/murojaah/kategori/:id',
    tokens: [{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"kategori","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['murojaah.update_kategori']['types'],
  },
  'murojaah.destroy_kategori': {
    methods: ["DELETE"],
    pattern: '/api/v1/murojaah/kategori/:id',
    tokens: [{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":0,"val":"kategori","end":""},{"old":"/api/v1/murojaah/kategori/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['murojaah.destroy_kategori']['types'],
  },
  'murojaah.store_materi': {
    methods: ["POST"],
    pattern: '/api/v1/murojaah/materi',
    tokens: [{"old":"/api/v1/murojaah/materi","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/materi","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/materi","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/materi","type":0,"val":"materi","end":""}],
    types: placeholder as Registry['murojaah.store_materi']['types'],
  },
  'murojaah.update_materi': {
    methods: ["PUT"],
    pattern: '/api/v1/murojaah/materi/:id',
    tokens: [{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"materi","end":""},{"old":"/api/v1/murojaah/materi/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['murojaah.update_materi']['types'],
  },
  'murojaah.destroy_materi': {
    methods: ["DELETE"],
    pattern: '/api/v1/murojaah/materi/:id',
    tokens: [{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/materi/:id","type":0,"val":"materi","end":""},{"old":"/api/v1/murojaah/materi/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['murojaah.destroy_materi']['types'],
  },
  'murojaah.save_nilai': {
    methods: ["POST"],
    pattern: '/api/v1/murojaah/penilaian',
    tokens: [{"old":"/api/v1/murojaah/penilaian","type":0,"val":"api","end":""},{"old":"/api/v1/murojaah/penilaian","type":0,"val":"v1","end":""},{"old":"/api/v1/murojaah/penilaian","type":0,"val":"murojaah","end":""},{"old":"/api/v1/murojaah/penilaian","type":0,"val":"penilaian","end":""}],
    types: placeholder as Registry['murojaah.save_nilai']['types'],
  },
  'kelas.store': {
    methods: ["POST"],
    pattern: '/api/v1/kelas',
    tokens: [{"old":"/api/v1/kelas","type":0,"val":"api","end":""},{"old":"/api/v1/kelas","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas","type":0,"val":"kelas","end":""}],
    types: placeholder as Registry['kelas.store']['types'],
  },
  'kelas.update': {
    methods: ["PUT"],
    pattern: '/api/v1/kelas/:id',
    tokens: [{"old":"/api/v1/kelas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"kelas","end":""},{"old":"/api/v1/kelas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['kelas.update']['types'],
  },
  'kelas.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/kelas/:id',
    tokens: [{"old":"/api/v1/kelas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"kelas","end":""},{"old":"/api/v1/kelas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['kelas.destroy']['types'],
  },
  'siswa.store': {
    methods: ["POST"],
    pattern: '/api/v1/siswa',
    tokens: [{"old":"/api/v1/siswa","type":0,"val":"api","end":""},{"old":"/api/v1/siswa","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa","type":0,"val":"siswa","end":""}],
    types: placeholder as Registry['siswa.store']['types'],
  },
  'siswa.update': {
    methods: ["PUT"],
    pattern: '/api/v1/siswa/:id',
    tokens: [{"old":"/api/v1/siswa/:id","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['siswa.update']['types'],
  },
  'siswa.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/siswa/:id',
    tokens: [{"old":"/api/v1/siswa/:id","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['siswa.destroy']['types'],
  },
  'auth.reset_password': {
    methods: ["PUT"],
    pattern: '/api/v1/users/:id/reset-password',
    tokens: [{"old":"/api/v1/users/:id/reset-password","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id/reset-password","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id/reset-password","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id/reset-password","type":1,"val":"id","end":""},{"old":"/api/v1/users/:id/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['auth.reset_password']['types'],
  },
  'pembayaran_spp_les.store': {
    methods: ["POST"],
    pattern: '/api/v1/pembayaran-spp-les',
    tokens: [{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"api","end":""},{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"v1","end":""},{"old":"/api/v1/pembayaran-spp-les","type":0,"val":"pembayaran-spp-les","end":""}],
    types: placeholder as Registry['pembayaran_spp_les.store']['types'],
  },
  'pembayaran_spp_les.update': {
    methods: ["PUT"],
    pattern: '/api/v1/pembayaran-spp-les/:id',
    tokens: [{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"api","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"pembayaran-spp-les","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pembayaran_spp_les.update']['types'],
  },
  'pembayaran_spp_les.restore': {
    methods: ["PUT"],
    pattern: '/api/v1/pembayaran-spp-les/:id/restore',
    tokens: [{"old":"/api/v1/pembayaran-spp-les/:id/restore","type":0,"val":"api","end":""},{"old":"/api/v1/pembayaran-spp-les/:id/restore","type":0,"val":"v1","end":""},{"old":"/api/v1/pembayaran-spp-les/:id/restore","type":0,"val":"pembayaran-spp-les","end":""},{"old":"/api/v1/pembayaran-spp-les/:id/restore","type":1,"val":"id","end":""},{"old":"/api/v1/pembayaran-spp-les/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['pembayaran_spp_les.restore']['types'],
  },
  'pembayaran_spp_les.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/pembayaran-spp-les/:id',
    tokens: [{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"api","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":0,"val":"pembayaran-spp-les","end":""},{"old":"/api/v1/pembayaran-spp-les/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pembayaran_spp_les.destroy']['types'],
  },
  'tabungan.store_mutasi': {
    methods: ["POST"],
    pattern: '/api/v1/tabungan/mutasi',
    tokens: [{"old":"/api/v1/tabungan/mutasi","type":0,"val":"api","end":""},{"old":"/api/v1/tabungan/mutasi","type":0,"val":"v1","end":""},{"old":"/api/v1/tabungan/mutasi","type":0,"val":"tabungan","end":""},{"old":"/api/v1/tabungan/mutasi","type":0,"val":"mutasi","end":""}],
    types: placeholder as Registry['tabungan.store_mutasi']['types'],
  },
  'tabungan.destroy_mutasi': {
    methods: ["DELETE"],
    pattern: '/api/v1/tabungan/mutasi/:id',
    tokens: [{"old":"/api/v1/tabungan/mutasi/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tabungan/mutasi/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tabungan/mutasi/:id","type":0,"val":"tabungan","end":""},{"old":"/api/v1/tabungan/mutasi/:id","type":0,"val":"mutasi","end":""},{"old":"/api/v1/tabungan/mutasi/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tabungan.destroy_mutasi']['types'],
  },
  'tabungan.restore_mutasi': {
    methods: ["PUT"],
    pattern: '/api/v1/tabungan/mutasi/:id/restore',
    tokens: [{"old":"/api/v1/tabungan/mutasi/:id/restore","type":0,"val":"api","end":""},{"old":"/api/v1/tabungan/mutasi/:id/restore","type":0,"val":"v1","end":""},{"old":"/api/v1/tabungan/mutasi/:id/restore","type":0,"val":"tabungan","end":""},{"old":"/api/v1/tabungan/mutasi/:id/restore","type":0,"val":"mutasi","end":""},{"old":"/api/v1/tabungan/mutasi/:id/restore","type":1,"val":"id","end":""},{"old":"/api/v1/tabungan/mutasi/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['tabungan.restore_mutasi']['types'],
  },
  'tabungan.summary': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tabungan/summary',
    tokens: [{"old":"/api/v1/tabungan/summary","type":0,"val":"api","end":""},{"old":"/api/v1/tabungan/summary","type":0,"val":"v1","end":""},{"old":"/api/v1/tabungan/summary","type":0,"val":"tabungan","end":""},{"old":"/api/v1/tabungan/summary","type":0,"val":"summary","end":""}],
    types: placeholder as Registry['tabungan.summary']['types'],
  },
  'tabungan.show_by_siswa': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tabungan/siswa/:siswaId',
    tokens: [{"old":"/api/v1/tabungan/siswa/:siswaId","type":0,"val":"api","end":""},{"old":"/api/v1/tabungan/siswa/:siswaId","type":0,"val":"v1","end":""},{"old":"/api/v1/tabungan/siswa/:siswaId","type":0,"val":"tabungan","end":""},{"old":"/api/v1/tabungan/siswa/:siswaId","type":0,"val":"siswa","end":""},{"old":"/api/v1/tabungan/siswa/:siswaId","type":1,"val":"siswaId","end":""}],
    types: placeholder as Registry['tabungan.show_by_siswa']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
