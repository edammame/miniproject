/*
  Warnings:

  - You are about to drop the `EventTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `EventTransaction` DROP FOREIGN KEY `EventTransaction_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventTransaction` DROP FOREIGN KEY `EventTransaction_transaction_id_fkey`;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `event_id` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `EventTransaction`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `EventDetail`(`eventid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
