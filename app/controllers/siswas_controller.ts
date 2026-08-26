import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma_service'
import * as XLSX from 'xlsx'
import fs from 'node:fs/promises'
import ExcelJS from 'exceljs'
// import bcrypt from 'bcryptjs'

// function generateRandomPassword(length = 6): string {
//   const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
//   let result = ''
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return result
// }

export default class SiswaController {
  /**
   * GET /api/v1/siswa/me
   * Mengambil data siswa milik user yang sedang login
   */
  public async me({ request, response }: HttpContext) {
    try {
      const authUser = (request as any).authUser

      const userWithSiswa = await prisma.user.findUnique({
        where: { id: authUser.id },
        include: {
          siswa: {
            include: {
              kelas: true,
            },
          },
        },
      })

      if (!userWithSiswa || !userWithSiswa.siswa) {
        return response.notFound({
          success: false,
          message: 'Data siswa untuk akun ini belum dikaitkan',
        })
      }

      return response.ok({
        success: true,
        message: 'Berhasil mengambil data siswa profil',
        data: userWithSiswa.siswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil data siswa',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/siswa (Get All Siswa)
   */
  public async index({ request, response }: HttpContext) {
      try {
        const authUser = (request as any).authUser
        const { search, kelasId } = request.qs()

        // 1. Kondisi filter dasar
        let whereCondition: any = {
          ...(kelasId && { kelasId }),
          ...(search && {
            OR: [
              { namaLengkap: { contains: search } },
              { nis: { contains: search } },
              { nisn: { contains: search } },
            ],
          }),
        }

        // 2. Jika role GURU: Batasi hanya melihat siswa di kelas yang dia ampu
        if (authUser?.role === 'GURU') {
          // Cari kelas yang wali kelasnya sesuai dengan user login (cek by ID atau nama jika relasi string)
          const kelasDiampu = await prisma.kelas.findMany({
            where: {
              OR: [
                { guruId: authUser.id },
                { waliKelas: authUser.namaLengkap || authUser.nama || '' },
              ],
            },
            select: { id: true },
          })

          const allowedKelasIds = kelasDiampu.map((k: any) => k.id)

          // Sisipkan filter kelasId agar hanya menampilkan anak didiknya
          whereCondition.kelasId = {
            in: allowedKelasIds,
          }
        }

        // 3. Eksekusi query dengan filter yang sudah disesuaikan
        const siswaList = await prisma.siswa.findMany({
          where: whereCondition,
          include: {
            kelas: {
              select: {
                id: true,
                namaKelas: true,
                tahunAjaran: true,
                waliKelas: true,
              },
            },
          },
          orderBy: { namaLengkap: 'asc' },
        })

        return response.ok({
          success: true,
          message: 'Berhasil mengambil data siswa',
          data: siswaList,
        })
      } catch (error: any) {
        return response.internalServerError({
          success: false,
          message: 'Gagal mengambil data siswa',
          error: error.message,
        })
      }
    }
    /**
   * GET /api/siswas/template
   */
    public async downloadTemplate({ response }: HttpContext) {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Template Siswa')

        // 1. Definisikan Kolom & Lebar Otomatis
        worksheet.columns = [
          { header: 'NIS', key: 'nis', width: 15 },
          { header: 'NISN', key: 'nisn', width: 18 },
          { header: 'Nama Lengkap', key: 'namaLengkap', width: 25 },
          { header: 'Nama Orang Tua', key: 'namaOrangTua', width: 22 },
          { header: 'Alamat', key: 'alamat', width: 30 },
          { header: 'Tinggi Badan', key: 'tinggiBadan', width: 16 },
          { header: 'Berat Badan', key: 'beratBadan', width: 16 },
          { header: 'Lingkar Kepala', key: 'lingkarKepala', width: 16 },
          { header: 'Semester', key: 'semester', width: 14 },
          { header: 'Tahun Ajaran', key: 'tahunAjaran', width: 16 },
        ]

        // 2. Beri Style Khusus pada Baris Header (Baris 1)
        const headerRow = worksheet.getRow(1)
        headerRow.height = 24

        headerRow.eachCell((cell) => {
          // Background Hijau Lembut (Sage Green / Tea Green seperti foto)
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFC8E6C9' }, // Warna hijau muda
          }
          // Font Tebal
          cell.font = {
            name: 'Calibri',
            size: 11,
            bold: true,
            color: { argb: 'FF000000' },
          }
          // Rata Tengah Vertikal & Horizontal
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          }
          // Border Tipis di Sekeliling Sel
          cell.border = {
            top: { style: 'thin', color: { argb: 'FF9E9E9E' } },
            left: { style: 'thin', color: { argb: 'FF9E9E9E' } },
            bottom: { style: 'thin', color: { argb: 'FF9E9E9E' } },
            right: { style: 'thin', color: { argb: 'FF9E9E9E' } },
          }
        })

        // 3. Generate Buffer & Kirim Response
        const buffer = await workbook.xlsx.writeBuffer()

        response.header('Content-Disposition', 'attachment; filename="template_import_siswa.xlsx"')
        response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return response.send(Buffer.from(buffer))
      }
   /**
   * POST /api/siswa/import
   */
  public async importExcel({ request, response }: HttpContext) {
      
      try {
        const file = request.file('file', {
          size: '5mb',
          extnames: ['xlsx', 'xls', 'csv'],
        })

        const { kelasId } = request.body()

        if (!file || !file.isValid) {
          return response.badRequest({
            success: false,
            message: file ? file.errors[0]?.message : 'File Excel wajib diunggah',
          })
        }

        if (!kelasId) {
          return response.badRequest({
            success: false,
            message: 'Pilih kelas tujuan (kelasId wajib diisi)',
          })
        }

        // Validasi kelas exists
        const kelasExists = await prisma.kelas.findUnique({
          where: { id: kelasId },
        })

        if (!kelasExists) {
          return response.badRequest({
            success: false,
            message: 'Kelas yang dipilih tidak ditemukan di database',
          })
        }

        // Baca File Excel
        const fileBuffer = await fs.readFile(file.tmpPath!)
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rawData: any[] = XLSX.utils.sheet_to_json(worksheet)

        if (rawData.length === 0) {
          return response.badRequest({
            success: false,
            message: 'File Excel yang diunggah kosong',
          })
        }

        const listSiswaBaru: any[] = []
        const errors: string[] = []

        // Parsing & Validasi Tiap Baris
        for (let i = 0; i < rawData.length; i++) {
          const row = rawData[i]
          const rowNumber = i + 2 // Baris di Excel (Header = 1)

          const namaLengkap = row['Nama Lengkap'] || row['namaLengkap']
          const nis = row['NIS'] || row['nis'] ? String(row['NIS'] || row['nis']).trim() : null
          const nisn = row['NISN'] || row['nisn'] ? String(row['NISN'] || row['nisn']).trim() : null
          const namaOrangTua = row['Nama Orang Tua'] || row['namaOrangTua'] || null
          const alamat = row['Alamat'] || row['alamat'] || null
          
          // Konversi angka (Float / Int)
          const tinggiBadan = row['Tinggi Badan'] || row['tinggiBadan'] ? parseFloat(row['Tinggi Badan'] || row['tinggiBadan']) : null
          const beratBadan = row['Berat Badan'] || row['beratBadan'] ? parseFloat(row['Berat Badan'] || row['beratBadan']) : null
          const lingkarKepala = row['Lingkar Kepala'] || row['lingkarKepala'] ? parseFloat(row['Lingkar Kepala'] || row['lingkarKepala']) : null
          
          const semester = row['Semester'] || row['semester'] ? String(row['Semester'] || row['semester']).trim() : null
          const tahunAjaran = row['Tahun Ajaran'] || row['tahunAjaran'] ? String(row['Tahun Ajaran'] || row['tahunAjaran']).trim() : null

          if (!namaLengkap) {
            errors.push(`Baris ${rowNumber}: Kolom 'Nama Lengkap' wajib diisi`)
            continue
          }
          if (!namaLengkap || String(namaLengkap).toLowerCase() === 'contoh' || String(namaLengkap).toLowerCase() === 'nama siswa contoh') {
            continue
          }
          listSiswaBaru.push({
            nis,
            nisn,
            namaLengkap: String(namaLengkap).trim(),
            namaOrangTua: namaOrangTua ? String(namaOrangTua).trim() : null,
            alamat: alamat ? String(alamat).trim() : null,
            tinggiBadan,
            beratBadan,
            lingkarKepala,
            semester,
            tahunAjaran,
            kelasId,
          })
        }

        if (errors.length > 0 && listSiswaBaru.length === 0) {
          return response.badRequest({
            success: false,
            message: 'Semua baris data tidak valid',
            errors,
          })
        }

        // Simpan massal
        const inserted = await prisma.siswa.createMany({
          data: listSiswaBaru,
          skipDuplicates: true,
        })

        return response.created({
          success: true,
          message: `Berhasil mengimpor ${inserted.count} data siswa`,
          data: {
            totalBerhasil: inserted.count,
            totalGagal: errors.length,
            errors: errors.length > 0 ? errors : undefined,
          },
        })
      } catch (error: any) {
        return response.internalServerError({
          success: false,
          message: 'Gagal memproses file Excel',
          error: error.message,
        })
      }
    }
  /**
   * POST /api/v1/siswa (Tambah Siswa Baru)
   */
  public async store({ request, response }: HttpContext) {
    try {
      const {
        nis,
        nisn,
        namaLengkap,
        namaOrangTua,
        alamat,
        tinggiBadan,
        beratBadan,
        lingkarKepala,
        semester,
        tahunAjaran,
        kelasId,
      } = request.body()

      if (!namaLengkap || !namaOrangTua) {
        return response.badRequest({
          success: false,
          message: 'Nama lengkap dan nama orang tua wajib diisi',
        })
      }

      // Cek keunikan NIS (jika dikirim)
      if (nis) {
        const existingNis = await prisma.siswa.findUnique({
          where: { nis },
        })
        if (existingNis) {
          return response.conflict({
            success: false,
            message: 'NIS sudah terdaftar',
          })
        }
      }

      // Cek keunikan NISN (jika dikirim)
      if (nisn) {
        const existingNisn = await prisma.siswa.findUnique({
          where: { nisn },
        })
        if (existingNisn) {
          return response.conflict({
            success: false,
            message: 'NISN sudah terdaftar',
          })
        }
      }

      // Simpan data siswa baru
      const newSiswa = await prisma.siswa.create({
        data: {
          nis: nis || null,
          nisn: nisn || null,
          namaLengkap,
          namaOrangTua,
          alamat: alamat || null,
          tinggiBadan: tinggiBadan ? parseFloat(tinggiBadan) : null,
          beratBadan: beratBadan ? parseFloat(beratBadan) : null,
          lingkarKepala: lingkarKepala ? parseFloat(lingkarKepala) : null,
          semester: semester || null,
          tahunAjaran: tahunAjaran || null,
          kelasId: kelasId || null,
        },
        include: {
          kelas: true,
        },
      })

      // Generate Username: prioritas NISN -> NIS -> Random ID
      // const identifier = nisn || nis
      // const username = identifier
      //   ? `siswa_${identifier}`
      //   : `siswa_${newSiswa.id.replace(/-/g, '').slice(0, 6)}`

      // // Password Default: 'Paud@' + identifier ATAU Random Password
      // const plainPassword = identifier ? `Paud@${identifier}` : generateRandomPassword(6)

      // // Hash Password
      // const hashedPassword = await bcrypt.hash(plainPassword, 10)

      // // Otomatis Buat Akun User untuk Siswa ini
      // const newUser = await prisma.user.create({
      //   data: {
      //     username,
      //     password: hashedPassword,
      //     nama: namaLengkap,
      //     role: 'SISWA',
      //     siswaId: newSiswa.id,
      //   },
      //   select: {
      //     id: true,
      //     username: true,
      //     role: true,
      //   },
      // })

      return response.created({
        success: true,
        message: 'Berhasil menambahkan data dan membuat akun siswa',
        data: {
          siswa: newSiswa,
          // account: {
          //   userId: newUser.id,
          //   username: newUser.username,
          //   defaultPassword: plainPassword,
          //   role: newUser.role,
          // },
        },
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menambahkan data siswa',
        error: error.message,
      })
    }
  }

  /**
   * GET /api/v1/siswa/:id (Detail Siswa + Riwayat SPP & Tabungan)
   */
  public async show({ params, response }: HttpContext) {
    try {
      const siswa = await prisma.siswa.findUnique({
        where: { id: params.id },
        include: {
          kelas: true,
          transaksiSpp: {
            orderBy: { createdAt: 'desc' },
            take: 5, // 5 Transaksi SPP terakhir
          },
          mutasiTabungan: {
            orderBy: { createdAt: 'desc' },
            take: 5, 
          },
        },
      })

      if (!siswa) {
        return response.notFound({
          success: false,
          message: 'Data siswa tidak ditemukan',
        })
      }

      return response.ok({
        success: true,
        message: 'Detail siswa berhasil diambil',
        data: siswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal mengambil detail siswa',
        error: error.message,
      })
    }
  }

  /**
   * PUT /api/v1/siswa/:id (Update Data Siswa)
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const {
        nis,
        nisn,
        namaLengkap,
        namaOrangTua,
        alamat,
        tinggiBadan,
        beratBadan,
        lingkarKepala,
        semester,
        tahunAjaran,
        kelasId,
      } = request.body()

      const updatedSiswa = await prisma.siswa.update({
        where: { id: params.id },
        data: {
          ...(nis !== undefined && { nis }),
          ...(nisn !== undefined && { nisn }),
          ...(namaLengkap && { namaLengkap }),
          ...(namaOrangTua && { namaOrangTua }),
          ...(alamat !== undefined && { alamat }),
          ...(tinggiBadan !== undefined && {
            tinggiBadan: tinggiBadan ? parseFloat(tinggiBadan) : null,
          }),
          ...(beratBadan !== undefined && {
            beratBadan: beratBadan ? parseFloat(beratBadan) : null,
          }),
          ...(lingkarKepala !== undefined && {
            lingkarKepala: lingkarKepala ? parseFloat(lingkarKepala) : null,
          }),
          ...(semester !== undefined && { semester }),
          ...(tahunAjaran !== undefined && { tahunAjaran }),
          ...(kelasId !== undefined && { kelasId }),
        },
        include: {
          kelas: true,
        },
      })

      return response.ok({
        success: true,
        message: 'Berhasil memperbarui data siswa',
        data: updatedSiswa,
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal memperbarui data siswa',
        error: error.message,
      })
    }
  }

  /**
   * DELETE /api/v1/siswa/:id (Hapus Siswa)
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await prisma.siswa.delete({
        where: { id: params.id },
      })

      return response.ok({
        success: true,
        message: 'Berhasil menghapus data siswa',
      })
    } catch (error: any) {
      return response.internalServerError({
        success: false,
        message: 'Gagal menghapus data siswa',
        error: error.message,
      })
    }
  }
}