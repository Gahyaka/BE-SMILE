/*
  Warnings:

  - The values [ADMIN] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('ADMIN_ADMINISTRASI', 'ADMIN_TRANSAKSI', 'GURU', 'SISWA') NOT NULL DEFAULT 'GURU';
