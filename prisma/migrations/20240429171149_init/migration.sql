-- CreateTable
CREATE TABLE `map_r_content_r_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `r_content_id` INTEGER NOT NULL,
    `r_taxonomy_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `content_id`(`r_content_id`),
    INDEX `taxonomy_id`(`r_taxonomy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map_t_content_t_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `t_taxonomy_id` INTEGER NOT NULL,
    `t_content_id` INTEGER NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`t_taxonomy_id`),
    INDEX `type_id`(`t_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `body` TEXT NULL,
    `t_content_id` INTEGER NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`t_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(255) NULL,
    `value` TEXT NULL,
    `r_content_id` INTEGER NULL,

    INDEX `content_id`(`r_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `t_taxonomy_id` INTEGER NULL,
    `name` VARCHAR(200) NOT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `taxonomy_id`(`t_taxonomy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `t_content_id` INTEGER NULL,
    `data_type` VARCHAR(20) NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `type_id`(`t_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_taxonomy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `create_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `map_r_content_r_taxonomy` ADD CONSTRAINT `map_r_content_r_taxonomy_ibfk_1` FOREIGN KEY (`r_content_id`) REFERENCES `r_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_r_content_r_taxonomy` ADD CONSTRAINT `map_r_content_r_taxonomy_ibfk_2` FOREIGN KEY (`r_taxonomy_id`) REFERENCES `r_taxonomy`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_t_content_t_taxonomy` ADD CONSTRAINT `map_t_content_t_taxonomy_ibfk_1` FOREIGN KEY (`t_taxonomy_id`) REFERENCES `t_taxonomy`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `map_t_content_t_taxonomy` ADD CONSTRAINT `map_t_content_t_taxonomy_ibfk_2` FOREIGN KEY (`t_content_id`) REFERENCES `t_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `r_content` ADD CONSTRAINT `r_content_ibfk_1` FOREIGN KEY (`t_content_id`) REFERENCES `t_content`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `r_field` ADD CONSTRAINT `r_field_ibfk_1` FOREIGN KEY (`r_content_id`) REFERENCES `r_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `r_taxonomy` ADD CONSTRAINT `r_taxonomy_ibfk_1` FOREIGN KEY (`t_taxonomy_id`) REFERENCES `t_taxonomy`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `t_field` ADD CONSTRAINT `t_field_ibfk_1` FOREIGN KEY (`t_content_id`) REFERENCES `t_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
