/*
  Warnings:

  - A unique constraint covering the columns `[siswaId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `siswaId` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN_ADMINISTRASI', 'ADMIN_TRANSAKSI', 'GURU', 'SISWA') NOT NULL DEFAULT 'SISWA';

-- CreateIndex
CREATE UNIQUE INDEX `users_siswaId_key` ON `users`(`siswaId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `siswa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
