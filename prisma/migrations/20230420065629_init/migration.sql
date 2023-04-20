-- CreateTable
CREATE TABLE `mqtt_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `password` TEXT NULL,
    `salt` VARCHAR(191) NULL,
    `is_superuser` BOOLEAN NOT NULL DEFAULT false,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
