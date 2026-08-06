import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.store': { paramsTuple?: []; params?: {} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'kelas.store': { paramsTuple?: []; params?: {} }
    'siswa.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'kelas.index': { paramsTuple?: []; params?: {} }
    'kelas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.index': { paramsTuple?: []; params?: {} }
    'siswa.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'kelas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'kelas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'siswa.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}