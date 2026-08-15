-- CreateTable
CREATE TABLE `kegiatan_dokumentasi` (
    `id` VARCHAR(191) NOT NULL,
    `nama_kegiatan` VARCHAR(191) NOT NULL,
    `tanggal_kegiatan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deskripsi` TEXT NULL,
    `gdrive_folder_id` VARCHAR(191) NULL,
    `gdrive_folder_url` VARCHAR(191) NULL,
    `petugas_id` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foto_dokumentasi` (
    `id` VARCHAR(191) NOT NULL,
    `kegiatan_id` VARCHAR(191) NOT NULL,
    `nama_file` VARCHAR(191) NOT NULL,
    `gdrive_file_id` VARCHAR(191) NOT NULL,
    `view_url` TEXT NOT NULL,
    `download_url` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kegiatan_dokumentasi` ADD CONSTRAINT `kegiatan_dokumentasi_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `foto_dokumentasi` ADD CONSTRAINT `foto_dokumentasi_kegiatan_id_fkey` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatan_dokumentasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
