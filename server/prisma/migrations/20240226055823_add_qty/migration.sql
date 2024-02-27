/*
  Warnings:

  - Added the required column `qty` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `qty` DECIMAL(18, 2) NOT NULL;
