-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 16, 2019 at 01:38 PM
-- Server version: 5.7.23
-- PHP Version: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `krds`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_title` varchar(100) DEFAULT NULL,
  `isbn_number` varchar(100) DEFAULT NULL,
  `image` text,
  `description` text,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_title`, `isbn_number`, `image`, `description`, `created_by`, `created_at`, `updated_by`, `updated_at`, `status`) VALUES
(1, 'I still about you11', '123456', NULL, 'description11', 1, '2019-11-15 04:02:26', NULL, '2019-11-15 09:32:26', 1),
(2, 'Nothing', '000000', NULL, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 2, '2019-11-15 04:02:26', NULL, '2019-11-15 09:32:26', 1),
(5, 'Test Wit book', '111111111222', 'Test Wit book.jpeg', NULL, 1, '2019-11-16 06:18:22', 1, '2019-11-16 11:48:22', 1),
(10, 'rrrrrrrrrrrr', '666666666', 'rrrrrrrrrrrr.jpeg', NULL, 2, '2019-11-16 09:41:54', NULL, '2019-11-16 15:11:54', 1),
(11, 'ccccccccc', '87777776', 'ccccccccc.jpeg', NULL, 2, '2019-11-16 09:42:55', NULL, '2019-11-16 15:12:55', 1),
(13, 'dsf', 'ghgf', 'dsf.png', NULL, 1, '2019-11-16 12:12:43', NULL, '2019-11-16 17:42:43', 1),
(14, 'dsf', 'fsdf', 'dsf.png', NULL, 1, '2019-11-16 12:14:02', NULL, '2019-11-16 17:44:02', 1),
(15, 'ggggggggggggggfgdf', '654646464', 'ggggggggggggggfgdf.png', NULL, 1, '2019-11-16 12:16:29', NULL, '2019-11-16 17:46:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cms_users`
--

DROP TABLE IF EXISTS `cms_users`;
CREATE TABLE IF NOT EXISTS `cms_users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_type` tinyint(2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cms_users`
--

INSERT INTO `cms_users` (`id`, `name`, `email`, `mobile_number`, `password`, `user_type`, `created_at`, `updated_at`, `status`) VALUES
(1, 'rajesh', 'rajesh@gmail.com', '9566019013', '123456', NULL, '2019-07-12 18:30:00', NULL, NULL),
(2, 'selva', 'selva@gmail.com', '9566019013', '123456', NULL, '2019-07-13 06:52:52', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
