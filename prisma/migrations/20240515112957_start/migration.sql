/*
  Warnings:

  - You are about to drop the `map_r_content_r_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `map_t_content_t_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `r_taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_taxonomy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `map_r_content_r_taxonomy` DROP FOREIGN KEY `map_r_content_r_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_r_content_r_taxonomy` DROP FOREIGN KEY `map_r_content_r_taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `map_t_content_t_taxonomy` DROP FOREIGN KEY `map_t_content_t_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `map_t_content_t_taxonomy` DROP FOREIGN KEY `map_t_content_t_taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `r_content` DROP FOREIGN KEY `r_content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `r_field` DROP FOREIGN KEY `r_field_ibfk_1`;

-- DropForeignKey
ALTER TABLE `r_taxonomy` DROP FOREIGN KEY `r_taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `t_field` DROP FOREIGN KEY `t_field_ibfk_1`;

-- DropTable
DROP TABLE `map_r_content_r_taxonomy`;

-- DropTable
DROP TABLE `map_t_content_t_taxonomy`;

-- DropTable
DROP TABLE `r_content`;

-- DropTable
DROP TABLE `r_field`;

-- DropTable
DROP TABLE `r_taxonomy`;

-- DropTable
DROP TABLE `t_content`;

-- DropTable
DROP TABLE `t_field`;

-- DropTable
DROP TABLE `t_taxonomy`;

-- CreateTable
CREATE TABLE `content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `body` TEXT NULL,
    `contentTypeId` INTEGER NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`contentTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contentType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(255) NULL,
    `value` TEXT NULL,
    `contentId` INTEGER NULL,

    INDEX `contentId`(`contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fieldType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `contentTypeId` INTEGER NULL,
    `dataType` VARCHAR(20) NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`contentTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapContentTaxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contentId` INTEGER NOT NULL,
    `taxonomyId` INTEGER NOT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `contentId`(`contentId`),
    INDEX `taxonomy_id`(`taxonomyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapContentTypeTaxonomyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxonomyTypeId` INTEGER NOT NULL,
    `contentTypeId` INTEGER NOT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`taxonomyTypeId`),
    INDEX `type_id`(`contentTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxonomyTypeId` INTEGER NULL,
    `name` VARCHAR(200) NOT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`taxonomyTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxonomyType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `createTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `Content_ibfk_1` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `field` ADD CONSTRAINT `Field_ibfk_1` FOREIGN KEY (`contentId`) REFERENCES `content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fieldType` ADD CONSTRAINT `FieldType_ibfk_1` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTaxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_1` FOREIGN KEY (`contentId`) REFERENCES `content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTaxonomy` ADD CONSTRAINT `map_Content_Taxonomy_ibfk_2` FOREIGN KEY (`taxonomyId`) REFERENCES `taxonomy`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTypeTaxonomyType` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_1` FOREIGN KEY (`taxonomyTypeId`) REFERENCES `taxonomyType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mapContentTypeTaxonomyType` ADD CONSTRAINT `map_ContentType_TaxonomyType_ibfk_2` FOREIGN KEY (`contentTypeId`) REFERENCES `contentType`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `taxonomy` ADD CONSTRAINT `Taxonomy_ibfk_1` FOREIGN KEY (`taxonomyTypeId`) REFERENCES `taxonomyType`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
