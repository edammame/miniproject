/*
  Warnings:

  - You are about to drop the `organizerdetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `organizerdetail` DROP FOREIGN KEY `OrganizerDetail_organizerid_fkey`;

-- AlterTable
ALTER TABLE `customerdetail` MODIFY `inputRefCode` VARCHAR(191) NULL,
    MODIFY `customerTotalPoints` INTEGER NOT NULL DEFAULT 0,
    MODIFY `pointExpiryDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `organizerdetail`;
