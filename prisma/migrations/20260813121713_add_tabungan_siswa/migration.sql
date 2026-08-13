/*
  Warnings:

  - You are about to drop the `tabungan_siswa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tabungan_siswa` DROP FOREIGN KEY `tabungan_siswa_petugas_id_fkey`;

-- DropForeignKey
ALTER TABLE `tabungan_siswa` DROP FOREIGN KEY `tabungan_siswa_siswa_id_fkey`;

-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `saldo_tabungan` DECIMAL(12, 2) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `tabungan_siswa`;

-- CreateTable
CREATE TABLE `mutasi_tabungan` (
    `id` VARCHAR(191) NOT NULL,
    `siswa_id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jenis_mutasi` ENUM('DEBET', 'KREDIT') NOT NULL,
    `nominal` DECIMAL(12, 2) NOT NULL,
    `saldo_sebelum` DECIMAL(12, 2) NOT NULL,
    `saldo_sesudah` DECIMAL(12, 2) NOT NULL,
    `keterangan` TEXT NULL,
    `petugas_id` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mutasi_tabungan` ADD CONSTRAINT `mutasi_tabungan_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mutasi_tabungan` ADD CONSTRAINT `mutasi_tabungan_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
