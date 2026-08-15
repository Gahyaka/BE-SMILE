import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'dokumentasi.public_gallery': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'murojaah.get_master_data': { paramsTuple?: []; params?: {} }
    'murojaah.get_nilai_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
    'dokumentasi.index': { paramsTuple?: []; params?: {} }
    'dokumentasi.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.index': { paramsTuple?: []; params?: {} }
    'murojaah.store_kategori': { paramsTuple?: []; params?: {} }
    'murojaah.update_kategori': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.destroy_kategori': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.store_materi': { paramsTuple?: []; params?: {} }
    'murojaah.update_materi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.destroy_materi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.save_nilai': { paramsTuple?: []; params?: {} }
    'dokumentasi.store': { paramsTuple?: []; params?: {} }
    'dokumentasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.destroy_foto': { paramsTuple: [ParamValue]; params: {'fotoId': ParamValue} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.store': { paramsTuple?: []; params?: {} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.toggle_public_gallery': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.store': { paramsTuple?: []; params?: {} }
    'pembayaran_spp_les.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tabungan.store_mutasi': { paramsTuple?: []; params?: {} }
    'tabungan.destroy_mutasi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tabungan.restore_mutasi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tabungan.summary': { paramsTuple?: []; params?: {} }
    'tabungan.show_by_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'murojaah.store_kategori': { paramsTuple?: []; params?: {} }
    'murojaah.store_materi': { paramsTuple?: []; params?: {} }
    'murojaah.save_nilai': { paramsTuple?: []; params?: {} }
    'dokumentasi.store': { paramsTuple?: []; params?: {} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'siswa.store': { paramsTuple?: []; params?: {} }
    'pembayaran_spp_les.store': { paramsTuple?: []; params?: {} }
    'tabungan.store_mutasi': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'dokumentasi.public_gallery': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'murojaah.get_master_data': { paramsTuple?: []; params?: {} }
    'murojaah.get_nilai_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
    'dokumentasi.index': { paramsTuple?: []; params?: {} }
    'dokumentasi.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.index': { paramsTuple?: []; params?: {} }
    'tabungan.summary': { paramsTuple?: []; params?: {} }
    'tabungan.show_by_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
  }
  HEAD: {
    'dokumentasi.public_gallery': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'murojaah.get_master_data': { paramsTuple?: []; params?: {} }
    'murojaah.get_nilai_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
    'dokumentasi.index': { paramsTuple?: []; params?: {} }
    'dokumentasi.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.index': { paramsTuple?: []; params?: {} }
    'tabungan.summary': { paramsTuple?: []; params?: {} }
    'tabungan.show_by_siswa': { paramsTuple: [ParamValue]; params: {'siswaId': ParamValue} }
  }
  PUT: {
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'murojaah.update_kategori': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.update_materi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tabungan.restore_mutasi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'murojaah.destroy_kategori': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'murojaah.destroy_materi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dokumentasi.destroy_foto': { paramsTuple: [ParamValue]; params: {'fotoId': ParamValue} }
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pembayaran_spp_les.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tabungan.destroy_mutasi': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'dokumentasi.toggle_public_gallery': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}