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
-- Table structure for table `_field`
--

DROP TABLE IF EXISTS `_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_field` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(200) NOT NULL,
  `type_id` int DEFAULT NULL,
  `data_type` varchar(20) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `_field_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_taxonomy`
--

DROP TABLE IF EXISTS `_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_taxonomy` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(200) NOT NULL,
  `description` text,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_type`
--

DROP TABLE IF EXISTS `_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(200) NOT NULL,
  `description` text,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_content_rectaxonomy`
--

DROP TABLE IF EXISTS `map_content_rectaxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_content_rectaxonomy` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `content_id` int NOT NULL,
  `taxonomy_id` int NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `content_id` (`content_id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  CONSTRAINT `map_content_rectaxonomy_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content` (`id`) ON DELETE CASCADE,
  CONSTRAINT `map_content_rectaxonomy_ibfk_2` FOREIGN KEY (`taxonomy_id`) REFERENCES `rec_taxonomy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_taxonomy_type`
--

DROP TABLE IF EXISTS `map_taxonomy_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_taxonomy_type` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `taxonomy_id` int NOT NULL,
  `type_id` int NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `map_taxonomy_type_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `_taxonomy` (`id`),
  CONSTRAINT `map_taxonomy_type_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rec_content`
--

DROP TABLE IF EXISTS `rec_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_content` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `title` varchar(200) NOT NULL,
  `description` text,
  `body` text,
  `type_id` int DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `rec_content_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `_type` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rec_field`
--

DROP TABLE IF EXISTS `rec_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_field` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `value` text,
  `content_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `content_id` (`content_id`),
  CONSTRAINT `rec_field_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `rec_content` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rec_taxonomy`
--

DROP TABLE IF EXISTS `rec_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_taxonomy` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `taxonomy_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `taxonomy_id` (`taxonomy_id`),
  CONSTRAINT `rec_taxonomy_ibfk_1` FOREIGN KEY (`taxonomy_id`) REFERENCES `_taxonomy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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

-- Dump completed on 2024-04-22 23:25:47
