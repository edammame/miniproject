-- CreateTable
CREATE TABLE `User` (
    `userid` INTEGER NOT NULL AUTO_INCREMENT,
    `avatar_url` VARCHAR(255) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `lastLoginat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('customer', 'organizer') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerDetail` (
    `customerid` INTEGER NOT NULL,
    `role` ENUM('customer', 'organizer') NULL DEFAULT 'customer',
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `inputRefCode` VARCHAR(191) NOT NULL,
    `customerReferralNo` VARCHAR(191) NOT NULL,
    `customerTotalPoints` INTEGER NOT NULL,
    `pointExpiryDate` DATETIME(3) NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`customerid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizerDetail` (
    `organizerid` INTEGER NOT NULL,
    `role` ENUM('customer', 'organizer') NULL DEFAULT 'organizer',
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`organizerid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventDetail` (
    `eventid` INTEGER NOT NULL AUTO_INCREMENT,
    `eventname` VARCHAR(191) NOT NULL,
    `eventposter` VARCHAR(255) NULL,
    `eventdescription` VARCHAR(191) NOT NULL,
    `eventtype` ENUM('paid', 'free') NOT NULL DEFAULT 'paid',
    `eventprice` DECIMAL(18, 2) NOT NULL,
    `availableseat` INTEGER NOT NULL,
    `eventstartdate` DATETIME(3) NOT NULL,
    `eventenddate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,

    PRIMARY KEY (`eventid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventCategory` (
    `event_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`event_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventbyCategory` (
    `categoryid` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`categoryid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventbyLocation` (
    `locationid` INTEGER NOT NULL AUTO_INCREMENT,
    `eventlocation` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`locationid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transactionid` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotalprice` DECIMAL(18, 2) NOT NULL,
    `discountprice` DECIMAL(18, 2) NOT NULL,
    `totalprice` DECIMAL(18, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `voucher_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transactionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventTransaction` (
    `event_id` INTEGER NOT NULL,
    `transaction_id` INTEGER NOT NULL,

    PRIMARY KEY (`event_id`, `transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `voucherid` VARCHAR(191) NOT NULL,
    `vouchername` VARCHAR(191) NOT NULL,
    `voucherpromodesc` VARCHAR(255) NULL,
    `discount` DECIMAL(18, 2) NOT NULL,
    `voucherstartdate` DATETIME(3) NOT NULL,
    `voucherenddate` DATETIME(3) NOT NULL,
    `stock` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`voucherid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoucherUser` (
    `voucher_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `isValid` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`voucher_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `customer_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`customer_id`, `event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerDetail` ADD CONSTRAINT `CustomerDetail_customerid_fkey` FOREIGN KEY (`customerid`) REFERENCES `User`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrganizerDetail` ADD CONSTRAINT `OrganizerDetail_organizerid_fkey` FOREIGN KEY (`organizerid`) REFERENCES `User`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventDetail` ADD CONSTRAINT `EventDetail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventDetail` ADD CONSTRAINT `EventDetail_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `EventbyLocation`(`locationid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventCategory` ADD CONSTRAINT `EventCategory_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `EventDetail`(`eventid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventCategory` ADD CONSTRAINT `EventCategory_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `EventbyCategory`(`categoryid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher`(`voucherid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventTransaction` ADD CONSTRAINT `EventTransaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `EventDetail`(`eventid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EventTransaction` ADD CONSTRAINT `EventTransaction_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`transactionid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher`(`voucherid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `VoucherUser` ADD CONSTRAINT `VoucherUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `CustomerDetail`(`customerid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `EventDetail`(`eventid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
