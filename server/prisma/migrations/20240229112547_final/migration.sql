/*
  Warnings:

  - You are about to drop the `eventtransaction` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `inputRefCode` on table `customerdetail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pointExpiryDate` on table `customerdetail` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `event_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eventtransaction` DROP FOREIGN KEY `EventTransaction_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `eventtransaction` DROP FOREIGN KEY `EventTransaction_transaction_id_fkey`;

-- AlterTable
ALTER TABLE `customerdetail` MODIFY `inputRefCode` VARCHAR(191) NOT NULL,
    ALTER COLUMN `customerTotalPoints` DROP DEFAULT,
    MODIFY `pointExpiryDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `event_id` INTEGER NOT NULL,
    ADD COLUMN `qty` DECIMAL(18, 2) NOT NULL,
    MODIFY `voucher_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `eventtransaction`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `EventDetail`(`eventid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
