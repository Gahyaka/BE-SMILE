-- AlterTable
ALTER TABLE `transaksi_spp` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    MODIFY `status` ENUM('BELUM_LUNAS', 'LUNAS', 'BATAL') NOT NULL DEFAULT 'LUNAS';
