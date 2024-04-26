-- CreateTable
CREATE TABLE `map_content_rectaxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NOT NULL,
    `taxonomy_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `content_id`(`content_id`),
    INDEX `taxonomy_id`(`taxonomy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rec_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `body` TEXT NULL,
    `type_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rec_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxonomy_id` INTEGER NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`taxonomy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map_taxonomy_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxonomy_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`taxonomy_id`),
    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rec_field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(255) NULL,
    `value` TEXT NULL,
    `content_id` INTEGER NULL,

    INDEX `content_id`(`content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ls_field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `type_id` INTEGER NULL,
    `data_type` VARCHAR(20) NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ls_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ls_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `map_content_rectaxonomy` ADD CONSTRAINT `map_content_rectaxonomy_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_content_rectaxonomy` ADD CONSTRAINT `map_content_rectaxonomy_ibfk_2` FOREIGN KEY (`taxonomy_id`) REFERENCES `rec_taxonomy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rec_content` ADD CONSTRAINT `rec_content_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `ls_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rec_taxonomy` ADD CONSTRAINT `rec_taxonomy_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `ls_taxonomy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_taxonomy_type` ADD CONSTRAINT `map_taxonomy_type_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `ls_taxonomy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_taxonomy_type` ADD CONSTRAINT `map_taxonomy_type_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `ls_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rec_field` ADD CONSTRAINT `rec_field_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ls_field` ADD CONSTRAINT `ls_field_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `ls_type`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
