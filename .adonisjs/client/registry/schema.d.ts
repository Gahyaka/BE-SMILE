/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
    }
  }
  'dokumentasi.public_gallery': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/public/galeri'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['publicGallery']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['publicGallery']>>>
    }
  }
  'auth.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
    }
  }
  'auth.change_password': {
    methods: ["PUT"]
    pattern: '/api/v1/auth/change-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['changePassword']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'murojaah.get_master_data': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/murojaah/kategori'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['getMasterData']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['getMasterData']>>>
    }
  }
  'murojaah.get_nilai_siswa': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/murojaah/siswa/:siswaId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { siswaId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['getNilaiSiswa']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['getNilaiSiswa']>>>
    }
  }
  'dokumentasi.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dokumentasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['index']>>>
    }
  }
  'dokumentasi.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dokumentasi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['show']>>>
    }
  }
  'siswa.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/siswa/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['me']>>>
    }
  }
  'auth.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['index']>>>
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
    }
  }
  'kelas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/kelas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['index']>>>
    }
  }
  'siswa.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/siswa'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['index']>>>
    }
  }
  'siswa.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/siswa/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['show']>>>
    }
  }
  'kelas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/kelas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['show']>>>
    }
  }
  'pembayaran_spp_les.matriks': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/pembayaran-spp-les/matriks'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['matriks']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['matriks']>>>
    }
  }
  'pembayaran_spp_les.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/pembayaran-spp-les'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['index']>>>
    }
  }
  'murojaah.store_kategori': {
    methods: ["POST"]
    pattern: '/api/v1/murojaah/kategori'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['storeKategori']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['storeKategori']>>>
    }
  }
  'murojaah.update_kategori': {
    methods: ["PUT"]
    pattern: '/api/v1/murojaah/kategori/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['updateKategori']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['updateKategori']>>>
    }
  }
  'murojaah.destroy_kategori': {
    methods: ["DELETE"]
    pattern: '/api/v1/murojaah/kategori/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['destroyKategori']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['destroyKategori']>>>
    }
  }
  'murojaah.store_materi': {
    methods: ["POST"]
    pattern: '/api/v1/murojaah/materi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['storeMateri']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['storeMateri']>>>
    }
  }
  'murojaah.update_materi': {
    methods: ["PUT"]
    pattern: '/api/v1/murojaah/materi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['updateMateri']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['updateMateri']>>>
    }
  }
  'murojaah.destroy_materi': {
    methods: ["DELETE"]
    pattern: '/api/v1/murojaah/materi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['destroyMateri']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['destroyMateri']>>>
    }
  }
  'murojaah.save_nilai': {
    methods: ["POST"]
    pattern: '/api/v1/murojaah/penilaian'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['saveNilai']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/murojaah_controller').default['saveNilai']>>>
    }
  }
  'dokumentasi.store': {
    methods: ["POST"]
    pattern: '/api/v1/dokumentasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['store']>>>
    }
  }
  'dokumentasi.update': {
    methods: ["PUT"]
    pattern: '/api/v1/dokumentasi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['update']>>>
    }
  }
  'dokumentasi.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/dokumentasi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['destroy']>>>
    }
  }
  'dokumentasi.destroy_foto': {
    methods: ["DELETE"]
    pattern: '/api/v1/dokumentasi/foto/:fotoId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { fotoId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['destroyFoto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['destroyFoto']>>>
    }
  }
  'kelas.store': {
    methods: ["POST"]
    pattern: '/api/v1/kelas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['store']>>>
    }
  }
  'kelas.update': {
    methods: ["PUT"]
    pattern: '/api/v1/kelas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['update']>>>
    }
  }
  'kelas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/kelas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/kelas_controller').default['destroy']>>>
    }
  }
  'siswa.import_excel': {
    methods: ["POST"]
    pattern: '/api/v1/siswas/import'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['importExcel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['importExcel']>>>
    }
  }
  'siswa.download_template': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/siswas/template'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['downloadTemplate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['downloadTemplate']>>>
    }
  }
  'siswa.store': {
    methods: ["POST"]
    pattern: '/api/v1/siswa'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['store']>>>
    }
  }
  'siswa.update': {
    methods: ["PUT"]
    pattern: '/api/v1/siswa/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['update']>>>
    }
  }
  'siswa.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/siswa/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/siswas_controller').default['destroy']>>>
    }
  }
  'auth.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['destroy']>>>
    }
  }
  'auth.reset_password': {
    methods: ["PUT"]
    pattern: '/api/v1/users/:id/reset-password'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['resetPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['resetPassword']>>>
    }
  }
  'dokumentasi.toggle_public_gallery': {
    methods: ["PATCH"]
    pattern: '/api/v1/dokumentasi/:id/toggle-public'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['togglePublicGallery']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dokumentasi_controller').default['togglePublicGallery']>>>
    }
  }
  'pembayaran_spp_les.store': {
    methods: ["POST"]
    pattern: '/api/v1/pembayaran-spp-les'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['store']>>>
    }
  }
  'pembayaran_spp_les.update': {
    methods: ["PUT"]
    pattern: '/api/v1/pembayaran-spp-les/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['update']>>>
    }
  }
  'pembayaran_spp_les.restore': {
    methods: ["PUT"]
    pattern: '/api/v1/pembayaran-spp-les/:id/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['restore']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['restore']>>>
    }
  }
  'pembayaran_spp_les.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/pembayaran-spp-les/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pembayaran_spp_les_controller').default['destroy']>>>
    }
  }
  'tabungan.store_mutasi': {
    methods: ["POST"]
    pattern: '/api/v1/tabungan/mutasi'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['storeMutasi']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['storeMutasi']>>>
    }
  }
  'tabungan.destroy_mutasi': {
    methods: ["DELETE"]
    pattern: '/api/v1/tabungan/mutasi/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['destroyMutasi']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['destroyMutasi']>>>
    }
  }
  'tabungan.restore_mutasi': {
    methods: ["PUT"]
    pattern: '/api/v1/tabungan/mutasi/:id/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['restoreMutasi']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['restoreMutasi']>>>
    }
  }
  'tabungan.summary': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tabungan/summary'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['summary']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['summary']>>>
    }
  }
  'tabungan.show_by_siswa': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tabungan/siswa/:siswaId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { siswaId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['showBySiswa']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tabungan_controller').default['showBySiswa']>>>
    }
  }
}
