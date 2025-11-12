USE SportsManagementSystem;

-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: SportsManagementSystem
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `equipment_checkouts`
--

DROP TABLE IF EXISTS `equipment_checkouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_checkouts` (
  `Checkout_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  `Item_ID` int NOT NULL,
  `Checkout_time` datetime NOT NULL,
  `Checkin_time` datetime DEFAULT NULL,
  PRIMARY KEY (`Checkout_ID`),
  KEY `Staff_ID` (`Staff_ID`),
  KEY `Item_ID` (`Item_ID`),
  CONSTRAINT `equipment_checkouts_ibfk_1` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`),
  CONSTRAINT `equipment_checkouts_ibfk_2` FOREIGN KEY (`Item_ID`) REFERENCES `equipment_items` (`Item_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_checkouts`
--

LOCK TABLES `equipment_checkouts` WRITE;
/*!40000 ALTER TABLE `equipment_checkouts` DISABLE KEYS */;
INSERT INTO `equipment_checkouts` VALUES (801,101,7002,'2025-11-04 09:00:00',NULL),(802,103,7010,'2025-11-03 15:30:00',NULL),(803,105,7005,'2025-11-04 08:30:00',NULL),(804,114,7013,'2025-11-04 10:00:00',NULL),(805,120,7019,'2025-11-04 11:00:00',NULL),(806,126,7023,'2025-11-03 18:00:00',NULL),(807,132,7028,'2025-11-04 07:30:00',NULL),(808,138,7033,'2025-11-04 08:45:00',NULL),(809,105,7041,'2025-11-04 12:00:00',NULL),(810,104,7047,'2025-11-04 09:30:00',NULL),(811,140,7003,'2025-10-28 10:00:00','2025-10-28 17:00:00'),(812,143,7004,'2025-10-29 14:00:00','2025-10-29 20:00:00'),(813,146,7006,'2025-10-30 08:00:00','2025-10-30 11:00:00'),(814,149,7008,'2025-10-31 09:00:00','2025-10-31 16:00:00'),(815,107,7011,'2025-10-31 14:00:00','2025-10-31 18:00:00'),(816,110,7012,'2025-11-01 10:00:00','2025-11-01 15:00:00'),(817,113,7015,'2025-11-02 07:00:00','2025-11-02 12:00:00'),(818,116,7016,'2025-11-03 08:00:00','2025-11-03 14:00:00'),(819,119,7017,'2025-11-03 10:00:00','2025-11-03 17:00:00'),(820,122,7020,'2025-10-27 15:00:00','2025-10-27 19:00:00'),(821,125,7021,'2025-10-28 16:00:00','2025-10-28 20:00:00'),(822,128,7022,'2025-10-29 10:00:00','2025-10-29 13:00:00'),(823,131,7024,'2025-10-30 11:00:00','2025-10-30 15:00:00'),(824,134,7026,'2025-10-31 08:00:00','2025-10-31 12:00:00'),(825,137,7027,'2025-11-01 12:00:00','2025-11-01 16:00:00'),(826,140,7029,'2025-11-02 07:30:00','2025-11-02 11:30:00'),(827,143,7030,'2025-11-03 09:00:00','2025-11-03 15:00:00'),(828,146,7031,'2025-11-04 10:30:00','2025-11-04 16:30:00'),(829,149,7032,'2025-10-27 11:00:00','2025-10-27 14:00:00'),(830,141,7048,'2025-10-29 11:00:00','2025-10-30 14:00:00');
/*!40000 ALTER TABLE `equipment_checkouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_items`
--

DROP TABLE IF EXISTS `equipment_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_items` (
  `Item_ID` int NOT NULL,
  `Type_ID` int NOT NULL,
  `Item_Code` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `Conditions` varchar(20) NOT NULL,
  `Purchase_Date` date DEFAULT NULL,
  PRIMARY KEY (`Item_ID`),
  UNIQUE KEY `Item_Code` (`Item_Code`),
  KEY `Type_ID` (`Type_ID`),
  CONSTRAINT `equipment_items_ibfk_1` FOREIGN KEY (`Type_ID`) REFERENCES `equipment_types` (`Type_ID`),
  CONSTRAINT `equipment_items_chk_1` CHECK ((`Status` in (_utf8mb4'Available',_utf8mb4'Issued',_utf8mb4'Maintenance'))),
  CONSTRAINT `equipment_items_chk_2` CHECK ((`Conditions` in (_utf8mb4'New',_utf8mb4'Fair',_utf8mb4'Repair')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_items`
--

LOCK TABLES `equipment_items` WRITE;
/*!40000 ALTER TABLE `equipment_items` DISABLE KEYS */;
INSERT INTO `equipment_items` VALUES (7001,1,'CRB-001-A','Available','New','2025-08-01'),(7002,2,'FB-002-B','Issued','Fair','2024-05-10'),(7003,3,'SW-003-C','Available','New','2025-09-15'),(7004,4,'BR-004-D','Available','New','2025-07-20'),(7005,5,'FAK-005-E','Issued','New','2025-10-01'),(7006,6,'MT-006-F','Available','Fair','2024-11-05'),(7007,7,'WS-007-G','Maintenance','Repair','2023-03-01'),(7008,8,'BB-008-H','Available','New','2025-09-01'),(7009,9,'BN-009-I','Available','New','2025-09-01'),(7010,10,'VB-010-J','Issued','Fair','2024-06-15'),(7011,11,'VN-011-K','Available','New','2025-08-10'),(7012,12,'TR-012-L','Available','New','2025-07-25'),(7013,13,'TTR-013-M','Issued','New','2025-09-05'),(7014,14,'HS-014-N','Maintenance','Repair','2023-12-01'),(7015,15,'JVL-015-O','Available','New','2025-08-01'),(7016,16,'SP-016-P','Available','New','2025-08-01'),(7017,17,'DSC-017-Q','Available','New','2025-08-01'),(7018,18,'HJM-018-R','Available','Fair','2024-03-01'),(7019,19,'HUR-019-S','Issued','Fair','2024-10-01'),(7020,20,'SV-020-T','Available','New','2025-08-15'),(7021,21,'BNET-021-U','Available','New','2025-07-01'),(7022,22,'TTT-022-V','Available','New','2025-09-20'),(7023,23,'CS-023-W','Issued','New','2025-10-15'),(7024,24,'CB-024-X','Available','Fair','2024-01-01'),(7025,25,'SB-025-Y','Maintenance','Repair','2024-07-01'),(7026,26,'BR-026-Z','Available','New','2025-09-01'),(7027,27,'SC-027-A','Available','New','2025-08-01'),(7028,28,'WCD-028-B','Issued','New','2025-10-25'),(7029,29,'IP-029-C','Available','New','2025-09-01'),(7030,30,'GEN-030-D','Available','Fair','2024-06-01'),(7031,31,'RB-031-E','Available','New','2025-08-01'),(7032,32,'BBAT-032-F','Available','New','2025-07-01'),(7033,33,'SG-033-G','Issued','New','2025-10-10'),(7034,34,'SR-034-H','Available','New','2025-07-01'),(7035,35,'SBALL-035-I','Available','New','2025-09-01'),(7036,36,'WPB-036-J','Available','New','2025-08-01'),(7037,37,'SLR-037-K','Maintenance','Repair','2024-01-01'),(7038,38,'FF-038-L','Available','New','2025-09-01'),(7039,39,'GFM-039-M','Available','Fair','2024-05-01'),(7040,40,'WM-040-N','Available','New','2025-08-01'),(7041,41,'JG-041-O','Issued','New','2025-10-01'),(7042,42,'KPS-042-P','Available','New','2025-08-01'),(7043,43,'KHP-043-Q','Available','New','2025-08-01'),(7044,44,'AT-044-R','Available','New','2025-08-01'),(7045,45,'RS-045-S','Available','New','2025-09-01'),(7046,46,'CP-046-T','Available','New','2025-09-01'),(7047,47,'LTG-047-U','Issued','New','2025-10-01'),(7048,48,'FAS-048-V','Available','New','2025-09-01'),(7049,49,'MOT-049-W','Available','New','2025-08-01'),(7050,50,'EWS-050-X','Available','New','2025-09-01');
/*!40000 ALTER TABLE `equipment_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment_types`
--

DROP TABLE IF EXISTS `equipment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment_types` (
  `Type_ID` int NOT NULL,
  `Type_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Type_ID`),
  UNIQUE KEY `Type_Name` (`Type_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment_types`
--

LOCK TABLES `equipment_types` WRITE;
/*!40000 ALTER TABLE `equipment_types` DISABLE KEYS */;
INSERT INTO `equipment_types` VALUES (44,'Archery Target'),(21,'Badminton Net (Pro)'),(4,'Badminton Racquet'),(32,'Baseball Bat'),(8,'Basketball (Size 7)'),(9,'Basketball Net'),(26,'Boundary Rope (500m Roll)'),(46,'Canoeing Paddle'),(24,'Carrom Board'),(23,'Chess Set (Standard)'),(1,'Cricket Bat (Leather Ball)'),(17,'Discus (Men\'s Standard)'),(50,'Electronic Weighing Scale'),(38,'Fencing Foil'),(5,'First Aid Kit (Standard)'),(48,'First Aid Stretcher'),(2,'Football (Size 5)'),(30,'Generator (5kVA Backup)'),(39,'Gymnastics Floor Mat'),(18,'High Jump Mat'),(14,'Hockey Stick (Field)'),(19,'Hurdles (Adjustable Set)'),(29,'Ice Packs (Reusable Gel)'),(15,'Javelin (Men\'s Standard)'),(41,'Judo Gi (Uniform)'),(42,'Kabaddi Pole Set'),(43,'Kho-Kho Pole Set'),(47,'Laser Timing Gate'),(6,'Measuring Tape (Steel 50m)'),(49,'Medical Oxygen Tank'),(45,'Rowing Shell (Single)'),(31,'Rugby Ball'),(27,'Safety Cone (Large)'),(20,'Safety Vests (Bibs)'),(25,'Scoreboard (Digital)'),(16,'Shot Put (Men\'s Standard)'),(33,'Softball Glove'),(35,'Squash Ball (Dot 1)'),(34,'Squash Racquet'),(3,'Stopwatch (Digital)'),(37,'Swimming Lane Ropes'),(13,'Table Tennis Racket'),(22,'Table Tennis Table (IT)'),(12,'Tennis Racket'),(10,'Volleyball (Official)'),(11,'Volleyball Net'),(28,'Water Cooler Dispenser'),(36,'Water Polo Ball'),(7,'Whistle Set (Referees)'),(40,'Wrestling Mat');
/*!40000 ALTER TABLE `equipment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_coordinators`
--

DROP TABLE IF EXISTS `event_coordinators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_coordinators` (
  `Event_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  PRIMARY KEY (`Event_ID`,`Staff_ID`),
  KEY `Staff_ID` (`Staff_ID`),
  CONSTRAINT `event_coordinators_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `event_coordinators_ibfk_2` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_coordinators`
--

LOCK TABLES `event_coordinators` WRITE;
/*!40000 ALTER TABLE `event_coordinators` DISABLE KEYS */;
INSERT INTO `event_coordinators` VALUES (101,101),(102,101),(135,101),(117,104),(118,104),(136,104),(103,107),(104,107),(107,110),(113,110),(124,110),(108,111),(110,113),(111,113),(140,113),(116,116),(133,122),(134,122),(139,122),(105,125),(106,125),(123,125),(125,128),(126,128),(119,131),(120,131),(137,131),(114,134),(115,134),(127,134),(112,137),(131,137),(121,140),(122,140),(138,140),(128,141),(109,143),(132,143),(129,146),(130,146);
/*!40000 ALTER TABLE `event_coordinators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_points`
--

DROP TABLE IF EXISTS `event_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_points` (
  `Event_Point_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `Ranks` varchar(10) NOT NULL,
  `Points` int NOT NULL,
  PRIMARY KEY (`Event_Point_ID`),
  KEY `Event_ID` (`Event_ID`),
  CONSTRAINT `event_points_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_points`
--

LOCK TABLES `event_points` WRITE;
/*!40000 ALTER TABLE `event_points` DISABLE KEYS */;
INSERT INTO `event_points` VALUES (501,101,'1st',100),(502,101,'2nd',50),(503,101,'3rd',25),(504,117,'1st',50),(505,117,'2nd',30),(506,117,'3rd',15),(507,123,'1st',30),(508,123,'2nd',15),(509,123,'3rd',8),(510,112,'1st',60),(511,112,'2nd',35),(512,112,'3rd',15),(513,125,'1st',30),(514,125,'2nd',15),(515,125,'3rd',8);
/*!40000 ALTER TABLE `event_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_registrations`
--

DROP TABLE IF EXISTS `event_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_registrations` (
  `Participant_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  PRIMARY KEY (`Participant_ID`,`Event_ID`),
  KEY `Event_ID` (`Event_ID`),
  CONSTRAINT `event_registrations_ibfk_1` FOREIGN KEY (`Participant_ID`) REFERENCES `participants` (`Participant_ID`),
  CONSTRAINT `event_registrations_ibfk_2` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_registrations`
--

LOCK TABLES `event_registrations` WRITE;
/*!40000 ALTER TABLE `event_registrations` DISABLE KEYS */;
INSERT INTO `event_registrations` VALUES (5121,117),(5123,117),(5125,117),(5127,117),(5129,117),(5131,117),(5133,117),(5135,117),(5137,117),(5139,117),(5141,117),(5143,117),(5145,117),(5147,117),(5149,117),(5151,117),(5153,117),(5155,117),(5157,117),(5159,117),(5161,117),(5163,117),(5165,117),(5122,118),(5124,118),(5126,118),(5128,118),(5130,118),(5132,118),(5134,118),(5136,118),(5138,118),(5140,118),(5142,118),(5144,118),(5146,118),(5148,118),(5150,118),(5152,118),(5154,118),(5156,118),(5158,118),(5160,118),(5162,118),(5164,118),(5166,118),(5001,125),(5003,125),(5005,125),(5007,125),(5009,125),(5011,125),(5013,125),(5015,125),(5017,125),(5019,125),(5021,125),(5023,125),(5025,125),(5027,125),(5029,125),(5031,125),(5033,125),(5035,125),(5037,125),(5039,125),(5041,125),(5043,125),(5045,125),(5002,126),(5004,126),(5006,126),(5008,126),(5010,126),(5012,126),(5014,126),(5016,126),(5018,126),(5020,126),(5022,126),(5024,126),(5026,126),(5028,126),(5030,126),(5032,126),(5034,126),(5036,126),(5038,126),(5040,126),(5042,126),(5044,126),(5046,126),(5061,127),(5063,127),(5065,127),(5067,127),(5069,127),(5071,127),(5073,127),(5075,127),(5077,127),(5079,127),(5081,127),(5083,127),(5085,127),(5087,127),(5089,127),(5091,127),(5093,127),(5095,127),(5097,127),(5099,127),(5101,127),(5103,127),(5105,127),(5062,128),(5064,128),(5066,128),(5068,128),(5070,128),(5072,128),(5074,128),(5076,128),(5078,128),(5080,128),(5082,128),(5084,128),(5086,128),(5088,128),(5090,128),(5092,128),(5094,128),(5096,128),(5098,128),(5100,128),(5102,128),(5104,128),(5106,128),(5181,129),(5183,129),(5185,129),(5187,129),(5189,129),(5191,129),(5193,129),(5195,129),(5197,129),(5199,129),(5201,129),(5203,129),(5205,129),(5207,129),(5209,129),(5211,129),(5213,129),(5215,129),(5217,129),(5219,129),(5221,129),(5223,129),(5225,129),(5182,130),(5184,130),(5186,130),(5188,130),(5190,130),(5192,130),(5194,130),(5196,130),(5198,130),(5200,130),(5202,130),(5204,130),(5206,130),(5208,130),(5210,130),(5212,130),(5214,130),(5216,130),(5218,130),(5220,130),(5222,130),(5224,130),(5226,130);
/*!40000 ALTER TABLE `event_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `Event_ID` int NOT NULL,
  `Sport_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Registration_Fee` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Event_ID`),
  KEY `Sport_ID` (`Sport_ID`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`Sport_ID`) REFERENCES `sports` (`Sport_ID`),
  CONSTRAINT `events_chk_1` CHECK ((`Gender` in (_utf8mb4'Male',_utf8mb4'Female',_utf8mb4'Mixed')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (101,1,'Inter-IIT Cricket Trophy','Male','2025-11-05','2025-11-10',500.00),(102,2,'Inter-IIT Football Championship','Male','2025-11-05','2025-11-12',750.00),(103,3,'Men\'s Basketball Tournament','Male','2025-11-06','2025-11-11',300.00),(104,3,'Women\'s Basketball Tournament','Female','2025-11-06','2025-11-11',300.00),(105,4,'Men\'s Volleyball Championship','Male','2025-11-05','2025-11-09',250.00),(106,4,'Women\'s Volleyball Championship','Female','2025-11-05','2025-11-09',250.00),(107,5,'Men\'s Tennis Team Championship','Male','2025-11-07','2025-11-10',400.00),(108,6,'Men\'s Squash Team Event','Male','2025-11-07','2025-11-09',350.00),(109,7,'Men\'s Table Tennis Team','Male','2025-11-05','2025-11-08',200.00),(110,8,'4x100m Men\'s Relay','Male','2025-11-09','2025-11-09',150.00),(111,8,'4x100m Women\'s Relay','Female','2025-11-09','2025-11-09',150.00),(112,9,'Chess Team Tournament','Mixed','2025-11-06','2025-11-07',100.00),(113,10,'Badminton Team Championship','Mixed','2025-11-07','2025-11-10',300.00),(114,11,'Badminton Men\'s Doubles','Male','2025-11-08','2025-11-09',150.00),(115,12,'Badminton Women\'s Doubles','Female','2025-11-08','2025-11-09',150.00),(116,13,'Badminton Mixed Doubles','Mixed','2025-11-08','2025-11-09',150.00),(117,14,'100m Sprint (Men)','Male','2025-11-07','2025-11-07',50.00),(118,14,'100m Sprint (Women)','Female','2025-11-07','2025-11-07',50.00),(119,15,'300m Run (Men)','Male','2025-11-07','2025-11-07',50.00),(120,15,'300m Run (Women)','Female','2025-11-07','2025-11-07',50.00),(121,16,'600m Run (Men)','Male','2025-11-08','2025-11-08',50.00),(122,16,'600m Run (Women)','Female','2025-11-08','2025-11-08',50.00),(123,17,'Badminton Men\'s Singles','Male','2025-11-06','2025-11-08',100.00),(124,18,'Badminton Women\'s Singles','Female','2025-11-06','2025-11-08',100.00),(125,19,'Squash Singles (Men)','Male','2025-11-05','2025-11-08',150.00),(126,19,'Squash Singles (Women)','Female','2025-11-05','2025-11-08',150.00),(127,20,'Tennis Singles (Men)','Male','2025-11-05','2025-11-07',150.00),(128,20,'Tennis Singles (Women)','Female','2025-11-05','2025-11-07',150.00),(129,21,'TT Singles (Men)','Male','2025-11-06','2025-11-08',100.00),(130,21,'TT Singles (Women)','Female','2025-11-06','2025-11-08',100.00),(131,22,'Weightlifting (Men - LWT)','Male','2025-11-09','2025-11-09',50.00),(132,22,'Weightlifting (Men - HWT)','Male','2025-11-09','2025-11-09',50.00),(133,23,'Swimming 50m Freestyle (Men)','Male','2025-11-08','2025-11-08',100.00),(134,23,'Swimming 50m Freestyle (Women)','Female','2025-11-08','2025-11-08',100.00),(135,23,'Swimming 100m Breaststroke (Men)','Male','2025-11-08','2025-11-08',100.00),(136,23,'Swimming 100m Breaststroke (Women)','Female','2025-11-08','2025-11-08',100.00),(137,23,'Swimming 200m IM (Men)','Male','2025-11-09','2025-11-09',100.00),(138,23,'Swimming 200m IM (Women)','Female','2025-11-09','2025-11-09',100.00),(139,24,'Javelin Throw (Men)','Male','2025-11-08','2025-11-08',100.00),(140,24,'Javelin Throw (Women)','Female','2025-11-08','2025-11-08',100.00);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_transactions`
--

DROP TABLE IF EXISTS `financial_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_transactions` (
  `Transaction_ID` int NOT NULL,
  `Participant_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `Transaction_Date` date NOT NULL,
  `Payment_Status` varchar(20) NOT NULL,
  `Type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Transaction_ID`),
  KEY `Participant_ID` (`Participant_ID`),
  KEY `Event_ID` (`Event_ID`),
  CONSTRAINT `financial_transactions_ibfk_1` FOREIGN KEY (`Participant_ID`) REFERENCES `participants` (`Participant_ID`),
  CONSTRAINT `financial_transactions_ibfk_2` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `financial_transactions_chk_1` CHECK ((`Amount` > 0)),
  CONSTRAINT `financial_transactions_chk_2` CHECK ((`Payment_Status` in (_utf8mb4'Paid',_utf8mb4'Pending',_utf8mb4'Refunded'))),
  CONSTRAINT `financial_transactions_chk_3` CHECK ((`Type` in (_utf8mb4'Registration',_utf8mb4'Fine',_utf8mb4'Sponsorship')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_transactions`
--

LOCK TABLES `financial_transactions` WRITE;
/*!40000 ALTER TABLE `financial_transactions` DISABLE KEYS */;
INSERT INTO `financial_transactions` VALUES (9001,5001,125,150.00,'2025-10-15','Paid','Registration'),(9002,5002,126,150.00,'2025-10-16','Paid','Registration'),(9003,5003,125,150.00,'2025-10-15','Paid','Registration'),(9004,5004,126,150.00,'2025-10-16','Paid','Registration'),(9005,5005,125,150.00,'2025-10-17','Paid','Registration'),(9006,5006,126,150.00,'2025-10-17','Paid','Registration'),(9007,5007,125,150.00,'2025-10-18','Paid','Registration'),(9008,5008,126,150.00,'2025-10-18','Paid','Registration'),(9009,5009,125,150.00,'2025-10-19','Paid','Registration'),(9010,5010,126,150.00,'2025-10-19','Paid','Registration'),(9011,5011,125,150.00,'2025-10-20','Paid','Registration'),(9012,5012,126,150.00,'2025-10-20','Paid','Registration'),(9013,5013,125,150.00,'2025-10-21','Paid','Registration'),(9014,5014,126,150.00,'2025-10-21','Paid','Registration'),(9015,5015,125,150.00,'2025-10-22','Paid','Registration'),(9016,5016,126,150.00,'2025-10-22','Paid','Registration'),(9017,5017,125,150.00,'2025-10-23','Paid','Registration'),(9018,5018,126,150.00,'2025-10-23','Paid','Registration'),(9019,5019,125,150.00,'2025-10-24','Paid','Registration'),(9020,5020,126,150.00,'2025-10-24','Paid','Registration'),(9021,5021,125,150.00,'2025-10-15','Paid','Registration'),(9022,5022,126,150.00,'2025-10-16','Paid','Registration'),(9023,5023,125,150.00,'2025-10-15','Paid','Registration'),(9024,5024,126,150.00,'2025-10-16','Paid','Registration'),(9025,5025,125,150.00,'2025-10-17','Paid','Registration'),(9026,5026,126,150.00,'2025-10-17','Paid','Registration'),(9027,5027,125,150.00,'2025-10-18','Paid','Registration'),(9028,5028,126,150.00,'2025-10-18','Paid','Registration'),(9029,5029,125,150.00,'2025-10-19','Paid','Registration'),(9030,5030,126,150.00,'2025-10-19','Paid','Registration'),(9031,5031,125,150.00,'2025-10-20','Paid','Registration'),(9032,5032,126,150.00,'2025-10-20','Paid','Registration'),(9033,5033,125,150.00,'2025-10-21','Paid','Registration'),(9034,5034,126,150.00,'2025-10-21','Paid','Registration'),(9035,5035,125,150.00,'2025-10-22','Paid','Registration'),(9036,5036,126,150.00,'2025-10-22','Paid','Registration'),(9037,5037,125,150.00,'2025-10-23','Paid','Registration'),(9038,5038,126,150.00,'2025-10-23','Paid','Registration'),(9039,5039,125,150.00,'2025-10-24','Paid','Registration'),(9040,5040,126,150.00,'2025-10-24','Paid','Registration'),(9041,5041,125,150.00,'2025-10-15','Paid','Registration'),(9042,5042,126,150.00,'2025-10-16','Paid','Registration'),(9043,5043,125,150.00,'2025-10-15','Paid','Registration'),(9044,5044,126,150.00,'2025-10-16','Paid','Registration'),(9045,5045,125,150.00,'2025-10-17','Paid','Registration'),(9046,5046,126,150.00,'2025-10-17','Paid','Registration'),(9047,5061,127,150.00,'2025-10-25','Paid','Registration'),(9048,5062,128,150.00,'2025-10-25','Paid','Registration'),(9049,5071,127,150.00,'2025-10-26','Paid','Registration'),(9050,5072,128,150.00,'2025-10-26','Paid','Registration'),(9051,5101,127,150.00,'2025-10-27','Paid','Registration'),(9052,5102,128,150.00,'2025-10-27','Paid','Registration'),(9053,5141,117,50.00,'2025-10-28','Paid','Registration'),(9054,5142,118,50.00,'2025-10-28','Paid','Registration'),(9055,5181,129,100.00,'2025-10-29','Paid','Registration'),(9056,5182,130,100.00,'2025-10-29','Paid','Registration'),(9057,5201,129,100.00,'2025-10-30','Paid','Registration'),(9058,5202,130,100.00,'2025-10-30','Paid','Registration'),(9059,5241,125,150.00,'2025-10-31','Pending','Registration'),(9060,5242,126,150.00,'2025-10-31','Pending','Registration'),(9061,5003,101,500.00,'2025-11-05','Paid','Fine'),(9062,5045,102,200.00,'2025-11-05','Paid','Fine'),(9063,5061,103,1000.00,'2025-10-20','Paid','Sponsorship'),(9064,5141,104,500.00,'2025-10-25','Refunded','Registration'),(9065,5281,125,250.00,'2025-11-05','Pending','Fine'),(9066,5341,125,150.00,'2025-10-25','Paid','Registration'),(9067,5421,127,150.00,'2025-10-26','Paid','Registration'),(9068,5422,128,150.00,'2025-10-26','Paid','Registration'),(9069,5041,107,100.00,'2025-11-05','Pending','Fine'),(9070,5043,107,100.00,'2025-11-05','Paid','Fine');
/*!40000 ALTER TABLE `financial_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hostels`
--

DROP TABLE IF EXISTS `hostels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hostels` (
  `Hostel_ID` int NOT NULL,
  `Institute_ID` int NOT NULL,
  `Hostel_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Hostel_ID`),
  UNIQUE KEY `Hostel_Name` (`Hostel_Name`),
  KEY `Institute_ID` (`Institute_ID`),
  CONSTRAINT `hostels_ibfk_1` FOREIGN KEY (`Institute_ID`) REFERENCES `institutes` (`Institute_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hostels`
--

LOCK TABLES `hostels` WRITE;
/*!40000 ALTER TABLE `hostels` DISABLE KEYS */;
INSERT INTO `hostels` VALUES (301,3,'IITM - Ganga'),(302,3,'IITM - Krishna'),(303,3,'IITM - Sabarmati (Girls)'),(304,3,'IITM - Sindhu'),(305,3,'IITM - Alakananda'),(801,8,'IITH - RAMAN'),(802,8,'IITH - CHANDRA'),(803,8,'IITH - BHABA'),(804,8,'IITH - DEVI (Girls)'),(805,8,'IITH - NEEL'),(1801,18,'IITTP - Hostel 1'),(1802,18,'IITTP - Hostel 2'),(1803,18,'IITTP - Hostel 3'),(1804,18,'IITTP - Girls Hostel'),(1805,18,'IITTP - Hostel 5');
/*!40000 ALTER TABLE `hostels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incident_reports`
--

DROP TABLE IF EXISTS `incident_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incident_reports` (
  `Report_ID` int NOT NULL,
  `Participant_ID` int DEFAULT NULL,
  `Staff_ID` int NOT NULL,
  `Time` datetime NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Action_taken` varchar(100) DEFAULT NULL,
  `Severity` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Report_ID`),
  KEY `Participant_ID` (`Participant_ID`),
  KEY `Staff_ID` (`Staff_ID`),
  CONSTRAINT `incident_reports_ibfk_1` FOREIGN KEY (`Participant_ID`) REFERENCES `participants` (`Participant_ID`),
  CONSTRAINT `incident_reports_ibfk_2` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`),
  CONSTRAINT `incident_reports_chk_1` CHECK ((`Severity` in (_utf8mb4'Low',_utf8mb4'Medium',_utf8mb4'High')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident_reports`
--

LOCK TABLES `incident_reports` WRITE;
/*!40000 ALTER TABLE `incident_reports` DISABLE KEYS */;
INSERT INTO `incident_reports` VALUES (1,5003,102,'2025-11-05 11:30:00','Minor altercation after Squash match (Match 2010).','Verbal Warning','Medium'),(2,5045,107,'2025-11-05 10:00:00','Minor foul play accusation during Football (Match 2002).','Reviewed Match footage','Low'),(3,5141,104,'2025-11-06 07:15:00','Report of lost wallet in Hostel Mess.','Security notified','Low'),(4,5001,111,'2025-11-06 18:30:00','Alleged theft of personal equipment in common area.','Police Report Filed','High'),(5,5007,133,'2025-11-06 09:00:00','Athlete collapsed during 100m sprint heats.','Medical staff dispatched','High'),(6,5035,147,'2025-11-06 19:00:00','Bus delay caused team to miss practice session.','Logistics team notified','Medium'),(7,5101,137,'2025-11-05 20:00:00','Loud noise complaint in IITTP Hostel 1.','Verbal Warning','Low'),(8,5143,116,'2025-11-06 15:30:00','Venue time slot conflict reported.','Re-assigned court','Medium'),(9,5341,119,'2025-11-06 12:00:00','Damage to property in Squash court (racket thrown).','Charge issued','High'),(10,5081,129,'2025-11-05 17:00:00','Lost room key reported.','Key replacement fee charged','Low');
/*!40000 ALTER TABLE `incident_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_standings`
--

DROP TABLE IF EXISTS `institute_standings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institute_standings` (
  `Standing_ID` int NOT NULL,
  `Institute_ID` int NOT NULL,
  `Total_points` int NOT NULL,
  PRIMARY KEY (`Standing_ID`),
  KEY `Institute_ID` (`Institute_ID`),
  CONSTRAINT `institute_standings_ibfk_1` FOREIGN KEY (`Institute_ID`) REFERENCES `institutes` (`Institute_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_standings`
--

LOCK TABLES `institute_standings` WRITE;
/*!40000 ALTER TABLE `institute_standings` DISABLE KEYS */;
INSERT INTO `institute_standings` VALUES (601,1,10),(602,2,10),(603,3,10),(604,4,0),(605,5,0),(606,6,0),(607,7,0),(608,8,0),(609,9,0),(610,10,0),(611,11,0),(612,12,0),(613,13,0),(614,14,0),(615,15,0),(616,16,0),(617,17,0),(618,18,0),(619,19,0),(620,20,0),(621,21,0),(622,22,0),(623,23,0);
/*!40000 ALTER TABLE `institute_standings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutes`
--

DROP TABLE IF EXISTS `institutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutes` (
  `Institute_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Short_Name` varchar(10) NOT NULL,
  PRIMARY KEY (`Institute_ID`),
  UNIQUE KEY `Short_Name` (`Short_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutes`
--

LOCK TABLES `institutes` WRITE;
/*!40000 ALTER TABLE `institutes` DISABLE KEYS */;
INSERT INTO `institutes` VALUES (1,'IIT Bombay','IITB'),(2,'IIT Delhi','IITD'),(3,'IIT Madras','IITM'),(4,'IIT Kharagpur','IITKgp'),(5,'IIT Kanpur','IITK'),(6,'IIT Roorkee','IITR'),(7,'IIT Guwahati','IITG'),(8,'IIT Hyderabad','IITH'),(9,'IIT Patna','IITP'),(10,'IIT Bhubaneswar','IITBBS'),(11,'IIT Gandhinagar','IITGn'),(12,'IIT Indore','IITI'),(13,'IIT Ropar','IITRpr'),(14,'IIT Mandi','IITMandi'),(15,'IIT Jodhpur','IITJ'),(16,'IIT BHU','IITBHU'),(17,'IIT Palakkad','IITPKD'),(18,'IIT Tirupati','IITTP'),(19,'IIT Dhanbad','IITISM'),(20,'IIT Bhilai','IITBl'),(21,'IIT Goa','IITGoa'),(22,'IIT Jammu','IITJmu'),(23,'IIT Dharwad','IITDh');
/*!40000 ALTER TABLE `institutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_competitors`
--

DROP TABLE IF EXISTS `match_competitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_competitors` (
  `Match_Competitor_ID` int NOT NULL,
  `Match_ID` int NOT NULL,
  `Team_ID` int DEFAULT NULL,
  `Participant_ID` int DEFAULT NULL,
  `Score` varchar(50) DEFAULT NULL,
  `Result` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Match_Competitor_ID`),
  KEY `Match_ID` (`Match_ID`),
  KEY `Team_ID` (`Team_ID`),
  KEY `Participant_ID` (`Participant_ID`),
  CONSTRAINT `match_competitors_ibfk_1` FOREIGN KEY (`Match_ID`) REFERENCES `matches` (`Match_ID`),
  CONSTRAINT `match_competitors_ibfk_2` FOREIGN KEY (`Team_ID`) REFERENCES `teams` (`Team_ID`),
  CONSTRAINT `match_competitors_ibfk_3` FOREIGN KEY (`Participant_ID`) REFERENCES `participants` (`Participant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_competitors`
--

LOCK TABLES `match_competitors` WRITE;
/*!40000 ALTER TABLE `match_competitors` DISABLE KEYS */;
INSERT INTO `match_competitors` VALUES (3001,2001,1001,NULL,'250/8','Loss'),(3002,2001,1002,NULL,'252/3','Win'),(3003,2002,1026,NULL,'2-1','Win'),(3004,2002,1027,NULL,'1-2','Loss'),(3005,2003,1051,NULL,NULL,NULL),(3006,2003,1052,NULL,NULL,NULL),(3007,2004,1076,NULL,NULL,NULL),(3008,2004,1077,NULL,NULL,NULL),(3009,2005,1099,NULL,NULL,NULL),(3010,2005,1100,NULL,NULL,NULL),(3011,2006,1001,NULL,NULL,NULL),(3012,2006,1002,NULL,NULL,NULL),(3013,2007,1093,NULL,NULL,NULL),(3014,2007,1094,NULL,NULL,NULL),(3015,2008,1095,NULL,NULL,NULL),(3016,2008,1096,NULL,NULL,NULL),(3017,2009,1005,NULL,NULL,NULL),(3018,2009,1007,NULL,NULL,NULL),(3019,2010,NULL,5003,'3-0','Win'),(3020,2010,NULL,5063,'0-3','Loss'),(3021,2011,NULL,5004,NULL,NULL),(3022,2011,NULL,5064,NULL,NULL),(3023,2012,NULL,5005,NULL,NULL),(3024,2012,NULL,5065,NULL,NULL),(3025,2013,NULL,5006,NULL,NULL),(3026,2013,NULL,5066,NULL,NULL),(3027,2014,NULL,5007,NULL,NULL),(3028,2014,NULL,5067,NULL,NULL),(3029,2015,NULL,5009,NULL,NULL),(3030,2015,NULL,5069,NULL,NULL),(3031,2016,NULL,5041,NULL,NULL),(3032,2016,NULL,5181,NULL,NULL),(3033,2017,NULL,5042,NULL,NULL),(3034,2017,NULL,5182,NULL,NULL),(3035,2018,1024,NULL,NULL,NULL),(3036,2018,1026,NULL,NULL,NULL),(3037,2019,1048,NULL,NULL,NULL),(3038,2019,1049,NULL,NULL,NULL),(3039,2020,1071,NULL,NULL,NULL),(3040,2020,1072,NULL,NULL,NULL),(3041,2021,1047,NULL,NULL,NULL),(3042,2021,1048,NULL,NULL,NULL),(3043,2022,1110,NULL,NULL,NULL),(3044,2022,1111,NULL,NULL,NULL),(3045,2023,1001,NULL,NULL,NULL),(3046,2023,1002,NULL,NULL,NULL),(3047,2024,1003,NULL,NULL,NULL),(3048,2024,1004,NULL,NULL,NULL),(3049,2025,1005,NULL,NULL,NULL),(3050,2025,1006,NULL,NULL,NULL),(3051,2026,NULL,5001,NULL,NULL),(3052,2026,NULL,5021,NULL,NULL),(3053,2027,NULL,5002,NULL,NULL),(3054,2027,NULL,5022,NULL,NULL),(3055,2028,NULL,5003,NULL,NULL),(3056,2028,NULL,5023,NULL,NULL),(3057,2029,NULL,5004,NULL,NULL),(3058,2029,NULL,5024,NULL,NULL),(3059,2030,NULL,5041,NULL,NULL),(3060,2030,NULL,5141,NULL,NULL),(3061,2031,NULL,5042,NULL,NULL),(3062,2031,NULL,5142,NULL,NULL),(3063,2032,NULL,5005,NULL,NULL),(3064,2032,NULL,5045,NULL,NULL),(3065,2033,NULL,5043,NULL,NULL),(3066,2033,NULL,5183,NULL,NULL),(3067,2034,NULL,5044,NULL,NULL),(3068,2034,NULL,5184,NULL,NULL),(3069,2035,NULL,5049,NULL,NULL),(3070,2035,NULL,5149,NULL,NULL);
/*!40000 ALTER TABLE `match_competitors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_officials`
--

DROP TABLE IF EXISTS `match_officials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_officials` (
  `Match_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  PRIMARY KEY (`Match_ID`,`Staff_ID`),
  KEY `Staff_ID` (`Staff_ID`),
  CONSTRAINT `match_officials_ibfk_1` FOREIGN KEY (`Match_ID`) REFERENCES `matches` (`Match_ID`),
  CONSTRAINT `match_officials_ibfk_2` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_officials`
--

LOCK TABLES `match_officials` WRITE;
/*!40000 ALTER TABLE `match_officials` DISABLE KEYS */;
INSERT INTO `match_officials` VALUES (2001,102),(2010,102),(2019,102),(2028,102),(2035,102),(2002,109),(2011,109),(2020,109),(2029,109),(2003,115),(2012,115),(2021,115),(2030,115),(2004,121),(2013,121),(2022,121),(2031,121),(2005,127),(2014,127),(2023,127),(2032,127),(2006,133),(2015,133),(2024,133),(2033,133),(2007,139),(2016,139),(2025,139),(2034,139),(2008,145),(2017,145),(2026,145),(2009,151),(2018,151),(2027,151);
/*!40000 ALTER TABLE `match_officials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_outcomes`
--

DROP TABLE IF EXISTS `match_outcomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_outcomes` (
  `Outcome_ID` int NOT NULL,
  `Match_ID` int NOT NULL,
  `Winning_Team_ID` int DEFAULT NULL,
  `Winning_Participant_ID` int DEFAULT NULL,
  `Final_Score` varchar(50) NOT NULL,
  `MVP_Participant_ID` int DEFAULT NULL,
  PRIMARY KEY (`Outcome_ID`),
  UNIQUE KEY `Match_ID` (`Match_ID`),
  KEY `Winning_Team_ID` (`Winning_Team_ID`),
  KEY `Winning_Participant_ID` (`Winning_Participant_ID`),
  KEY `MVP_Participant_ID` (`MVP_Participant_ID`),
  CONSTRAINT `match_outcomes_ibfk_1` FOREIGN KEY (`Match_ID`) REFERENCES `matches` (`Match_ID`),
  CONSTRAINT `match_outcomes_ibfk_2` FOREIGN KEY (`Winning_Team_ID`) REFERENCES `teams` (`Team_ID`),
  CONSTRAINT `match_outcomes_ibfk_3` FOREIGN KEY (`Winning_Participant_ID`) REFERENCES `participants` (`Participant_ID`),
  CONSTRAINT `match_outcomes_ibfk_4` FOREIGN KEY (`MVP_Participant_ID`) REFERENCES `participants` (`Participant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_outcomes`
--

LOCK TABLES `match_outcomes` WRITE;
/*!40000 ALTER TABLE `match_outcomes` DISABLE KEYS */;
INSERT INTO `match_outcomes` VALUES (4001,2001,1002,NULL,'IITD won by 7 wickets',5023),(4002,2002,1026,NULL,'IITM won 2-1',5045),(4003,2010,NULL,5003,'3-0',5003);
/*!40000 ALTER TABLE `match_outcomes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `Match_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `Venue_ID` int NOT NULL,
  `Match_Date` date NOT NULL,
  `Start_time` datetime NOT NULL,
  `Match_Type` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `Winner_ID` int DEFAULT NULL,
  `Score_Summary` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Match_ID`),
  KEY `Event_ID` (`Event_ID`),
  KEY `Venue_ID` (`Venue_ID`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`),
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`Venue_ID`) REFERENCES `venues` (`Venue_ID`),
  CONSTRAINT `matches_chk_1` CHECK ((`Match_Type` in (_utf8mb4'League',_utf8mb4'Knockout',_utf8mb4'Friendly'))),
  CONSTRAINT `matches_chk_2` CHECK ((`Status` in (_utf8mb4'Scheduled',_utf8mb4'Completed',_utf8mb4'Canceled')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (2001,101,1,'2025-11-05','2025-11-05 08:00:00','League','Completed',NULL,NULL),(2002,102,2,'2025-11-05','2025-11-05 08:00:00','League','Completed',NULL,NULL),(2003,105,9,'2025-11-05','2025-11-05 08:00:00','League','Scheduled',NULL,NULL),(2004,103,8,'2025-11-05','2025-11-05 09:00:00','League','Scheduled',NULL,NULL),(2005,109,12,'2025-11-05','2025-11-05 11:00:00','League','Scheduled',NULL,NULL),(2006,117,3,'2025-11-05','2025-11-05 07:00:00','Knockout','Scheduled',NULL,NULL),(2007,123,7,'2025-11-05','2025-11-05 09:00:00','Knockout','Scheduled',NULL,NULL),(2008,124,7,'2025-11-05','2025-11-05 14:00:00','Knockout','Scheduled',NULL,NULL),(2009,101,1,'2025-11-05','2025-11-05 14:00:00','League','Scheduled',NULL,NULL),(2010,125,15,'2025-11-05','2025-11-05 10:00:00','Knockout','Completed',NULL,NULL),(2011,126,16,'2025-11-05','2025-11-05 11:00:00','Knockout','Scheduled',NULL,NULL),(2012,127,10,'2025-11-05','2025-11-05 09:00:00','Knockout','Scheduled',NULL,NULL),(2013,128,11,'2025-11-05','2025-11-05 09:00:00','Knockout','Scheduled',NULL,NULL),(2014,125,15,'2025-11-05','2025-11-05 11:00:00','Knockout','Scheduled',NULL,NULL),(2015,127,10,'2025-11-05','2025-11-05 10:00:00','Knockout','Scheduled',NULL,NULL),(2016,129,12,'2025-11-05','2025-11-05 12:00:00','Knockout','Scheduled',NULL,NULL),(2017,130,12,'2025-11-05','2025-11-05 16:00:00','Knockout','Scheduled',NULL,NULL),(2018,102,2,'2025-11-06','2025-11-06 08:00:00','League','Scheduled',NULL,NULL),(2019,104,8,'2025-11-06','2025-11-06 09:00:00','League','Scheduled',NULL,NULL),(2020,106,9,'2025-11-06','2025-11-06 08:00:00','League','Scheduled',NULL,NULL),(2021,107,10,'2025-11-06','2025-11-06 09:00:00','League','Scheduled',NULL,NULL),(2022,108,15,'2025-11-06','2025-11-06 10:00:00','League','Scheduled',NULL,NULL),(2023,114,7,'2025-11-06','2025-11-06 09:00:00','Knockout','Scheduled',NULL,NULL),(2024,115,7,'2025-11-06','2025-11-06 14:00:00','Knockout','Scheduled',NULL,NULL),(2025,116,7,'2025-11-06','2025-11-06 10:00:00','Knockout','Scheduled',NULL,NULL),(2026,117,3,'2025-11-06','2025-11-06 07:00:00','Knockout','Scheduled',NULL,NULL),(2027,118,3,'2025-11-06','2025-11-06 07:30:00','Knockout','Scheduled',NULL,NULL),(2028,119,3,'2025-11-06','2025-11-06 08:00:00','Knockout','Scheduled',NULL,NULL),(2029,120,3,'2025-11-06','2025-11-06 08:30:00','Knockout','Scheduled',NULL,NULL),(2030,133,4,'2025-11-06','2025-11-06 07:00:00','Knockout','Scheduled',NULL,NULL),(2031,134,4,'2025-11-06','2025-11-06 07:30:00','Knockout','Scheduled',NULL,NULL),(2032,139,6,'2025-11-06','2025-11-06 14:00:00','Knockout','Scheduled',NULL,NULL),(2033,129,12,'2025-11-06','2025-11-06 11:00:00','Knockout','Scheduled',NULL,NULL),(2034,130,12,'2025-11-06','2025-11-06 16:00:00','Knockout','Scheduled',NULL,NULL),(2035,123,7,'2025-11-06','2025-11-06 15:00:00','Knockout','Scheduled',NULL,NULL);
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messes`
--

DROP TABLE IF EXISTS `messes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messes` (
  `Mess_ID` int NOT NULL,
  `Institute_ID` int NOT NULL,
  `Mess_Name` varchar(100) NOT NULL,
  `Location` varchar(100) NOT NULL,
  PRIMARY KEY (`Mess_ID`),
  KEY `Institute_ID` (`Institute_ID`),
  CONSTRAINT `messes_ibfk_1` FOREIGN KEY (`Institute_ID`) REFERENCES `institutes` (`Institute_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messes`
--

LOCK TABLES `messes` WRITE;
/*!40000 ALTER TABLE `messes` DISABLE KEYS */;
INSERT INTO `messes` VALUES (1,3,'Ganga Mess','Ganga Hostel Area'),(2,3,'Sabarmati Mess','Girls Hostel Area'),(3,8,'HCU Mess 1','North Campus'),(4,8,'HCU Mess 2','South Campus'),(5,18,'Mess Hall 1','Hostel 1 Area'),(6,18,'Girls Hostel Mess','Girls Hostel Area');
/*!40000 ALTER TABLE `messes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `Participant_ID` int NOT NULL,
  `Hostel_ID` int NOT NULL,
  `Institute_ID` int NOT NULL,
  `Mess_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `Gender` char(1) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`Participant_ID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Hostel_ID` (`Hostel_ID`),
  KEY `Institute_ID` (`Institute_ID`),
  KEY `Mess_ID` (`Mess_ID`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`Hostel_ID`) REFERENCES `hostels` (`Hostel_ID`),
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`Institute_ID`) REFERENCES `institutes` (`Institute_ID`),
  CONSTRAINT `participants_ibfk_3` FOREIGN KEY (`Mess_ID`) REFERENCES `messes` (`Mess_ID`),
  CONSTRAINT `participants_chk_1` CHECK ((`Gender` in (_utf8mb4'M',_utf8mb4'F',_utf8mb4'O')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (5001,301,1,1,'Aarav Singh','2003-07-25','M','aarav.s.1@iitb.ac.in'),(5002,302,1,2,'Bhavna Kumar','2002-11-10','F','bhavna.k.2@iitb.ac.in'),(5003,303,1,1,'Chetan Desai','2004-01-01','M','chetan.d.3@iitb.ac.in'),(5004,304,1,2,'Divya Patel','2001-05-30','F','divya.p.4@iitb.ac.in'),(5005,305,1,1,'Eklavya Sharma','2003-08-15','M','eklavya.s.5@iitb.ac.in'),(5006,301,1,2,'Fatima Khan','2002-04-12','F','fatima.k.6@iitb.ac.in'),(5007,302,1,1,'Gaurav Jain','2004-02-20','M','gaurav.j.7@iitb.ac.in'),(5008,303,1,2,'Harini Menon','2003-03-05','F','harini.m.8@iitb.ac.in'),(5009,304,1,1,'Ishaan Nair','2001-09-09','M','ishaan.n.9@iitb.ac.in'),(5010,305,1,2,'Jiya Verma','2002-10-10','F','jiya.v.10@iitb.ac.in'),(5011,301,1,1,'Kabir Dhoot','2003-01-01','M','kabir.d.11@iitb.ac.in'),(5012,302,1,2,'Leela Rao','2002-02-02','F','leela.r.12@iitb.ac.in'),(5013,303,1,1,'Mohit Saini','2004-03-03','M','mohit.s.13@iitb.ac.in'),(5014,304,1,2,'Nidhi Gupta','2001-04-04','F','nidhi.g.14@iitb.ac.in'),(5015,305,1,1,'Omar Khan','2003-05-05','M','omar.k.15@iitb.ac.in'),(5016,301,1,2,'Priya Singh','2002-06-06','F','priya.s.16@iitb.ac.in'),(5017,302,1,1,'Quasim Ali','2004-07-07','M','quasim.a.17@iitb.ac.in'),(5018,303,1,2,'Ritu Sharma','2001-08-08','F','ritu.s.18@iitb.ac.in'),(5019,304,1,1,'Siddharth V','2003-09-09','M','siddharth.v.19@iitb.ac.in'),(5020,305,1,2,'Tanya Roy','2002-10-10','F','tanya.r.20@iitb.ac.in'),(5021,301,2,1,'Uday Patel','2003-07-25','M','uday.p.21@iitd.ac.in'),(5022,302,2,2,'Vanya Jain','2002-11-10','F','vanya.j.22@iitd.ac.in'),(5023,303,2,1,'Wasim Khan','2004-01-01','M','wasim.k.23@iitd.ac.in'),(5024,304,2,2,'Xena Singh','2001-05-30','F','xena.s.24@iitd.ac.in'),(5025,305,2,1,'Yash Verma','2003-08-15','M','yash.v.25@iitd.ac.in'),(5026,301,2,2,'Zoya Ali','2002-04-12','F','zoya.a.26@iitd.ac.in'),(5027,302,2,1,'Arjun M.','2004-02-20','M','arjun.m.27@iitd.ac.in'),(5028,303,2,2,'Bela G.','2003-03-05','F','bela.g.28@iitd.ac.in'),(5029,304,2,1,'Chandan P.','2001-09-09','M','chandan.p.29@iitd.ac.in'),(5030,305,2,2,'Deepali R.','2002-10-10','F','deepali.r.30@iitd.ac.in'),(5031,301,2,1,'Ehsan S.','2003-01-01','M','ehsan.s.31@iitd.ac.in'),(5032,302,2,2,'Fara T.','2002-02-02','F','fara.t.32@iitd.ac.in'),(5033,303,2,1,'Girish U.','2004-03-03','M','girish.u.33@iitd.ac.in'),(5034,304,2,2,'Heena V.','2001-04-04','F','heena.v.34@iitd.ac.in'),(5035,305,2,1,'Ishan W.','2003-05-05','M','ishan.w.35@iitd.ac.in'),(5036,301,2,2,'Jahan Y.','2002-06-06','F','jahan.y.36@iitd.ac.in'),(5037,302,2,1,'Kunal Z.','2004-07-07','M','kunal.z.37@iitd.ac.in'),(5038,303,2,2,'Lavanya A.','2001-08-08','F','lavanya.a.38@iitd.ac.in'),(5039,304,2,1,'Manav B.','2003-09-09','M','manav.b.39@iitd.ac.in'),(5040,305,2,2,'Nandini C.','2002-10-10','F','nandini.c.40@iitd.ac.in'),(5041,301,3,1,'Omkar D.','2003-07-25','M','omkar.d.41@iitm.ac.in'),(5042,302,3,2,'Prachi E.','2002-11-10','F','prachi.e.42@iitm.ac.in'),(5043,303,3,1,'Qasim F.','2004-01-01','M','qasim.f.43@iitm.ac.in'),(5044,304,3,2,'Ria G.','2001-05-30','F','ria.g.44@iitm.ac.in'),(5045,305,3,1,'Samarth H.','2003-08-15','M','samarth.h.45@iitm.ac.in'),(5046,301,3,2,'Tejal I.','2002-04-12','F','tejal.i.46@iitm.ac.in'),(5047,302,3,1,'Uday J.','2004-02-20','M','uday.j.47@iitm.ac.in'),(5048,303,3,2,'Vibha K.','2003-03-05','F','vibha.k.48@iitm.ac.in'),(5049,304,3,1,'Wazir L.','2001-09-09','M','wazir.l.49@iitm.ac.in'),(5050,305,3,2,'Yasha M.','2002-10-10','F','yasha.m.50@iitm.ac.in'),(5051,301,3,1,'Zamir N.','2003-01-01','M','zamir.n.51@iitm.ac.in'),(5052,302,3,2,'Akila O.','2002-02-02','F','akila.o.52@iitm.ac.in'),(5053,303,3,1,'Bharat P.','2004-03-03','M','bharat.p.53@iitm.ac.in'),(5054,304,3,2,'Chaya Q.','2001-04-04','F','chaya.q.54@iitm.ac.in'),(5055,305,3,1,'Dev R.','2003-05-05','M','dev.r.55@iitm.ac.in'),(5056,301,3,2,'Esha S.','2002-06-06','F','esha.s.56@iitm.ac.in'),(5057,302,3,1,'Faisal T.','2004-07-07','M','faisal.t.57@iitm.ac.in'),(5058,303,3,2,'Gia U.','2001-08-08','F','gia.u.58@iitm.ac.in'),(5059,304,3,1,'Hiten V.','2003-09-09','M','hiten.v.59@iitm.ac.in'),(5060,305,3,2,'Ira W.','2002-10-10','F','ira.w.60@iitm.ac.in'),(5061,801,4,3,'Jigar X.','2003-07-25','M','jigar.x.61@iitkgp.ac.in'),(5062,802,4,4,'Kavya Y.','2002-11-10','F','kavya.y.62@iitkgp.ac.in'),(5063,803,4,3,'Lokesh Z.','2004-01-01','M','lokesh.z.63@iitkgp.ac.in'),(5064,804,4,4,'Mala A.','2001-05-30','F','mala.a.64@iitkgp.ac.in'),(5065,805,4,3,'Naveen B.','2003-08-15','M','naveen.b.65@iitkgp.ac.in'),(5066,801,4,4,'Oorja C.','2002-04-12','F','oorja.c.66@iitkgp.ac.in'),(5067,802,4,3,'Pranav D.','2004-02-20','M','pranav.d.67@iitkgp.ac.in'),(5068,803,4,4,'Ragini E.','2003-03-05','F','ragini.e.68@iitkgp.ac.in'),(5069,804,4,3,'Sarthak F.','2001-09-09','M','sarthak.f.69@iitkgp.ac.in'),(5070,805,4,4,'Tanisha G.','2002-10-10','F','tanisha.g.70@iitkgp.ac.in'),(5071,801,4,3,'Ujjwal H.','2003-01-01','M','ujjwal.h.71@iitkgp.ac.in'),(5072,802,4,4,'Vanshika I.','2002-02-02','F','vanshika.i.72@iitkgp.ac.in'),(5073,803,4,3,'Waman J.','2004-03-03','M','waman.j.73@iitkgp.ac.in'),(5074,804,4,4,'Yashika K.','2001-04-04','F','yashika.k.74@iitkgp.ac.in'),(5075,805,4,3,'Zubin L.','2003-05-05','M','zubin.l.75@iitkgp.ac.in'),(5076,801,4,4,'Anaya M.','2002-06-06','F','anaya.m.76@iitkgp.ac.in'),(5077,802,4,3,'Biren N.','2004-07-07','M','biren.n.77@iitkgp.ac.in'),(5078,803,4,4,'Charu O.','2001-08-08','F','charu.o.78@iitkgp.ac.in'),(5079,804,4,3,'Devansh P.','2003-09-09','M','devansh.p.79@iitkgp.ac.in'),(5080,805,4,4,'Esha Q.','2002-10-10','F','esha.q.80@iitkgp.ac.in'),(5081,801,5,3,'Farhan R.','2003-07-25','M','farhan.r.81@iitk.ac.in'),(5082,802,5,4,'Ganga S.','2002-11-10','F','ganga.s.82@iitk.ac.in'),(5083,803,5,3,'Harsh T.','2004-01-01','M','harsh.t.83@iitk.ac.in'),(5084,804,5,4,'Isha U.','2001-05-30','F','isha.u.84@iitk.ac.in'),(5085,805,5,3,'Jitendra V.','2003-08-15','M','jitendra.v.85@iitk.ac.in'),(5086,801,5,4,'Kavita W.','2002-04-12','F','kavita.w.86@iitk.ac.in'),(5087,802,5,3,'Lalit X.','2004-02-20','M','lalit.x.87@iitk.ac.in'),(5088,803,5,4,'Monika Y.','2003-03-05','F','monika.y.88@iitk.ac.in'),(5089,804,5,3,'Nirmal Z.','2001-09-09','M','nirmal.z.89@iitk.ac.in'),(5090,805,5,4,'Pallavi A.','2002-10-10','F','pallavi.a.90@iitk.ac.in'),(5091,801,5,3,'Quresh B.','2003-01-01','M','quresh.b.91@iitk.ac.in'),(5092,802,5,4,'Rhea C.','2002-02-02','F','rhea.c.92@iitk.ac.in'),(5093,803,5,3,'Sameer D.','2004-03-03','M','sameer.d.93@iitk.ac.in'),(5094,804,5,4,'Trisha E.','2001-04-04','F','trisha.e.94@iitk.ac.in'),(5095,805,5,3,'Urvil F.','2003-05-05','M','urvil.f.95@iitk.ac.in'),(5096,801,5,4,'Vamika G.','2002-06-06','F','vamika.g.96@iitk.ac.in'),(5097,802,5,3,'Waseem H.','2004-07-07','M','waseem.h.97@iitk.ac.in'),(5098,803,5,4,'Yashika I.','2001-08-08','F','yashika.i.98@iitk.ac.in'),(5099,804,5,3,'Zeeshan J.','2003-09-09','M','zeeshan.j.99@iitk.ac.in'),(5100,805,5,4,'Aditi K.','2002-10-10','F','aditi.k.100@iitk.ac.in'),(5101,1801,6,5,'Ajay L.','2003-07-25','M','ajay.l.101@iitr.ac.in'),(5102,1802,6,6,'Bhavin M.','2002-11-10','F','bhavin.m.102@iitr.ac.in'),(5103,1803,6,5,'Chitra N.','2004-01-01','M','chitra.n.103@iitr.ac.in'),(5104,1804,6,6,'Dinesh O.','2001-05-30','F','dinesh.o.104@iitr.ac.in'),(5105,1805,6,5,'Eliza P.','2003-08-15','M','eliza.p.105@iitr.ac.in'),(5106,1801,6,6,'Farah Q.','2002-04-12','F','farah.q.106@iitr.ac.in'),(5107,1802,6,5,'Girish R.','2004-02-20','M','girish.r.107@iitr.ac.in'),(5108,1803,6,6,'Hema S.','2003-03-05','F','hema.s.108@iitr.ac.in'),(5109,1804,6,5,'Irfan T.','2001-09-09','M','irfan.t.109@iitr.ac.in'),(5110,1805,6,6,'Jalpa U.','2002-10-10','F','jalpa.u.110@iitr.ac.in'),(5111,1801,6,5,'Kunal V.','2003-01-01','M','kunal.v.111@iitr.ac.in'),(5112,1802,6,6,'Lata W.','2002-02-02','F','lata.w.112@iitr.ac.in'),(5113,1803,6,5,'Manas X.','2004-03-03','M','manas.x.113@iitr.ac.in'),(5114,1804,6,6,'Naina Y.','2001-04-04','F','naina.y.114@iitr.ac.in'),(5115,1805,6,5,'Omkar Z.','2003-05-05','M','omkar.z.115@iitr.ac.in'),(5116,1801,6,6,'Pankaj A.','2002-06-06','F','pankaj.a.116@iitr.ac.in'),(5117,1802,6,5,'Ravi B.','2004-07-07','M','ravi.b.117@iitr.ac.in'),(5118,1803,6,6,'Sana C.','2001-08-08','F','sana.c.118@iitr.ac.in'),(5119,1804,6,5,'Tarun D.','2003-09-09','M','tarun.d.119@iitr.ac.in'),(5120,1805,6,6,'Urmi E.','2002-10-10','F','urmi.e.120@iitr.ac.in'),(5121,301,7,1,'Vikas F.','2003-07-25','M','vikas.f.121@iitg.ac.in'),(5122,302,7,2,'Wanda G.','2002-11-10','F','wanda.g.122@iitg.ac.in'),(5123,303,7,1,'Xander H.','2004-01-01','M','xander.h.123@iitg.ac.in'),(5124,304,7,2,'Yashi I.','2001-05-30','F','yashi.i.124@iitg.ac.in'),(5125,305,7,1,'Zafar J.','2003-08-15','M','zafar.j.125@iitg.ac.in'),(5126,301,7,2,'Aarti K.','2002-04-12','F','aarti.k.126@iitg.ac.in'),(5127,302,7,1,'Bikram L.','2004-02-20','M','bikram.l.127@iitg.ac.in'),(5128,303,7,2,'Chetna M.','2003-03-05','F','chetna.m.128@iitg.ac.in'),(5129,304,7,1,'Darshan N.','2001-09-09','M','darshan.n.129@iitg.ac.in'),(5130,305,7,2,'Esha O.','2002-10-10','F','esha.o.130@iitg.ac.in'),(5131,301,7,1,'Firoz P.','2003-01-01','M','firoz.p.131@iitg.ac.in'),(5132,302,7,2,'Gauri Q.','2002-02-02','F','gauri.q.132@iitg.ac.in'),(5133,303,7,1,'Harsh R.','2004-03-03','M','harsh.r.133@iitg.ac.in'),(5134,304,7,2,'Iqra S.','2001-04-04','F','iqra.s.134@iitg.ac.in'),(5135,305,7,1,'Jay U.','2003-05-05','M','jay.u.135@iitg.ac.in'),(5136,301,7,2,'Kajal V.','2002-06-06','F','kajal.v.136@iitg.ac.in'),(5137,302,7,1,'Lokesh W.','2004-07-07','M','lokesh.w.137@iitg.ac.in'),(5138,303,7,2,'Megha X.','2001-08-08','F','megha.x.138@iitg.ac.in'),(5139,304,7,1,'Nikhil Y.','2003-09-09','M','nikhil.y.139@iitg.ac.in'),(5140,305,7,2,'Oishi Z.','2002-10-10','F','oishi.z.140@iitg.ac.in'),(5141,801,8,3,'Prashant A.','2003-07-25','M','prashant.a.141@iith.ac.in'),(5142,802,8,4,'Rachna B.','2002-11-10','F','rachna.b.142@iith.ac.in'),(5143,803,8,3,'Sanjay C.','2004-01-01','M','sanjay.c.143@iith.ac.in'),(5144,804,8,4,'Tina D.','2001-05-30','F','tina.d.144@iith.ac.in'),(5145,805,8,3,'Utsav E.','2003-08-15','M','utsav.e.145@iith.ac.in'),(5146,801,8,4,'Vandana F.','2002-04-12','F','vandana.f.146@iith.ac.in'),(5147,802,8,3,'Vivek G.','2004-02-20','M','vivek.g.147@iith.ac.in'),(5148,803,8,4,'Yamini H.','2003-03-05','F','yamini.h.148@iith.ac.in'),(5149,804,8,3,'Zain I.','2001-09-09','M','zain.i.149@iith.ac.in'),(5150,805,8,4,'Amrita J.','2002-10-10','F','amrita.j.150@iith.ac.in'),(5151,801,8,3,'Babu K.','2003-01-01','M','babu.k.151@iith.ac.in'),(5152,802,8,4,'Chanda L.','2002-02-02','F','chanda.l.152@iith.ac.in'),(5153,803,8,3,'Deepak M.','2004-03-03','M','deepak.m.153@iith.ac.in'),(5154,804,8,4,'Esha N.','2001-04-04','F','esha.n.154@iith.ac.in'),(5155,805,8,3,'Farhan O.','2003-05-05','M','farhan.o.155@iith.ac.in'),(5156,801,8,4,'Gita P.','2002-06-06','F','gita.p.156@iith.ac.in'),(5157,802,8,3,'Harish Q.','2004-07-07','M','harish.q.157@iith.ac.in'),(5158,803,8,4,'Indu R.','2001-08-08','F','indu.r.158@iith.ac.in'),(5159,804,8,3,'Jagath S.','2003-09-09','M','jagath.s.159@iith.ac.in'),(5160,805,8,4,'Kavya T.','2002-10-10','F','kavya.t.160@iith.ac.in'),(5161,1801,9,5,'Lalit U.','2003-07-25','M','lalit.u.161@iitp.ac.in'),(5162,1802,9,6,'Meena V.','2002-11-10','F','meena.v.162@iitp.ac.in'),(5163,1803,9,5,'Naveen W.','2004-01-01','M','naveen.w.163@iitp.ac.in'),(5164,1804,9,6,'Oma X.','2001-05-30','F','oma.x.164@iitp.ac.in'),(5165,1805,9,5,'Praveen Y.','2003-08-15','M','praveen.y.165@iitp.ac.in'),(5166,1801,9,6,'Radhika Z.','2002-04-12','F','radhika.z.166@iitp.ac.in'),(5167,1802,9,5,'Sameer A.','2004-02-20','M','sameer.a.167@iitp.ac.in'),(5168,1803,9,6,'Trina B.','2003-03-05','F','trina.b.168@iitp.ac.in'),(5169,1804,9,5,'Uday C.','2001-09-09','M','uday.c.169@iitp.ac.in'),(5170,1805,9,6,'Veena D.','2002-10-10','F','veena.d.170@iitp.ac.in'),(5171,1801,9,5,'Wasi E.','2003-01-01','M','wasi.e.171@iitp.ac.in'),(5172,1802,9,6,'Yami F.','2002-02-02','F','yami.f.172@iitp.ac.in'),(5173,1803,9,5,'Zubin G.','2004-03-03','M','zubin.g.173@iitp.ac.in'),(5174,1804,9,6,'Aaliyah H.','2001-04-04','F','aaliyah.h.174@iitp.ac.in'),(5175,1805,9,5,'Brijesh I.','2003-05-05','M','brijesh.i.175@iitp.ac.in'),(5176,1801,9,6,'Chhavi J.','2002-06-06','F','chhavi.j.176@iitp.ac.in'),(5177,1802,9,5,'Deep K.','2004-07-07','M','deep.k.177@iitp.ac.in'),(5178,1803,9,6,'Ekta L.','2001-08-08','F','ekta.l.178@iitp.ac.in'),(5179,1804,9,5,'Fahad M.','2003-09-09','M','fahad.m.179@iitp.ac.in'),(5180,1805,9,6,'Gauri N.','2002-10-10','F','gauri.n.180@iitp.ac.in'),(5181,301,10,1,'Hitesh O.','2003-07-25','M','hitesh.o.181@iitbbs.ac.in'),(5182,302,10,2,'Isha P.','2002-11-10','F','isha.p.182@iitbbs.ac.in'),(5183,303,10,1,'Jitendra Q.','2004-01-01','M','jitendra.q.183@iitbbs.ac.in'),(5184,304,10,2,'Kirti R.','2001-05-30','F','kirti.r.184@iitbbs.ac.in'),(5185,305,10,1,'Laxman S.','2003-08-15','M','laxman.s.185@iitbbs.ac.in'),(5186,301,10,2,'Mona T.','2002-04-12','F','mona.t.186@iitbbs.ac.in'),(5187,302,10,1,'Naveen U.','2004-02-20','M','naveen.u.187@iitbbs.ac.in'),(5188,303,10,2,'Ojasvi V.','2003-03-05','F','ojasvi.v.188@iitbbs.ac.in'),(5189,304,10,1,'Prateek W.','2001-09-09','M','prateek.w.189@iitbbs.ac.in'),(5190,305,10,2,'Rhea X.','2002-10-10','F','rhea.x.190@iitbbs.ac.in'),(5191,301,10,1,'Sagar Y.','2003-01-01','M','sagar.y.191@iitbbs.ac.in'),(5192,302,10,2,'Tanvi Z.','2002-02-02','F','tanvi.z.192@iitbbs.ac.in'),(5193,303,10,1,'Urvil A.','2004-03-03','M','urvil.a.193@iitbbs.ac.in'),(5194,304,10,2,'Vidhi B.','2001-04-04','F','vidhi.b.194@iitbbs.ac.in'),(5195,305,10,1,'Waman C.','2003-05-05','M','waman.c.195@iitbbs.ac.in'),(5196,301,10,2,'Yamini D.','2002-06-06','F','yamini.d.196@iitbbs.ac.in'),(5197,302,10,1,'Zahid E.','2004-07-07','M','zahid.e.197@iitbbs.ac.in'),(5198,303,10,2,'Ankita F.','2001-08-08','F','ankita.f.198@iitbbs.ac.in'),(5199,304,10,1,'Bhavin G.','2003-09-09','M','bhavin.g.199@iitbbs.ac.in'),(5200,305,10,2,'Charu H.','2002-10-10','F','charu.h.200@iitbbs.ac.in'),(5201,801,11,3,'Dhruv I.','2003-07-25','M','dhruv.i.201@iitgn.ac.in'),(5202,802,11,4,'Ekta J.','2002-11-10','F','ekta.j.202@iitgn.ac.in'),(5203,803,11,3,'Feroz K.','2004-01-01','M','feroz.k.203@iitgn.ac.in'),(5204,804,11,4,'Gita L.','2001-05-30','F','gita.l.204@iitgn.ac.in'),(5205,805,11,3,'Harsh M.','2003-08-15','M','harsh.m.205@iitgn.ac.in'),(5206,801,11,4,'Ira N.','2002-04-12','F','ira.n.206@iitgn.ac.in'),(5207,802,11,3,'Jatin O.','2004-02-20','M','jatin.o.207@iitgn.ac.in'),(5208,803,11,4,'Kiran P.','2003-03-05','F','kiran.p.208@iitgn.ac.in'),(5209,804,11,3,'Lokesh Q.','2001-09-09','M','lokesh.q.209@iitgn.ac.in'),(5210,805,11,4,'Manya R.','2002-10-10','F','manya.r.210@iitgn.ac.in'),(5211,801,11,3,'Naveen S.','2003-01-01','M','naveen.s.211@iitgn.ac.in'),(5212,802,11,4,'Oishi T.','2002-02-02','F','oishi.t.212@iitgn.ac.in'),(5213,803,11,3,'Parth U.','2004-03-03','M','parth.u.213@iitgn.ac.in'),(5214,804,11,4,'Qurrat V.','2001-04-04','F','qurrat.v.214@iitgn.ac.in'),(5215,805,11,3,'Rohan W.','2003-05-05','M','rohan.w.215@iitgn.ac.in'),(5216,801,11,4,'Sana X.','2002-06-06','F','sana.x.216@iitgn.ac.in'),(5217,802,11,3,'Tarun Y.','2004-07-07','M','tarun.y.217@iitgn.ac.in'),(5218,803,11,4,'Urvashi Z.','2001-08-08','F','urvashi.z.218@iitgn.ac.in'),(5219,804,11,3,'Vikas A.','2003-09-09','M','vikas.a.219@iitgn.ac.in'),(5220,805,11,4,'Wafa B.','2002-10-10','F','wafa.b.220@iitgn.ac.in'),(5221,801,12,3,'Yash C.','2003-07-25','M','yash.c.221@iiti.ac.in'),(5222,802,12,4,'Zoya D.','2002-11-10','F','zoya.d.222@iiti.ac.in'),(5223,803,12,3,'Aamir E.','2004-01-01','M','aamir.e.223@iiti.ac.in'),(5224,804,12,4,'Bela F.','2001-05-30','F','bela.f.224@iiti.ac.in'),(5225,805,12,3,'Chirag G.','2003-08-15','M','chirag.g.225@iiti.ac.in'),(5226,801,12,4,'Dia H.','2002-04-12','F','dia.h.226@iiti.ac.in'),(5227,802,12,3,'Ehan I.','2004-02-20','M','ehan.i.227@iiti.ac.in'),(5228,803,12,4,'Falguni J.','2003-03-05','F','falguni.j.228@iiti.ac.in'),(5229,804,12,3,'Girish K.','2001-09-09','M','girish.k.229@iiti.ac.in'),(5230,805,12,4,'Hina L.','2002-10-10','F','hina.l.230@iiti.ac.in'),(5231,801,12,3,'Irfan M.','2003-01-01','M','irfan.m.231@iiti.ac.in'),(5232,802,12,4,'Jaya N.','2002-02-02','F','jaya.n.232@iiti.ac.in'),(5233,803,12,3,'Karan O.','2004-03-03','M','karan.o.233@iiti.ac.in'),(5234,804,12,4,'Lina P.','2001-04-04','F','lina.p.234@iiti.ac.in'),(5235,805,12,3,'Manoj Q.','2003-05-05','M','manoj.q.235@iiti.ac.in'),(5236,801,12,4,'Neha R.','2002-06-06','F','neha.r.236@iiti.ac.in'),(5237,802,12,3,'Om S.','2004-07-07','M','om.s.237@iiti.ac.in'),(5238,803,12,4,'Parul T.','2001-08-08','F','parul.t.238@iiti.ac.in'),(5239,804,12,3,'Qasim U.','2003-09-09','M','qasim.u.239@iiti.ac.in'),(5240,805,12,4,'Reena V.','2002-10-10','F','reena.v.240@iiti.ac.in'),(5241,1801,13,5,'Suresh W.','2003-07-25','M','suresh.w.241@iitrpr.ac.in'),(5242,1802,13,6,'Tanya X.','2002-11-10','F','tanya.x.242@iitrpr.ac.in'),(5243,1803,13,5,'Udit Y.','2004-01-01','M','udit.y.243@iitrpr.ac.in'),(5244,1804,13,6,'Vandana Z.','2001-05-30','F','vandana.z.244@iitrpr.ac.in'),(5245,1805,13,5,'Waseem A.','2003-08-15','M','waseem.a.245@iitrpr.ac.in'),(5246,1801,13,6,'Yashika B.','2002-04-12','F','yashika.b.246@iitrpr.ac.in'),(5247,1802,13,5,'Zain C.','2004-02-20','M','zain.c.247@iitrpr.ac.in'),(5248,1803,13,6,'Aisha D.','2003-03-05','F','aisha.d.248@iitrpr.ac.in'),(5249,1804,13,5,'Brij E.','2001-09-09','M','brij.e.249@iitrpr.ac.in'),(5250,1805,13,6,'Charu F.','2002-10-10','F','charu.f.250@iitrpr.ac.in'),(5251,1801,13,5,'Dev G.','2003-01-01','M','dev.g.251@iitrpr.ac.in'),(5252,1802,13,6,'Ekta H.','2002-02-02','F','ekta.h.252@iitrpr.ac.in'),(5253,1803,13,5,'Firoz I.','2004-03-03','M','firoz.i.253@iitrpr.ac.in'),(5254,1804,13,6,'Gauri J.','2001-04-04','F','gauri.j.254@iitrpr.ac.in'),(5255,1805,13,5,'Harsh K.','2003-05-05','M','harsh.k.255@iitrpr.ac.in'),(5256,1801,13,6,'Ira L.','2002-06-06','F','ira.l.256@iitrpr.ac.in'),(5257,1802,13,5,'Jatin M.','2004-07-07','M','jatin.m.257@iitrpr.ac.in'),(5258,1803,13,6,'Kiran N.','2001-08-08','F','kiran.n.258@iitrpr.ac.in'),(5259,1804,13,5,'Lokesh O.','2003-09-09','M','lokesh.o.259@iitrpr.ac.in'),(5260,1805,13,6,'Meera P.','2002-10-10','F','meera.p.260@iitrpr.ac.in'),(5261,301,14,1,'Nitin Q.','2003-07-25','M','nitin.q.261@iitmandi.ac.in'),(5262,302,14,2,'Omkar R.','2002-11-10','F','omkar.r.262@iitmandi.ac.in'),(5263,303,14,1,'Pooja S.','2004-01-01','M','pooja.s.263@iitmandi.ac.in'),(5264,304,14,2,'Qasim T.','2001-05-30','F','qasim.t.264@iitmandi.ac.in'),(5265,305,14,1,'Rakesh U.','2003-08-15','M','rakesh.u.265@iitmandi.ac.in'),(5266,301,14,2,'Sonia V.','2002-04-12','F','sonia.v.266@iitmandi.ac.in'),(5267,302,14,1,'Tarun W.','2004-02-20','M','tarun.w.267@iitmandi.ac.in'),(5268,303,14,2,'Usha X.','2003-03-05','F','usha.x.268@iitmandi.ac.in'),(5269,304,14,1,'Vikas Y.','2001-09-09','M','vikas.y.269@iitmandi.ac.in'),(5270,305,14,2,'Waman Z.','2002-10-10','F','waman.z.270@iitmandi.ac.in'),(5271,301,14,1,'Yash A.','2003-01-01','M','yash.a.271@iitmandi.ac.in'),(5272,302,14,2,'Zaira B.','2002-02-02','F','zaira.b.272@iitmandi.ac.in'),(5273,303,14,1,'Amrit C.','2004-03-03','M','amrit.c.273@iitmandi.ac.in'),(5274,304,14,2,'Bela D.','2001-04-04','F','bela.d.274@iitmandi.ac.in'),(5275,305,14,1,'Chandan E.','2003-05-05','M','chandan.e.275@iitmandi.ac.in'),(5276,301,14,2,'Diya F.','2002-06-06','F','diya.f.276@iitmandi.ac.in'),(5277,302,14,1,'Ehsan G.','2004-07-07','M','ehsan.g.277@iitmandi.ac.in'),(5278,303,14,2,'Farah H.','2001-08-08','F','farah.h.278@iitmandi.ac.in'),(5279,304,14,1,'Girish I.','2003-09-09','M','girish.i.279@iitmandi.ac.in'),(5280,305,14,2,'Hema J.','2002-10-10','F','hema.j.280@iitmandi.ac.in'),(5281,801,15,3,'Irfan K.','2003-07-25','M','irfan.k.281@iitj.ac.in'),(5282,802,15,4,'Jiya L.','2002-11-10','F','jiya.l.282@iitj.ac.in'),(5283,803,15,3,'Karan M.','2004-01-01','M','karan.m.283@iitj.ac.in'),(5284,804,15,4,'Lata N.','2001-05-30','F','lata.n.284@iitj.ac.in'),(5285,805,15,3,'Manish O.','2003-08-15','M','manish.o.285@iitj.ac.in'),(5286,801,15,4,'Neha P.','2002-04-12','F','neha.p.286@iitj.ac.in'),(5287,802,15,3,'Omkar Q.','2004-02-20','M','omkar.q.287@iitj.ac.in'),(5288,803,15,4,'Pooja R.','2003-03-05','F','pooja.r.288@iitj.ac.in'),(5289,804,15,3,'Qasim S.','2001-09-09','M','qasim.s.289@iitj.ac.in'),(5290,805,15,4,'Riya T.','2002-10-10','F','riya.t.290@iitj.ac.in'),(5291,801,15,3,'Sagar U.','2003-01-01','M','sagar.u.291@iitj.ac.in'),(5292,802,15,4,'Tarini V.','2002-02-02','F','tarini.v.292@iitj.ac.in'),(5293,803,15,3,'Umesh W.','2004-03-03','M','umesh.w.293@iitj.ac.in'),(5294,804,15,4,'Vani X.','2001-04-04','F','vani.x.294@iitj.ac.in'),(5295,805,15,3,'Wasi Y.','2003-05-05','M','wasi.y.295@iitj.ac.in'),(5296,801,15,4,'Xena Z.','2002-06-06','F','xena.z.296@iitj.ac.in'),(5297,802,15,3,'Yash A.','2004-07-07','M','yash.a.297@iitj.ac.in'),(5298,803,15,4,'Zoya B.','2001-08-08','F','zoya.b.298@iitj.ac.in'),(5299,804,15,3,'Amit C.','2003-09-09','M','amit.c.299@iitj.ac.in'),(5300,805,15,4,'Bela D.','2002-10-10','F','bela.d.300@iitj.ac.in'),(5301,1801,16,5,'Chirag E.','2003-07-25','M','chirag.e.301@iitbhu.ac.in'),(5302,1802,16,6,'Diya F.','2002-11-10','F','diya.f.302@iitbhu.ac.in'),(5303,1803,16,5,'Ehsan G.','2004-01-01','M','ehsan.g.303@iitbhu.ac.in'),(5304,1804,16,6,'Falguni H.','2001-05-30','F','falguni.h.304@iitbhu.ac.in'),(5305,1805,16,5,'Girish I.','2003-08-15','M','girish.i.305@iitbhu.ac.in'),(5306,1801,16,6,'Hina J.','2002-04-12','F','hina.j.306@iitbhu.ac.in'),(5307,1802,16,5,'Irfan K.','2004-02-20','M','irfan.k.307@iitbhu.ac.in'),(5308,1803,16,6,'Jiya L.','2003-03-05','F','jiya.l.308@iitbhu.ac.in'),(5309,1804,16,5,'Karan M.','2001-09-09','M','karan.m.309@iitbhu.ac.in'),(5310,1805,16,6,'Lata N.','2002-10-10','F','lata.n.310@iitbhu.ac.in'),(5311,1801,16,5,'Manish O.','2003-01-01','M','manish.o.311@iitbhu.ac.in'),(5312,1802,16,6,'Neha P.','2002-02-02','F','neha.p.312@iitbhu.ac.in'),(5313,1803,16,5,'Omkar Q.','2004-03-03','M','omkar.q.313@iitbhu.ac.in'),(5314,1804,16,6,'Pooja R.','2001-04-04','F','pooja.r.314@iitbhu.ac.in'),(5315,1805,16,5,'Qasim S.','2003-05-05','M','qasim.s.315@iitbhu.ac.in'),(5316,1801,16,6,'Riya T.','2002-06-06','F','riya.t.316@iitbhu.ac.in'),(5317,1802,16,5,'Sagar U.','2004-07-07','M','sagar.u.317@iitbhu.ac.in'),(5318,1803,16,6,'Tanya V.','2001-08-08','F','tanya.v.318@iitbhu.ac.in'),(5319,1804,16,5,'Umesh W.','2003-09-09','M','umesh.w.319@iitbhu.ac.in'),(5320,1805,16,6,'Vani X.','2002-10-10','F','vani.x.320@iitbhu.ac.in'),(5321,301,17,1,'Wasi Y.','2003-07-25','M','wasi.y.321@iitpkd.ac.in'),(5322,302,17,2,'Xena Z.','2002-11-10','F','xena.z.322@iitpkd.ac.in'),(5323,303,17,1,'Yash A.','2004-01-01','M','yash.a.323@iitpkd.ac.in'),(5324,304,17,2,'Zoya B.','2001-05-30','F','zoya.b.324@iitpkd.ac.in'),(5325,305,17,1,'Amit C.','2003-08-15','M','amit.c.325@iitpkd.ac.in'),(5326,301,17,2,'Bela D.','2002-04-12','F','bela.d.326@iitpkd.ac.in'),(5327,302,17,1,'Chirag E.','2004-02-20','M','chirag.e.327@iitpkd.ac.in'),(5328,303,17,2,'Diya F.','2003-03-05','F','diya.f.328@iitpkd.ac.in'),(5329,304,17,1,'Ehsan G.','2001-09-09','M','ehsan.g.329@iitpkd.ac.in'),(5330,305,17,2,'Falguni H.','2002-10-10','F','falguni.h.330@iitpkd.ac.in'),(5331,301,17,1,'Girish I.','2003-01-01','M','girish.i.331@iitpkd.ac.in'),(5332,302,17,2,'Hina J.','2002-02-02','F','hina.j.332@iitpkd.ac.in'),(5333,303,17,1,'Irfan K.','2004-03-03','M','irfan.k.333@iitpkd.ac.in'),(5334,304,17,2,'Jiya L.','2001-04-04','F','jiya.l.334@iitpkd.ac.in'),(5335,305,17,1,'Karan M.','2003-05-05','M','karan.m.335@iitpkd.ac.in'),(5336,301,17,2,'Lata N.','2002-06-06','F','lata.n.336@iitpkd.ac.in'),(5337,302,17,1,'Manish O.','2004-07-07','M','manish.o.337@iitpkd.ac.in'),(5338,303,17,2,'Neha P.','2001-08-08','F','neha.p.338@iitpkd.ac.in'),(5339,304,17,1,'Omkar Q.','2003-09-09','M','omkar.q.339@iitpkd.ac.in'),(5340,305,17,2,'Pooja R.','2002-10-10','F','pooja.r.340@iitpkd.ac.in'),(5341,1801,18,5,'Qasim S.','2003-07-25','M','qasim.s.341@iittp.ac.in'),(5342,1802,18,6,'Riya T.','2002-11-10','F','riya.t.342@iittp.ac.in'),(5343,1803,18,5,'Sagar U.','2004-01-01','M','sagar.u.343@iittp.ac.in'),(5344,1804,18,6,'Tanya V.','2001-05-30','F','tanya.v.344@iittp.ac.in'),(5345,1805,18,5,'Umesh W.','2003-08-15','M','umesh.w.345@iittp.ac.in'),(5346,1801,18,6,'Vani X.','2002-04-12','F','vani.x.346@iittp.ac.in'),(5347,1802,18,5,'Wasi Y.','2004-02-20','M','wasi.y.347@iittp.ac.in'),(5348,1803,18,6,'Xena Z.','2003-03-05','F','xena.z.348@iittp.ac.in'),(5349,1804,18,5,'Yash A.','2001-09-09','M','yash.a.349@iittp.ac.in'),(5350,1805,18,6,'Zoya B.','2002-10-10','F','zoya.b.350@iittp.ac.in'),(5351,1801,18,5,'Amit C.','2003-01-01','M','amit.c.351@iittp.ac.in'),(5352,1802,18,6,'Bela D.','2002-02-02','F','bela.d.352@iittp.ac.in'),(5353,1803,18,5,'Chirag E.','2004-03-03','M','chirag.e.353@iittp.ac.in'),(5354,1804,18,6,'Diya F.','2001-04-04','F','diya.f.354@iittp.ac.in'),(5355,1805,18,5,'Ehsan G.','2003-05-05','M','ehsan.g.355@iittp.ac.in'),(5356,1801,18,6,'Falguni H.','2002-06-06','F','falguni.h.356@iittp.ac.in'),(5357,1802,18,5,'Girish I.','2004-07-07','M','girish.i.357@iittp.ac.in'),(5358,1803,18,6,'Hina J.','2001-08-08','F','hina.j.358@iittp.ac.in'),(5359,1804,18,5,'Irfan K.','2003-09-09','M','irfan.k.359@iittp.ac.in'),(5360,1805,18,6,'Jiya L.','2002-10-10','F','jiya.l.360@iittp.ac.in'),(5361,801,19,3,'Karan M.','2003-07-25','M','karan.m.361@iitism.ac.in'),(5362,802,19,4,'Lata N.','2002-11-10','F','lata.n.362@iitism.ac.in'),(5363,803,19,3,'Manish O.','2004-01-01','M','manish.o.363@iitism.ac.in'),(5364,804,19,4,'Neha P.','2001-05-30','F','neha.p.364@iitism.ac.in'),(5365,805,19,3,'Omkar Q.','2003-08-15','M','omkar.q.365@iitism.ac.in'),(5366,801,19,4,'Pooja R.','2002-04-12','F','pooja.r.366@iitism.ac.in'),(5367,802,19,3,'Qasim S.','2004-02-20','M','qasim.s.367@iitism.ac.in'),(5368,803,19,4,'Riya T.','2003-03-05','F','riya.t.368@iitism.ac.in'),(5369,804,19,3,'Sagar U.','2001-09-09','M','sagar.u.369@iitism.ac.in'),(5370,805,19,4,'Tanya V.','2002-10-10','F','tanya.v.370@iitism.ac.in'),(5371,801,19,3,'Umesh W.','2003-01-01','M','umesh.w.371@iitism.ac.in'),(5372,802,19,4,'Vani X.','2002-02-02','F','vani.x.372@iitism.ac.in'),(5373,803,19,3,'Wasi Y.','2004-03-03','M','wasi.y.373@iitism.ac.in'),(5374,804,19,4,'Xena Z.','2001-04-04','F','xena.z.374@iitism.ac.in'),(5375,805,19,3,'Yash A.','2003-05-05','M','yash.a.375@iitism.ac.in'),(5376,801,19,4,'Zoya B.','2002-06-06','F','zoya.b.376@iitism.ac.in'),(5377,802,19,3,'Amit C.','2004-07-07','M','amit.c.377@iitism.ac.in'),(5378,803,19,4,'Bela D.','2001-08-08','F','bela.d.378@iitism.ac.in'),(5379,804,19,3,'Chirag E.','2003-09-09','M','chirag.e.379@iitism.ac.in'),(5380,805,19,4,'Diya F.','2002-10-10','F','diya.f.380@iitism.ac.in'),(5381,801,20,3,'Ehsan G.','2003-07-25','M','ehsan.g.381@iitbl.ac.in'),(5382,802,20,4,'Falguni H.','2002-11-10','F','falguni.h.382@iitbl.ac.in'),(5383,803,20,3,'Girish I.','2004-01-01','M','girish.i.383@iitbl.ac.in'),(5384,804,20,4,'Hina J.','2001-05-30','F','hina.j.384@iitbl.ac.in'),(5385,805,20,3,'Irfan K.','2003-08-15','M','irfan.k.385@iitbl.ac.in'),(5386,801,20,4,'Jiya L.','2002-04-12','F','jiya.l.386@iitbl.ac.in'),(5387,802,20,3,'Karan M.','2004-02-20','M','karan.m.387@iitbl.ac.in'),(5388,803,20,4,'Lata N.','2003-03-05','F','lata.n.388@iitbl.ac.in'),(5389,804,20,3,'Manish O.','2001-09-09','M','manish.o.389@iitbl.ac.in'),(5390,805,20,4,'Neha P.','2002-10-10','F','neha.p.390@iitbl.ac.in'),(5391,801,20,3,'Omkar Q.','2003-01-01','M','omkar.q.391@iitbl.ac.in'),(5392,802,20,4,'Pooja R.','2002-02-02','F','pooja.r.392@iitbl.ac.in'),(5393,803,20,3,'Qasim S.','2004-03-03','M','qasim.s.393@iitbl.ac.in'),(5394,804,20,4,'Riya T.','2001-04-04','F','riya.t.394@iitbl.ac.in'),(5395,805,20,3,'Sagar U.','2003-05-05','M','sagar.u.395@iitbl.ac.in'),(5396,801,20,4,'Tanya V.','2002-06-06','F','tanya.v.396@iitbl.ac.in'),(5397,802,20,3,'Umesh W.','2004-07-07','M','umesh.w.397@iitbl.ac.in'),(5398,803,20,4,'Vani X.','2001-08-08','F','vani.x.398@iitbl.ac.in'),(5399,804,20,3,'Wasi Y.','2003-09-09','M','wasi.y.399@iitbl.ac.in'),(5400,805,20,4,'Xena Z.','2002-10-10','F','xena.z.400@iitbl.ac.in'),(5401,1801,21,5,'Yash A.','2003-07-25','M','yash.a.401@iitgoa.ac.in'),(5402,1802,21,6,'Zoya B.','2002-11-10','F','zoya.b.402@iitgoa.ac.in'),(5403,1803,21,5,'Amit C.','2004-01-01','M','amit.c.403@iitgoa.ac.in'),(5404,1804,21,6,'Bela D.','2001-05-30','F','bela.d.404@iitgoa.ac.in'),(5405,1805,21,5,'Chirag E.','2003-08-15','M','chirag.e.405@iitgoa.ac.in'),(5406,1801,21,6,'Diya F.','2002-04-12','F','diya.f.406@iitgoa.ac.in'),(5407,1802,21,5,'Ehsan G.','2004-02-20','M','ehsan.g.407@iitgoa.ac.in'),(5408,1803,21,6,'Falguni H.','2003-03-05','F','falguni.h.408@iitgoa.ac.in'),(5409,1804,21,5,'Girish I.','2001-09-09','M','girish.i.409@iitgoa.ac.in'),(5410,1805,21,6,'Hina J.','2002-10-10','F','hina.j.410@iitgoa.ac.in'),(5411,1801,21,5,'Irfan K.','2003-01-01','M','irfan.k.411@iitgoa.ac.in'),(5412,1802,21,6,'Jiya L.','2002-02-02','F','jiya.l.412@iitgoa.ac.in'),(5413,1803,21,5,'Karan M.','2004-03-03','M','karan.m.413@iitgoa.ac.in'),(5414,1804,21,6,'Lata N.','2001-04-04','F','lata.n.414@iitgoa.ac.in'),(5415,1805,21,5,'Manish O.','2003-05-05','M','manish.o.415@iitgoa.ac.in'),(5416,1801,21,6,'Neha P.','2002-06-06','F','neha.p.416@iitgoa.ac.in'),(5417,1802,21,5,'Omkar Q.','2004-07-07','M','omkar.q.417@iitgoa.ac.in'),(5418,1803,21,6,'Pooja R.','2001-08-08','F','pooja.r.418@iitgoa.ac.in'),(5419,1804,21,5,'Qasim S.','2003-09-09','M','qasim.s.419@iitgoa.ac.in'),(5420,1805,21,6,'Riya T.','2002-10-10','F','riya.t.420@iitgoa.ac.in'),(5421,301,22,1,'Sagar U.','2003-07-25','M','sagar.u.421@iitjmu.ac.in'),(5422,302,22,2,'Tanya V.','2002-11-10','F','tanya.v.422@iitjmu.ac.in'),(5423,303,22,1,'Umesh W.','2004-01-01','M','umesh.w.423@iitjmu.ac.in'),(5424,304,22,2,'Vani X.','2001-05-30','F','vani.x.424@iitjmu.ac.in'),(5425,305,22,1,'Wasi Y.','2003-08-15','M','wasi.y.425@iitjmu.ac.in'),(5426,301,22,2,'Xena Z.','2002-04-12','F','xena.z.426@iitjmu.ac.in'),(5427,302,22,1,'Yash A.','2004-02-20','M','yash.a.427@iitjmu.ac.in'),(5428,303,22,2,'Zoya B.','2003-03-05','F','zoya.b.428@iitjmu.ac.in'),(5429,304,22,1,'Amit C.','2001-09-09','M','amit.c.429@iitjmu.ac.in'),(5430,305,22,2,'Bela D.','2002-10-10','F','bela.d.430@iitjmu.ac.in'),(5431,301,22,1,'Chirag E.','2003-01-01','M','chirag.e.431@iitjmu.ac.in'),(5432,302,22,2,'Diya F.','2002-02-02','F','diya.f.432@iitjmu.ac.in'),(5433,303,22,1,'Ehsan G.','2004-03-03','M','ehsan.g.433@iitjmu.ac.in'),(5434,304,22,2,'Falguni H.','2001-04-04','F','falguni.h.434@iitjmu.ac.in'),(5435,305,22,1,'Girish I.','2003-05-05','M','girish.i.435@iitjmu.ac.in'),(5436,301,22,2,'Hina J.','2002-06-06','F','hina.j.436@iitjmu.ac.in'),(5437,302,22,1,'Irfan K.','2004-07-07','M','irfan.k.437@iitjmu.ac.in'),(5438,303,22,2,'Jiya L.','2001-08-08','F','jiya.l.438@iitjmu.ac.in'),(5439,304,22,1,'Karan M.','2003-09-09','M','karan.m.439@iitjmu.ac.in'),(5440,305,22,2,'Lata N.','2002-10-10','F','lata.n.440@iitjmu.ac.in'),(5441,1801,23,5,'Manish O.','2003-07-25','M','manish.o.441@iitdh.ac.in'),(5442,1802,23,6,'Neha P.','2002-11-10','F','neha.p.442@iitdh.ac.in'),(5443,1803,23,5,'Omkar Q.','2004-01-01','M','omkar.q.443@iitdh.ac.in'),(5444,1804,23,6,'Pooja R.','2001-05-30','F','pooja.r.444@iitdh.ac.in'),(5445,1805,23,5,'Qasim S.','2003-08-15','M','qasim.s.445@iitdh.ac.in'),(5446,1801,23,6,'Riya T.','2002-04-12','F','riya.t.446@iitdh.ac.in'),(5447,1802,23,5,'Sagar U.','2004-02-20','M','sagar.u.447@iitdh.ac.in'),(5448,1803,23,6,'Tanya V.','2003-03-05','F','tanya.v.448@iitdh.ac.in'),(5449,1804,23,5,'Umesh W.','2001-09-09','M','umesh.w.449@iitdh.ac.in'),(5450,1805,23,6,'Vani X.','2002-10-10','F','vani.x.450@iitdh.ac.in'),(5451,1801,23,5,'Wasi Y.','2003-01-01','M','wasi.y.451@iitdh.ac.in'),(5452,1802,23,6,'Xena Z.','2002-02-02','F','xena.z.452@iitdh.ac.in'),(5453,1803,23,5,'Yash A.','2004-03-03','M','yash.a.453@iitdh.ac.in'),(5454,1804,23,6,'Zoya B.','2001-04-04','F','zoya.b.454@iitdh.ac.in'),(5455,1805,23,5,'Amit C.','2003-05-05','M','amit.c.455@iitdh.ac.in'),(5456,1801,23,6,'Bela D.','2002-06-06','F','bela.d.456@iitdh.ac.in'),(5457,1802,23,5,'Chirag E.','2004-07-07','M','chirag.e.457@iitdh.ac.in'),(5458,1803,23,6,'Diya F.','2001-08-08','F','diya.f.458@iitdh.ac.in'),(5459,1804,23,5,'Ehsan G.','2003-09-09','M','ehsan.g.459@iitdh.ac.in'),(5460,1805,23,6,'Falguni H.','2002-10-10','F','falguni.h.460@iitdh.ac.in');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `Role_ID` int NOT NULL,
  `Role_Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Role_ID`),
  UNIQUE KEY `Role_Name` (`Role_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (4,'Admin Staff'),(2,'Coach'),(5,'Logistics Staff'),(6,'Other'),(3,'Referee/Official'),(1,'Sports Officer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports` (
  `Sport_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Type` varchar(50) NOT NULL,
  PRIMARY KEY (`Sport_ID`),
  CONSTRAINT `sports_chk_1` CHECK ((`Type` in (_utf8mb4'Individual',_utf8mb4'Team')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'Cricket','Team'),(2,'Football','Team'),(3,'Basketball','Team'),(4,'Volleyball','Team'),(5,'Tennis (Team Event)','Team'),(6,'Squash (Team Event)','Team'),(7,'Table Tennis (Team Event)','Team'),(8,'Athletics (Relay)','Team'),(9,'Chess (Team)','Team'),(10,'Badminton (Team Championship)','Team'),(11,'Badminton (Men\'s Doubles)','Team'),(12,'Badminton (Women\'s Doubles)','Team'),(13,'Badminton (Mixed Doubles)','Team'),(14,'Athletics (100m)','Individual'),(15,'Athletics (300m)','Individual'),(16,'Athletics (600m)','Individual'),(17,'Badminton (Men\'s Singles)','Individual'),(18,'Badminton (Women\'s Singles)','Individual'),(19,'Squash (Singles)','Individual'),(20,'Tennis (Singles)','Individual'),(21,'Table Tennis (Singles)','Individual'),(22,'Weightlifting','Individual'),(23,'Swimming (Individual)','Individual'),(24,'Athletics (Javelin)','Individual');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `Staff_ID` int NOT NULL,
  `Role_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Date_of_Birth` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Staff_ID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Phone` (`Phone`),
  KEY `Role_ID` (`Role_ID`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `roles` (`Role_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (101,1,'Suresh Kumar','1980-05-15','suresh.k@iitm.ac.in','9811100001'),(102,3,'Ravi Singh','1975-10-20','ravi.s@officials.com','9822200002'),(103,2,'Anu Reddy','1990-01-01','anu.reddy@coach.com','9833300003'),(104,4,'Vikram Jain','1985-03-25','vikram.j@iitm.ac.in','9844400004'),(105,5,'Leena Das','1988-11-11','leena.d@iitm.ac.in','9855500005'),(106,6,'Deepak Patil','1995-04-01','deepak.p@iitm.ac.in','9866600006'),(107,1,'Geeta Verma','1978-12-05','geeta.v@iith.ac.in','9877700007'),(108,2,'Harish Mani','1982-06-17','harish.m@coach.com','9888800008'),(109,3,'Ina Khan','1972-09-22','ina.k@officials.com','9899900009'),(110,4,'Jatin Pal','1991-02-03','jatin.p@iith.ac.in','9810100010'),(111,5,'Kiran Bala','1987-08-14','kiran.b@iittp.ac.in','9811100011'),(112,6,'Lalit Sood','1994-10-29','lalit.s@iittp.ac.in','9812100012'),(113,1,'Mala Devi','1981-03-08','mala.d@iitm.ac.in','9813100013'),(114,2,'Nitin Rao','1983-07-19','nitin.r@coach.com','9814100014'),(115,3,'Om Prakash','1970-01-28','om.p@officials.com','9815100015'),(116,4,'Pooja Taneja','1992-04-10','pooja.t@iith.ac.in','9816100016'),(117,5,'Quasim Ali','1989-09-02','quasim.a@iith.ac.in','9817100017'),(118,6,'Rupa Nambiar','1996-11-23','rupa.n@iitm.ac.in','9818100018'),(119,1,'Samrat Ghosh','1979-05-15','samrat.g@iittp.ac.in','9819100019'),(120,2,'Tanya Singhal','1984-01-20','tanya.s@coach.com','9820100020'),(121,3,'Umesh Yadav','1973-06-11','umesh.y@officials.com','9821100021'),(122,4,'Vani Iyer','1990-08-27','vani.i@iitm.ac.in','9822100022'),(123,5,'Waseem Zaki','1986-12-09','waseem.z@iitm.ac.in','9823100023'),(124,6,'Xavier Dsilva','1993-02-18','xavier.d@iith.ac.in','9824100024'),(125,1,'Yusuf Pathan','1982-07-29','yusuf.p@iith.ac.in','9825100025'),(126,2,'Zoya Mirza','1985-05-01','zoya.m@coach.com','9826100026'),(127,3,'Aditya Singh','1974-10-16','aditya.s@officials.com','9827100027'),(128,4,'Bhavna Das','1991-03-31','bhavna.d@iittp.ac.in','9828100028'),(129,5,'Chirag Seth','1987-09-12','chirag.s@iittp.ac.in','9829100029'),(130,6,'Drishti Rana','1994-11-20','drishti.r@iitm.ac.in','9830100030'),(131,1,'Eshwar Rao','1980-04-04','eshwar.r@iitm.ac.in','9831100031'),(132,2,'Falguni Roy','1983-08-18','falguni.r@coach.com','9832100032'),(133,3,'Gopal Hegde','1971-02-07','gopal.h@officials.com','9833100033'),(134,4,'Hema Krishnan','1992-05-23','hema.k@iith.ac.in','9834100034'),(135,5,'Inderjit Gill','1988-10-06','inderjit.g@iith.ac.in','9835100035'),(136,6,'Jia Singh','1995-12-19','jia.s@iittp.ac.in','9836100036'),(137,1,'Kabir Bose','1981-06-25','kabir.b@iittp.ac.in','9837100037'),(138,2,'Lata Mehra','1984-03-10','lata.m@coach.com','9838100038'),(139,3,'Mohan Lal','1973-07-01','mohan.l@officials.com','9839100039'),(140,4,'Neelima Puri','1990-09-17','neelima.p@iitm.ac.in','9840100040'),(141,5,'Ojas Kulkarni','1986-01-29','ojas.k@iith.ac.in','9841100041'),(142,6,'Prabha Sahu','1993-04-11','prabha.s@iith.ac.in','9842100042'),(143,1,'Rajiv Menon','1977-11-04','rajiv.m@iittp.ac.in','9843100043'),(144,2,'Sonal Gupta','1988-05-21','sonal.g@coach.com','9844100044'),(145,3,'Tarun Meena','1976-08-03','tarun.m@officials.com','9845100045'),(146,4,'Usha Nair','1989-12-14','usha.n@iittp.ac.in','9846100046'),(147,5,'Vikas Yadav','1985-02-28','vikas.y@iittp.ac.in','9847100047'),(148,6,'Yamini Das','1994-06-16','yamini.d@iitm.ac.in','9848100048'),(149,1,'Zaid Qureshi','1983-09-07','zaid.q@iith.ac.in','9849100049'),(150,2,'Asha Bhosle','1987-10-23','asha.b@coach.com','9850100050'),(151,3,'Bala Murugan','1975-01-05','bala.m@officials.com','9851100051');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `Team_ID` int NOT NULL,
  `Participant_ID` int NOT NULL,
  `Role` varchar(50) NOT NULL,
  PRIMARY KEY (`Team_ID`,`Participant_ID`),
  KEY `Participant_ID` (`Participant_ID`),
  CONSTRAINT `team_members_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `teams` (`Team_ID`),
  CONSTRAINT `team_members_ibfk_2` FOREIGN KEY (`Participant_ID`) REFERENCES `participants` (`Participant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1001,5001,'Captain'),(1001,5003,'Player'),(1002,5021,'Captain'),(1002,5023,'Player'),(1003,5041,'Captain'),(1003,5043,'Player'),(1004,5061,'Captain'),(1004,5063,'Player'),(1005,5081,'Captain'),(1005,5083,'Player'),(1006,5101,'Captain'),(1006,5103,'Player'),(1007,5121,'Captain'),(1007,5123,'Player'),(1008,5141,'Captain'),(1008,5143,'Player'),(1009,5161,'Captain'),(1009,5163,'Player'),(1010,5181,'Captain'),(1010,5183,'Player'),(1011,5201,'Captain'),(1011,5203,'Player'),(1012,5221,'Captain'),(1012,5223,'Player'),(1013,5241,'Captain'),(1013,5243,'Player'),(1014,5261,'Captain'),(1014,5263,'Player'),(1015,5281,'Captain'),(1015,5283,'Player'),(1016,5301,'Captain'),(1016,5303,'Player'),(1017,5321,'Captain'),(1017,5323,'Player'),(1018,5341,'Captain'),(1018,5343,'Player'),(1019,5361,'Captain'),(1019,5363,'Player'),(1020,5381,'Captain'),(1020,5383,'Player'),(1021,5401,'Captain'),(1021,5403,'Player'),(1022,5421,'Captain'),(1022,5423,'Player'),(1023,5441,'Captain'),(1023,5443,'Player'),(1024,5005,'Captain'),(1024,5007,'Player'),(1025,5025,'Captain'),(1025,5027,'Player'),(1026,5045,'Captain'),(1026,5047,'Player'),(1027,5065,'Captain'),(1027,5067,'Player'),(1028,5085,'Captain'),(1028,5087,'Player'),(1029,5105,'Captain'),(1029,5107,'Player'),(1030,5125,'Captain'),(1030,5127,'Player'),(1031,5145,'Captain'),(1031,5147,'Player'),(1032,5165,'Captain'),(1032,5167,'Player'),(1033,5185,'Captain'),(1033,5187,'Player'),(1034,5205,'Captain'),(1034,5207,'Player'),(1035,5225,'Captain'),(1035,5227,'Player'),(1036,5245,'Captain'),(1036,5247,'Player'),(1037,5265,'Captain'),(1037,5267,'Player'),(1038,5285,'Captain'),(1038,5287,'Player'),(1039,5305,'Captain'),(1039,5307,'Player'),(1040,5325,'Captain'),(1040,5327,'Player'),(1041,5345,'Captain'),(1041,5347,'Player'),(1042,5365,'Captain'),(1042,5367,'Player'),(1043,5385,'Captain'),(1043,5387,'Player'),(1044,5405,'Captain'),(1044,5407,'Player'),(1045,5425,'Captain'),(1045,5427,'Player'),(1046,5445,'Captain'),(1046,5447,'Player'),(1047,5009,'Captain'),(1047,5011,'Player'),(1048,5029,'Captain'),(1048,5031,'Player'),(1049,5049,'Captain'),(1049,5051,'Player'),(1050,5069,'Captain'),(1050,5071,'Player'),(1051,5089,'Captain'),(1051,5091,'Player'),(1052,5109,'Captain'),(1052,5111,'Player'),(1053,5129,'Captain'),(1053,5131,'Player'),(1054,5149,'Captain'),(1054,5151,'Player'),(1055,5169,'Captain'),(1055,5171,'Player'),(1056,5189,'Captain'),(1056,5191,'Player'),(1057,5209,'Captain'),(1057,5211,'Player'),(1058,5229,'Captain'),(1058,5231,'Player'),(1059,5249,'Captain'),(1059,5251,'Player'),(1060,5269,'Captain'),(1060,5271,'Player'),(1061,5289,'Captain'),(1061,5291,'Player'),(1062,5309,'Captain'),(1062,5311,'Player'),(1063,5329,'Captain'),(1063,5331,'Player'),(1064,5349,'Captain'),(1064,5351,'Player'),(1065,5369,'Captain'),(1065,5371,'Player'),(1066,5389,'Captain'),(1066,5391,'Player'),(1067,5409,'Captain'),(1067,5411,'Player'),(1068,5429,'Captain'),(1068,5431,'Player'),(1069,5449,'Captain'),(1069,5451,'Player'),(1070,5013,'Captain'),(1070,5015,'Player'),(1071,5033,'Captain'),(1071,5035,'Player'),(1072,5053,'Captain'),(1072,5055,'Player'),(1073,5073,'Captain'),(1073,5075,'Player'),(1074,5093,'Captain'),(1074,5095,'Player'),(1075,5113,'Captain'),(1075,5115,'Player'),(1076,5133,'Captain'),(1076,5135,'Player'),(1077,5153,'Captain'),(1077,5155,'Player'),(1078,5173,'Captain'),(1078,5175,'Player'),(1079,5193,'Captain'),(1079,5195,'Player'),(1080,5213,'Captain'),(1080,5215,'Player'),(1081,5233,'Captain'),(1081,5235,'Player'),(1082,5253,'Captain'),(1082,5255,'Player'),(1083,5273,'Captain'),(1083,5275,'Player'),(1084,5293,'Captain'),(1084,5295,'Player'),(1085,5313,'Captain'),(1085,5315,'Player'),(1086,5333,'Captain'),(1086,5335,'Player'),(1087,5353,'Captain'),(1087,5355,'Player'),(1088,5373,'Captain'),(1088,5375,'Player'),(1089,5393,'Captain'),(1089,5395,'Player'),(1090,5413,'Captain'),(1090,5415,'Player'),(1091,5433,'Captain'),(1091,5435,'Player'),(1092,5453,'Captain'),(1092,5455,'Player'),(1093,5002,'Player'),(1093,5017,'Player'),(1094,5022,'Player'),(1094,5037,'Player'),(1095,5042,'Player'),(1095,5057,'Player'),(1096,5062,'Player'),(1096,5077,'Player'),(1097,5082,'Player'),(1097,5097,'Player'),(1098,5102,'Player'),(1098,5117,'Player'),(1099,5122,'Player'),(1099,5137,'Player'),(1100,5142,'Player'),(1100,5157,'Player'),(1101,5162,'Player'),(1101,5177,'Player'),(1102,5182,'Player'),(1102,5197,'Player'),(1103,5202,'Player'),(1103,5217,'Player'),(1104,5222,'Player'),(1104,5237,'Player'),(1105,5242,'Player'),(1105,5257,'Player'),(1106,5262,'Player'),(1106,5277,'Player'),(1107,5282,'Player'),(1107,5297,'Player'),(1108,5302,'Player'),(1108,5317,'Player'),(1109,5322,'Player'),(1109,5337,'Player'),(1110,5342,'Player'),(1110,5357,'Player'),(1111,5362,'Player'),(1111,5377,'Player'),(1112,5382,'Player'),(1112,5397,'Player'),(1113,5402,'Player'),(1113,5417,'Player'),(1114,5422,'Player'),(1114,5437,'Player'),(1115,5442,'Player'),(1115,5457,'Player');
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `Team_ID` int NOT NULL,
  `Institute_ID` int NOT NULL,
  `Event_ID` int NOT NULL,
  `Team_Name` varchar(100) NOT NULL,
  `Creation_Date` date NOT NULL,
  `Is_Active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Team_ID`),
  KEY `Institute_ID` (`Institute_ID`),
  KEY `Event_ID` (`Event_ID`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`Institute_ID`) REFERENCES `institutes` (`Institute_ID`),
  CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`Event_ID`) REFERENCES `events` (`Event_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1001,1,101,'IITB Cricket XI','2025-09-15',1),(1002,2,101,'IITD Cricket XI','2025-09-15',1),(1003,3,101,'IITM Cricket XI','2025-09-15',1),(1004,4,101,'IITKgp Cricket XI','2025-09-15',1),(1005,5,101,'IITK Cricket XI','2025-09-15',1),(1006,6,101,'IITR Cricket XI','2025-09-15',1),(1007,7,101,'IITG Cricket XI','2025-09-15',1),(1008,8,101,'IITH Cricket XI','2025-09-15',1),(1009,9,101,'IITP Cricket XI','2025-09-15',1),(1010,10,101,'IITBBS Cricket XI','2025-09-15',1),(1011,11,101,'IITGn Cricket XI','2025-09-15',1),(1012,12,101,'IITI Cricket XI','2025-09-15',1),(1013,13,101,'IITRpr Cricket XI','2025-09-15',1),(1014,14,101,'IITMandi Cricket XI','2025-09-15',1),(1015,15,101,'IITJ Cricket XI','2025-09-15',1),(1016,16,101,'IITBHU Cricket XI','2025-09-15',1),(1017,17,101,'IITPKD Cricket XI','2025-09-15',1),(1018,18,101,'IITTP Cricket XI','2025-09-15',1),(1019,19,101,'IITISM Cricket XI','2025-09-15',1),(1020,20,101,'IITBl Cricket XI','2025-09-15',1),(1021,21,101,'IITGoa Cricket XI','2025-09-15',1),(1022,22,101,'IITJmu Cricket XI','2025-09-15',1),(1023,23,101,'IITDh Cricket XI','2025-09-15',1),(1024,1,102,'IITB Football Squad','2025-09-15',1),(1025,2,102,'IITD Football Squad','2025-09-15',1),(1026,3,102,'IITM Football Squad','2025-09-15',1),(1027,4,102,'IITKgp Football Squad','2025-09-15',1),(1028,5,102,'IITK Football Squad','2025-09-15',1),(1029,6,102,'IITR Football Squad','2025-09-15',1),(1030,7,102,'IITG Football Squad','2025-09-15',1),(1031,8,102,'IITH Football Squad','2025-09-15',1),(1032,9,102,'IITP Football Squad','2025-09-15',1),(1033,10,102,'IITBBS Football Squad','2025-09-15',1),(1034,11,102,'IITGn Football Squad','2025-09-15',1),(1035,12,102,'IITI Football Squad','2025-09-15',1),(1036,13,102,'IITRpr Football Squad','2025-09-15',1),(1037,14,102,'IITMandi Football Squad','2025-09-15',1),(1038,15,102,'IITJ Football Squad','2025-09-15',1),(1039,16,102,'IITBHU Football Squad','2025-09-15',1),(1040,17,102,'IITPKD Football Squad','2025-09-15',1),(1041,18,102,'IITTP Football Squad','2025-09-15',1),(1042,19,102,'IITISM Football Squad','2025-09-15',1),(1043,20,102,'IITBl Football Squad','2025-09-15',1),(1044,21,102,'IITGoa Football Squad','2025-09-15',1),(1045,22,102,'IITJmu Football Squad','2025-09-15',1),(1046,23,102,'IITDh Football Squad','2025-09-15',1),(1047,1,103,'IITB Basketball Men','2025-09-15',1),(1048,2,103,'IITD Basketball Men','2025-09-15',1),(1049,3,103,'IITM Basketball Men','2025-09-15',1),(1050,4,103,'IITKgp Basketball Men','2025-09-15',1),(1051,5,103,'IITK Basketball Men','2025-09-15',1),(1052,6,103,'IITR Basketball Men','2025-09-15',1),(1053,7,103,'IITG Basketball Men','2025-09-15',1),(1054,8,103,'IITH Basketball Men','2025-09-15',1),(1055,9,103,'IITP Basketball Men','2025-09-15',1),(1056,10,103,'IITBBS Basketball Men','2025-09-15',1),(1057,11,103,'IITGn Basketball Men','2025-09-15',1),(1058,12,103,'IITI Basketball Men','2025-09-15',1),(1059,13,103,'IITRpr Basketball Men','2025-09-15',1),(1060,14,103,'IITMandi Basketball Men','2025-09-15',1),(1061,15,103,'IITJ Basketball Men','2025-09-15',1),(1062,16,103,'IITBHU Basketball Men','2025-09-15',1),(1063,17,103,'IITPKD Basketball Men','2025-09-15',1),(1064,18,103,'IITTP Basketball Men','2025-09-15',1),(1065,19,103,'IITISM Basketball Men','2025-09-15',1),(1066,20,103,'IITBl Basketball Men','2025-09-15',1),(1067,21,103,'IITGoa Basketball Men','2025-09-15',1),(1068,22,103,'IITJmu Basketball Men','2025-09-15',1),(1069,23,103,'IITDh Basketball Men','2025-09-15',1),(1070,1,105,'IITB Volleyball Men','2025-09-15',1),(1071,2,105,'IITD Volleyball Men','2025-09-15',1),(1072,3,105,'IITM Volleyball Men','2025-09-15',1),(1073,4,105,'IITKgp Volleyball Men','2025-09-15',1),(1074,5,105,'IITK Volleyball Men','2025-09-15',1),(1075,6,105,'IITR Volleyball Men','2025-09-15',1),(1076,7,105,'IITG Volleyball Men','2025-09-15',1),(1077,8,105,'IITH Volleyball Men','2025-09-15',1),(1078,9,105,'IITP Volleyball Men','2025-09-15',1),(1079,10,105,'IITBBS Volleyball Men','2025-09-15',1),(1080,11,105,'IITGn Volleyball Men','2025-09-15',1),(1081,12,105,'IITI Volleyball Men','2025-09-15',1),(1082,13,105,'IITRpr Volleyball Men','2025-09-15',1),(1083,14,105,'IITMandi Volleyball Men','2025-09-15',1),(1084,15,105,'IITJ Volleyball Men','2025-09-15',1),(1085,16,105,'IITBHU Volleyball Men','2025-09-15',1),(1086,17,105,'IITPKD Volleyball Men','2025-09-15',1),(1087,18,105,'IITTP Volleyball Men','2025-09-15',1),(1088,19,105,'IITISM Volleyball Men','2025-09-15',1),(1089,20,105,'IITBl Volleyball Men','2025-09-15',1),(1090,21,105,'IITGoa Volleyball Men','2025-09-15',1),(1091,22,105,'IITJmu Volleyball Men','2025-09-15',1),(1092,23,105,'IITDh Volleyball Men','2025-09-15',1),(1093,1,113,'IITB Badminton Mixed','2025-09-15',1),(1094,2,113,'IITD Badminton Mixed','2025-09-15',1),(1095,3,113,'IITM Badminton Mixed','2025-09-15',1),(1096,4,113,'IITKgp Badminton Mixed','2025-09-15',1),(1097,5,113,'IITK Badminton Mixed','2025-09-15',1),(1098,6,113,'IITR Badminton Mixed','2025-09-15',1),(1099,7,113,'IITG Badminton Mixed','2025-09-15',1),(1100,8,113,'IITH Badminton Mixed','2025-09-15',1),(1101,9,113,'IITP Badminton Mixed','2025-09-15',1),(1102,10,113,'IITBBS Badminton Mixed','2025-09-15',1),(1103,11,113,'IITGn Badminton Mixed','2025-09-15',1),(1104,12,113,'IITI Badminton Mixed','2025-09-15',1),(1105,13,113,'IITRpr Badminton Mixed','2025-09-15',1),(1106,14,113,'IITMandi Badminton Mixed','2025-09-15',1),(1107,15,113,'IITJ Badminton Mixed','2025-09-15',1),(1108,16,113,'IITBHU Badminton Mixed','2025-09-15',1),(1109,17,113,'IITPKD Badminton Mixed','2025-09-15',1),(1110,18,113,'IITTP Badminton Mixed','2025-09-15',1),(1111,19,113,'IITISM Badminton Mixed','2025-09-15',1),(1112,20,113,'IITBl Badminton Mixed','2025-09-15',1),(1113,21,113,'IITGoa Badminton Mixed','2025-09-15',1),(1114,22,113,'IITJmu Badminton Mixed','2025-09-15',1),(1115,23,113,'IITDh Badminton Mixed','2025-09-15',1);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_routes`
--

DROP TABLE IF EXISTS `transport_routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_routes` (
  `Route_ID` int NOT NULL,
  `Route_Name` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Route_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_routes`
--

LOCK TABLES `transport_routes` WRITE;
/*!40000 ALTER TABLE `transport_routes` DISABLE KEYS */;
INSERT INTO `transport_routes` VALUES (1,'Airport Main Arrival','Primary route for team pick-up from the host city\'s main airport (Day 1).'),(2,'Railway Station Pickup','Route for teams arriving via major railway junctions.'),(3,'Central Bus Stand Pickup','Route for teams arriving via state/private bus terminals.'),(4,'Hostel Zone to Main Stadium','Dedicated morning shuttle for matches and practice at the main venue.'),(5,'Stadium to Hostel Zone','Dedicated evening shuttle bringing participants back to their accommodation.'),(6,'Emergency Hospital Access','Clear, pre-planned route to the nearest major hospital.'),(7,'VIP/Official Guest Circuit','Route for ferrying special guests, deans, directors, and official delegates.'),(8,'Secondary Venue Transfer (North)','Route to remote practice grounds or secondary competition venues (North side of campus).'),(9,'Secondary Venue Transfer (South)','Route to remote practice grounds or secondary competition venues (South side of campus).'),(10,'Equipment Transfer Circuit','Campus internal route for moving large sports equipment (e.g., cricket nets, goalposts).'),(11,'Referee and Official Transfer','Dedicated route for transporting match officials between smaller, dispersed venues.'),(12,'Late Night Security Patrol','Route for security staff during night hours across campus areas.'),(13,'Campus Perimeter Logistics','Route for logistics staff handling external supplies and large deliveries.'),(14,'Main Gate to Admin Block','Short route for day-to-day administrative and coordination meetings.'),(15,'Inter-Hostel Food Supply','Route for transporting extra food supplies or special catering between messes.'),(16,'Team Check-Out Route','Route used for dropping off departing teams at the airport/station (End of Event).'),(17,'Medical Staff Shuttles','Route for medical and physiotherapy staff moving between the main stadium and hostels.'),(18,'Media/Press Transfer','Dedicated route for transporting accredited media personnel to venues.'),(19,'Water/Refreshment Supply','Internal route for quick movement of water tankers and beverage supplies.'),(20,'Security Holding Area Transfer','Route for transferring personnel/participants to/from the security holding area (if needed).');
/*!40000 ALTER TABLE `transport_routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_schedules`
--

DROP TABLE IF EXISTS `transport_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_schedules` (
  `Schedule_ID` int NOT NULL,
  `Staff_ID` int NOT NULL,
  `Route_ID` int NOT NULL,
  `Vehicle_ID` int NOT NULL,
  `Departure_time` datetime NOT NULL,
  PRIMARY KEY (`Schedule_ID`),
  KEY `Staff_ID` (`Staff_ID`),
  KEY `Route_ID` (`Route_ID`),
  KEY `Vehicle_ID` (`Vehicle_ID`),
  CONSTRAINT `transport_schedules_ibfk_1` FOREIGN KEY (`Staff_ID`) REFERENCES `staff` (`Staff_ID`),
  CONSTRAINT `transport_schedules_ibfk_2` FOREIGN KEY (`Route_ID`) REFERENCES `transport_routes` (`Route_ID`),
  CONSTRAINT `transport_schedules_ibfk_3` FOREIGN KEY (`Vehicle_ID`) REFERENCES `transport_vehicles` (`Vehicle_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_schedules`
--

LOCK TABLES `transport_schedules` WRITE;
/*!40000 ALTER TABLE `transport_schedules` DISABLE KEYS */;
INSERT INTO `transport_schedules` VALUES (1,105,1,50,'2025-11-04 10:00:00'),(2,117,1,51,'2025-11-04 11:30:00'),(3,147,2,52,'2025-11-04 12:00:00'),(4,147,4,53,'2025-11-05 07:00:00'),(5,105,4,54,'2025-11-05 07:15:00'),(6,117,5,55,'2025-11-05 18:00:00'),(7,147,5,56,'2025-11-05 18:15:00'),(8,105,6,58,'2025-11-05 09:30:00'),(9,117,7,60,'2025-11-05 15:00:00'),(10,147,8,62,'2025-11-05 10:00:00'),(11,105,9,64,'2025-11-05 10:30:00'),(12,117,10,66,'2025-11-05 11:00:00'),(13,147,11,68,'2025-11-05 13:00:00'),(14,105,12,70,'2025-11-05 21:00:00'),(15,117,14,71,'2025-11-05 09:00:00'),(16,147,4,53,'2025-11-06 07:00:00'),(17,105,4,54,'2025-11-06 07:15:00'),(18,117,5,55,'2025-11-06 18:00:00'),(19,147,5,56,'2025-11-06 18:15:00'),(20,105,11,68,'2025-11-06 13:00:00'),(21,117,11,69,'2025-11-06 13:30:00'),(22,147,17,72,'2025-11-06 08:30:00'),(23,105,18,73,'2025-11-06 12:00:00'),(24,117,19,66,'2025-11-06 14:00:00'),(25,147,3,52,'2025-11-04 14:30:00'),(26,105,16,50,'2025-11-07 16:00:00'),(27,117,16,51,'2025-11-07 17:30:00'),(28,147,7,61,'2025-11-05 14:00:00'),(29,105,13,70,'2025-11-06 11:00:00'),(30,117,15,67,'2025-11-05 17:00:00');
/*!40000 ALTER TABLE `transport_schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_vehicles`
--

DROP TABLE IF EXISTS `transport_vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_vehicles` (
  `Vehicle_ID` int NOT NULL,
  `Route_ID` int NOT NULL,
  `Vehicle_Name` varchar(100) NOT NULL,
  `License_plate` varchar(20) NOT NULL,
  `Capacity` int NOT NULL,
  PRIMARY KEY (`Vehicle_ID`),
  UNIQUE KEY `License_plate` (`License_plate`),
  KEY `Route_ID` (`Route_ID`),
  CONSTRAINT `transport_vehicles_ibfk_1` FOREIGN KEY (`Route_ID`) REFERENCES `transport_routes` (`Route_ID`),
  CONSTRAINT `transport_vehicles_chk_1` CHECK ((`Capacity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_vehicles`
--

LOCK TABLES `transport_vehicles` WRITE;
/*!40000 ALTER TABLE `transport_vehicles` DISABLE KEYS */;
INSERT INTO `transport_vehicles` VALUES (50,1,'Large Bus 1','TN01AA5000',50),(51,1,'Large Bus 2','AP01BB5001',50),(52,2,'Mini Bus 1','TS05CC5002',25),(53,4,'Mini Bus 2','TN04DD5003',25),(54,4,'Mini Bus 3','AP05EE5004',25),(55,5,'Mini Bus 4','TS06FF5005',25),(56,5,'Mini Bus 5','TN07GG5006',25),(57,5,'Mini Bus 6','AP08HH5007',25),(58,6,'Ambulance 1','TS09II5008',4),(59,6,'Ambulance 2','TN10JJ5009',4),(60,7,'Luxury Sedan 1','AP11KK5010',4),(61,7,'Luxury Sedan 2','TS12LL5011',4),(62,8,'Van A (North)','TN13MM5012',12),(63,8,'Van B (North)','AP14NN5013',12),(64,9,'Van C (South)','TS15OO5014',12),(65,9,'Van D (South)','TN16PP5015',12),(66,10,'Pickup Truck 1','AP17QQ5016',3),(67,10,'Pickup Truck 2','TS18RR5017',3),(68,11,'Minivan A (Referees)','TN19SS5018',7),(69,11,'Minivan B (Referees)','AP20TT5019',7),(70,13,'Staff Car 1','TS21UU5020',5),(71,13,'Staff Car 2','TN22VV5021',5),(72,17,'Medical Van','AP23WW5022',8),(73,18,'Media Van 1','TS24XX5023',9),(74,18,'Media Van 2','TN25YY5024',9);
/*!40000 ALTER TABLE `transport_vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue_timeslots`
--

DROP TABLE IF EXISTS `venue_timeslots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue_timeslots` (
  `Slot_ID` int NOT NULL,
  `Venue_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Time_Slot` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  PRIMARY KEY (`Slot_ID`),
  UNIQUE KEY `Venue_ID` (`Venue_ID`,`Date`,`Time_Slot`),
  CONSTRAINT `venue_timeslots_ibfk_1` FOREIGN KEY (`Venue_ID`) REFERENCES `venues` (`Venue_ID`),
  CONSTRAINT `venue_timeslots_chk_1` CHECK ((`Status` in (_utf8mb4'Available',_utf8mb4'Booked',_utf8mb4'Maintenance')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue_timeslots`
--

LOCK TABLES `venue_timeslots` WRITE;
/*!40000 ALTER TABLE `venue_timeslots` DISABLE KEYS */;
INSERT INTO `venue_timeslots` VALUES (1,1,'2025-11-05','08:00-13:00','Booked'),(2,1,'2025-11-05','14:00-18:00','Booked'),(3,2,'2025-11-05','08:00-13:00','Booked'),(4,2,'2025-11-05','14:00-18:00','Booked'),(5,3,'2025-11-05','07:00-11:00','Booked'),(6,3,'2025-11-05','16:00-20:00','Booked'),(7,4,'2025-11-05','07:00-10:00','Booked'),(8,4,'2025-11-05','11:00-14:00','Available'),(9,8,'2025-11-05','09:00-12:00','Booked'),(10,8,'2025-11-05','18:00-21:00','Available'),(11,9,'2025-11-05','08:00-10:00','Booked'),(12,9,'2025-11-05','19:00-22:00','Available'),(13,10,'2025-11-05','09:00-12:00','Booked'),(14,10,'2025-11-05','13:00-16:00','Available'),(15,11,'2025-11-05','09:00-12:00','Booked'),(16,11,'2025-11-05','16:00-19:00','Booked'),(17,12,'2025-11-05','11:00-13:00','Booked'),(18,12,'2025-11-05','16:00-19:00','Booked'),(19,15,'2025-11-05','10:00-12:00','Booked'),(20,15,'2025-11-05','15:00-17:00','Available'),(21,16,'2025-11-05','11:00-13:00','Booked'),(22,16,'2025-11-05','17:00-19:00','Booked'),(23,17,'2025-11-05','10:00-13:00','Booked'),(24,17,'2025-11-05','14:00-17:00','Available'),(25,7,'2025-11-05','09:00-12:00','Booked'),(26,7,'2025-11-05','14:00-17:00','Booked'),(27,5,'2025-11-05','10:00-14:00','Maintenance'),(28,5,'2025-11-05','15:00-18:00','Available'),(29,6,'2025-11-05','09:00-13:00','Available'),(30,6,'2025-11-05','14:00-18:00','Booked'),(31,1,'2025-11-06','08:00-13:00','Booked'),(32,1,'2025-11-06','14:00-18:00','Available'),(33,2,'2025-11-06','08:00-13:00','Booked'),(34,2,'2025-11-06','14:00-18:00','Available'),(35,3,'2025-11-06','07:00-11:00','Booked'),(36,3,'2025-11-06','16:00-20:00','Available'),(37,4,'2025-11-06','07:00-10:00','Booked'),(38,4,'2025-11-06','11:00-14:00','Available'),(39,8,'2025-11-06','09:00-12:00','Booked'),(40,8,'2025-11-06','18:00-21:00','Booked'),(41,9,'2025-11-06','08:00-10:00','Booked'),(42,9,'2025-11-06','19:00-22:00','Booked'),(43,10,'2025-11-06','09:00-12:00','Booked'),(44,10,'2025-11-06','13:00-16:00','Booked'),(45,11,'2025-11-06','09:00-12:00','Booked'),(46,11,'2025-11-06','16:00-19:00','Booked'),(47,12,'2025-11-06','11:00-13:00','Booked'),(48,12,'2025-11-06','16:00-19:00','Booked'),(49,15,'2025-11-06','10:00-12:00','Booked'),(50,15,'2025-11-06','15:00-17:00','Booked'),(51,16,'2025-11-06','11:00-13:00','Booked'),(52,16,'2025-11-06','17:00-19:00','Booked'),(53,17,'2025-11-06','10:00-13:00','Booked'),(54,17,'2025-11-06','14:00-17:00','Booked'),(55,7,'2025-11-06','09:00-12:00','Booked'),(56,7,'2025-11-06','14:00-17:00','Available'),(57,18,'2025-11-05','19:00-22:00','Booked'),(58,18,'2025-11-06','19:00-22:00','Available'),(59,19,'2025-11-05','08:00-18:00','Available'),(60,19,'2025-11-06','08:00-18:00','Available');
/*!40000 ALTER TABLE `venue_timeslots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venues`
--

DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venues` (
  `Venue_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Venue_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venues`
--

LOCK TABLES `venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
INSERT INTO `venues` VALUES (1,'Main Cricket Ground','IITM Sports Complex, Oval Field'),(2,'Football Field A','IITM Sports Complex, Northern Side'),(3,'Athletics Track (400m)','IITM Main Stadium Complex'),(4,'Swimming Pool (50m)','IITM Aquatic Center'),(5,'Primary Multi-Sport Hall','IITM Indoor Arena'),(6,'Throwing Events Field','IITM Stadium Adjacent Field'),(7,'Badminton Hall (IITM)','IITM Indoor Arena (Auxiliary)'),(8,'Main Basketball Court','IITH Indoor Sports Center'),(9,'Main Volleyball Court','IITH Outdoor Court Area'),(10,'Tennis Court 1','IITH Tennis Enclosure'),(11,'Tennis Court 2','IITH Tennis Enclosure'),(12,'Table Tennis Hall','IITH Indoor Complex'),(13,'Multipurpose Court B','IITH South Campus'),(14,'Gymnasium Annex Hall','IITH Gymnasium Building'),(15,'Squash Court 1','IITTP Squash Complex'),(16,'Squash Court 2','IITTP Squash Complex'),(17,'Weightlifting & TT Annex','IITTP Gymnasium Building'),(18,'Chess & Board Game Room','IITTP Student Activity Center'),(19,'Emergency Medical Post','IITTP Central Clinic Annex'),(20,'Auxiliary Sports Field','IITTP Northern Field');
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-05 20:43:55



ALTER TABLE equipment_checkouts MODIFY Checkout_ID INT NOT NULL AUTO_INCREMENT;


-- STEP 1: DROP ALL DEPENDENT FOREIGN KEY CONSTRAINTS

ALTER TABLE Team_Members
DROP FOREIGN KEY team_members_ibfk_2;

ALTER TABLE Event_Registrations
DROP FOREIGN KEY event_registrations_ibfk_1;

ALTER TABLE Match_Outcomes
DROP FOREIGN KEY match_outcomes_ibfk_3;

ALTER TABLE Match_Outcomes
DROP FOREIGN KEY match_outcomes_ibfk_4;

ALTER TABLE Match_Competitors
DROP FOREIGN KEY match_competitors_ibfk_3;

ALTER TABLE Incident_Reports
DROP FOREIGN KEY incident_reports_ibfk_1;

ALTER TABLE Financial_Transactions
DROP FOREIGN KEY financial_transactions_ibfk_1;


-- STEP 2: MODIFY COLUMN TO ADD AUTO_INCREMENT

ALTER TABLE Participants
MODIFY COLUMN Participant_ID INT NOT NULL AUTO_INCREMENT;


-- STEP 3: RE-ADD ALL DROPPED FOREIGN KEY CONSTRAINTS

ALTER TABLE Team_Members
ADD CONSTRAINT fk_tm_participant
FOREIGN KEY (Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Event_Registrations
ADD CONSTRAINT fk_er_participant
FOREIGN KEY (Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Match_Outcomes
ADD CONSTRAINT fk_mo_winner
FOREIGN KEY (Winning_Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Match_Outcomes
ADD CONSTRAINT fk_mo_mvp
FOREIGN KEY (MVP_Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Match_Competitors
ADD CONSTRAINT fk_mc_participant
FOREIGN KEY (Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Incident_Reports
ADD CONSTRAINT fk_ir_participant
FOREIGN KEY (Participant_ID) REFERENCES Participants(Participant_ID);

ALTER TABLE Financial_Transactions
ADD CONSTRAINT fk_ft_participant
FOREIGN KEY (Participant_ID) REFERENCES Participants(Participant_ID);



