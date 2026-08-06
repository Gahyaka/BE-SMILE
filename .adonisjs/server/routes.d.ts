import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.store': { paramsTuple?: []; params?: {} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'siswa.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'siswa.me': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}