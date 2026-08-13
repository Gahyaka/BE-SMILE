/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    changePassword: typeof routes['auth.change_password']
    logout: typeof routes['auth.logout']
    index: typeof routes['auth.index']
    register: typeof routes['auth.register']
    resetPassword: typeof routes['auth.reset_password']
  }
  murojaah: {
    getMasterData: typeof routes['murojaah.get_master_data']
    getNilaiSiswa: typeof routes['murojaah.get_nilai_siswa']
    storeKategori: typeof routes['murojaah.store_kategori']
    updateKategori: typeof routes['murojaah.update_kategori']
    destroyKategori: typeof routes['murojaah.destroy_kategori']
    storeMateri: typeof routes['murojaah.store_materi']
    updateMateri: typeof routes['murojaah.update_materi']
    destroyMateri: typeof routes['murojaah.destroy_materi']
    saveNilai: typeof routes['murojaah.save_nilai']
  }
  siswa: {
    me: typeof routes['siswa.me']
    index: typeof routes['siswa.index']
    show: typeof routes['siswa.show']
    store: typeof routes['siswa.store']
    update: typeof routes['siswa.update']
    destroy: typeof routes['siswa.destroy']
  }
  kelas: {
    index: typeof routes['kelas.index']
    show: typeof routes['kelas.show']
    store: typeof routes['kelas.store']
    update: typeof routes['kelas.update']
    destroy: typeof routes['kelas.destroy']
  }
  pembayaranSppLes: {
    index: typeof routes['pembayaran_spp_les.index']
    store: typeof routes['pembayaran_spp_les.store']
    update: typeof routes['pembayaran_spp_les.update']
    restore: typeof routes['pembayaran_spp_les.restore']
    destroy: typeof routes['pembayaran_spp_les.destroy']
  }
  tabungan: {
    storeMutasi: typeof routes['tabungan.store_mutasi']
    destroyMutasi: typeof routes['tabungan.destroy_mutasi']
    restoreMutasi: typeof routes['tabungan.restore_mutasi']
    summary: typeof routes['tabungan.summary']
    showBySiswa: typeof routes['tabungan.show_by_siswa']
  }
}
