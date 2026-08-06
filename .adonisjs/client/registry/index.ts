/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
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
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'kelas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/kelas',
    tokens: [{"old":"/api/v1/kelas","type":0,"val":"api","end":""},{"old":"/api/v1/kelas","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas","type":0,"val":"kelas","end":""}],
    types: placeholder as Registry['kelas.index']['types'],
  },
  'kelas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/kelas/:id',
    tokens: [{"old":"/api/v1/kelas/:id","type":0,"val":"api","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/kelas/:id","type":0,"val":"kelas","end":""},{"old":"/api/v1/kelas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['kelas.show']['types'],
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
  'siswa.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/siswa',
    tokens: [{"old":"/api/v1/siswa","type":0,"val":"api","end":""},{"old":"/api/v1/siswa","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa","type":0,"val":"siswa","end":""}],
    types: placeholder as Registry['siswa.index']['types'],
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
  'siswa.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/siswa/:id',
    tokens: [{"old":"/api/v1/siswa/:id","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['siswa.show']['types'],
  },
  'siswa.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/siswa/:id',
    tokens: [{"old":"/api/v1/siswa/:id","type":0,"val":"api","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/siswa/:id","type":0,"val":"siswa","end":""},{"old":"/api/v1/siswa/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['siswa.destroy']['types'],
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
