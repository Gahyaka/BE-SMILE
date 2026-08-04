/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
  kelas: {
    index: typeof routes['kelas.index']
    show: typeof routes['kelas.show']
    store: typeof routes['kelas.store']
    update: typeof routes['kelas.update']
    destroy: typeof routes['kelas.destroy']
  }
  siswa: {
    index: typeof routes['siswa.index']
    store: typeof routes['siswa.store']
    update: typeof routes['siswa.update']
    show: typeof routes['siswa.show']
    destroy: typeof routes['siswa.destroy']
  }
}
