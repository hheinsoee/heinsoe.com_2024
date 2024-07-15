/*
  Warnings:

  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contenttype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fieldtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapcontenttaxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mapcontenttypetaxonomytype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxonomy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taxonomytype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_ibfk_1`;

-- DropForeignKey
ALTER TABLE `field` DROP FOREIGN KEY `Field_ibfk_1`;

-- DropForeignKey
ALTER TABLE `fieldtype` DROP FOREIGN KEY `FieldType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttaxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttaxonomy` DROP FOREIGN KEY `map_Content_Taxonomy_ibfk_2`;

-- DropForeignKey
ALTER TABLE `mapcontenttypetaxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_1`;

-- DropForeignKey
ALTER TABLE `mapcontenttypetaxonomytype` DROP FOREIGN KEY `map_ContentType_TaxonomyType_ibfk_2`;

-- DropForeignKey
ALTER TABLE `taxonomy` DROP FOREIGN KEY `Taxonomy_ibfk_1`;

-- DropTable
DROP TABLE `content`;

-- DropTable
DROP TABLE `contenttype`;

-- DropTable
DROP TABLE `field`;

-- DropTable
DROP TABLE `fieldtype`;

-- DropTable
DROP TABLE `mapcontenttaxonomy`;

-- DropTable
DROP TABLE `mapcontenttypetaxonomytype`;

-- DropTable
DROP TABLE `taxonomy`;

-- DropTable
DROP TABLE `taxonomytype`;

-- CreateTable
CREATE TABLE `Experance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(200) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `imageId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(200) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `imageId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `imageId` INTEGER NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caption` VARCHAR(191) NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `createdDt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Techs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTechsExperance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExperanceId` INTEGER NOT NULL,
    `TechsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTechsProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProjectId` INTEGER NOT NULL,
    `TechsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTechsBlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `BlogId` INTEGER NOT NULL,
    `TechsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsExperance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ExperanceId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProjectId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapTagsBlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `BlogId` INTEGER NOT NULL,
    `TagsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experance` ADD CONSTRAINT `Experance_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsExperance` ADD CONSTRAINT `mapTechsExperance_ExperanceId_fkey` FOREIGN KEY (`ExperanceId`) REFERENCES `Experance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsExperance` ADD CONSTRAINT `mapTechsExperance_TechsId_fkey` FOREIGN KEY (`TechsId`) REFERENCES `Techs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsProject` ADD CONSTRAINT `mapTechsProject_ProjectId_fkey` FOREIGN KEY (`ProjectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsProject` ADD CONSTRAINT `mapTechsProject_TechsId_fkey` FOREIGN KEY (`TechsId`) REFERENCES `Techs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsBlog` ADD CONSTRAINT `mapTechsBlog_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTechsBlog` ADD CONSTRAINT `mapTechsBlog_TechsId_fkey` FOREIGN KEY (`TechsId`) REFERENCES `Techs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsExperance` ADD CONSTRAINT `mapTagsExperance_ExperanceId_fkey` FOREIGN KEY (`ExperanceId`) REFERENCES `Experance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsExperance` ADD CONSTRAINT `mapTagsExperance_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsProject` ADD CONSTRAINT `mapTagsProject_ProjectId_fkey` FOREIGN KEY (`ProjectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsProject` ADD CONSTRAINT `mapTagsProject_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsBlog` ADD CONSTRAINT `mapTagsBlog_BlogId_fkey` FOREIGN KEY (`BlogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mapTagsBlog` ADD CONSTRAINT `mapTagsBlog_TagsId_fkey` FOREIGN KEY (`TagsId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
