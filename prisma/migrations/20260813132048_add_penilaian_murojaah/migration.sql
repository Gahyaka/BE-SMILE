-- CreateTable
CREATE TABLE `kategori_murojaah` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materi_murojaah` (
    `id` VARCHAR(191) NOT NULL,
    `kategori_id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penilaian_murojaah` (
    `id` VARCHAR(191) NOT NULL,
    `siswa_id` VARCHAR(191) NOT NULL,
    `materi_id` VARCHAR(191) NOT NULL,
    `predikat` ENUM('SB', 'B', 'C', 'K') NULL,
    `petugas_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `penilaian_murojaah_siswa_id_materi_id_key`(`siswa_id`, `materi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `materi_murojaah` ADD CONSTRAINT `materi_murojaah_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_murojaah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian_murojaah` ADD CONSTRAINT `penilaian_murojaah_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian_murojaah` ADD CONSTRAINT `penilaian_murojaah_materi_id_fkey` FOREIGN KEY (`materi_id`) REFERENCES `materi_murojaah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian_murojaah` ADD CONSTRAINT `penilaian_murojaah_petugas_id_fkey` FOREIGN KEY (`petugas_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
