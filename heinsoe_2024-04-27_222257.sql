-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: heinsoe
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('2eee7c76-f9eb-4c95-b08c-fc76e77ac647','a681b73beb42465be941be62deb36b050345d850415dc70bf6bd014ff8ca3db6','2024-04-23 06:56:58.098','20240423065657_table_name_change',NULL,NULL,'2024-04-23 06:56:57.114',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;

--
-- Table structure for table `ls_field`
--

DROP TABLE IF EXISTS `ls_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ls_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int DEFAULT NULL,
  `data_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `ls_field_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `ls_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ls_field`
--

/*!40000 ALTER TABLE `ls_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `ls_field` ENABLE KEYS */;

--
-- Table structure for table `ls_taxonomy`
--

DROP TABLE IF EXISTS `ls_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ls_taxonomy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ls_taxonomy`
--

/*!40000 ALTER TABLE `ls_taxonomy` DISABLE KEYS */;
INSERT INTO `ls_taxonomy` VALUES (1,'tag',NULL,'2024-04-27 10:15:49');
/*!40000 ALTER TABLE `ls_taxonomy` ENABLE KEYS */;

--
-- Table structure for table `ls_type`
--

DROP TABLE IF EXISTS `ls_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ls_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ls_type`
--

/*!40000 ALTER TABLE `ls_type` DISABLE KEYS */;
INSERT INTO `ls_type` VALUES (1,'experance',NULL,'2024-04-27 00:09:41'),(2,'project',NULL,'2024-04-27 00:09:56'),(3,'blog',NULL,'2024-04-27 00:10:38');
/*!40000 ALTER TABLE `ls_type` ENABLE KEYS */;

--
-- Table structure for table `map_content_rectaxonomy`
--

DROP TABLE IF EXISTS `map_content_rectaxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_content_rectaxonomy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content_id` int NOT NULL,
  `taxonomy_id` int NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `content_id` (`content_id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  CONSTRAINT `map_content_rectaxonomy_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content` (`id`) ON DELETE CASCADE,
  CONSTRAINT `map_content_rectaxonomy_ibfk_2` FOREIGN KEY (`taxonomy_id`) REFERENCES `rec_taxonomy` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_content_rectaxonomy`
--

/*!40000 ALTER TABLE `map_content_rectaxonomy` DISABLE KEYS */;
INSERT INTO `map_content_rectaxonomy` VALUES (1,1,1,'2024-04-27 10:16:21');
/*!40000 ALTER TABLE `map_content_rectaxonomy` ENABLE KEYS */;

--
-- Table structure for table `map_taxonomy_type`
--

DROP TABLE IF EXISTS `map_taxonomy_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_taxonomy_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taxonomy_id` int NOT NULL,
  `type_id` int NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `map_taxonomy_type_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `ls_taxonomy` (`id`),
  CONSTRAINT `map_taxonomy_type_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `ls_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_taxonomy_type`
--

/*!40000 ALTER TABLE `map_taxonomy_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `map_taxonomy_type` ENABLE KEYS */;

--
-- Table structure for table `rec_content`
--

DROP TABLE IF EXISTS `rec_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `body` text COLLATE utf8mb4_unicode_ci,
  `type_id` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `rec_content_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `ls_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rec_content`
--

/*!40000 ALTER TABLE `rec_content` DISABLE KEYS */;
INSERT INTO `rec_content` VALUES (1,'Title','descritoion','# hello',3,'2024-04-27 10:03:14');
/*!40000 ALTER TABLE `rec_content` ENABLE KEYS */;

--
-- Table structure for table `rec_field`
--

DROP TABLE IF EXISTS `rec_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `content_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `rec_field_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rec_field`
--

/*!40000 ALTER TABLE `rec_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `rec_field` ENABLE KEYS */;

--
-- Table structure for table `rec_taxonomy`
--

DROP TABLE IF EXISTS `rec_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_taxonomy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taxonomy_id` int NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  CONSTRAINT `rec_taxonomy_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `ls_taxonomy` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rec_taxonomy`
--

/*!40000 ALTER TABLE `rec_taxonomy` DISABLE KEYS */;
INSERT INTO `rec_taxonomy` VALUES (1,1,'CMS','2024-04-27 10:16:08');
/*!40000 ALTER TABLE `rec_taxonomy` ENABLE KEYS */;

--
-- Dumping routines for database 'heinsoe'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-27 22:23:27
