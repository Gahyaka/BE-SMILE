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
