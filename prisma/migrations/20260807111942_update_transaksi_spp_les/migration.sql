/*
  Warnings:

  - You are about to drop the column `nominal` on the `transaksi_spp` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `transaksi_spp` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(1))`.
  - Added the required column `total_bayar` to the `transaksi_spp` table without a default value. This is not possible if the table is not empty.
  - Made the column `tanggal_bayar` on table `transaksi_spp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transaksi_spp` DROP COLUMN `nominal`,
    ADD COLUMN `nominal_les` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `nominal_spp` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `status_setoran` ENUM('SUDAH', 'BELUM') NOT NULL DEFAULT 'BELUM',
    ADD COLUMN `total_bayar` DECIMAL(12, 2) NOT NULL,
    MODIFY `nomor_kwitansi` VARCHAR(191) NULL,
    MODIFY `bulan` INTEGER NULL,
    MODIFY `tahun` INTEGER NULL,
    MODIFY `status` ENUM('BELUM_LUNAS', 'LUNAS') NOT NULL DEFAULT 'LUNAS',
    MODIFY `tanggal_bayar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `catatan` TEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN_ADMINISTRASI', 'ADMIN_TRANSAKSI', 'GURU', 'SISWA') NOT NULL DEFAULT 'GURU';
