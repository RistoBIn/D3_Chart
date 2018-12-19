-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2017 at 04:54 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `meta_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_people`
--

CREATE TABLE IF NOT EXISTS `tbl_people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `address` varchar(64) NOT NULL,
  `birthday` date NOT NULL,
  `city` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tbl_people`
--

INSERT INTO `tbl_people` (`id`, `name`, `address`, `birthday`, `city`, `email`, `password`, `Latitude`, `Longitude`) VALUES
(1, 'Zoey Sporer', '618 Kirlin Station', '2017-01-03', 'Karlside', 'zoey1@hotmail.com', 'e99a18c428cb38d5f260853678922e03', -41.34760571, 15.51621145),
(2, 'Zoey2', '619 Kirlin Station2', '2017-01-10', 'Karlside', 'zoey2@hotmail.com', '79cfeb94595de33b3326c06ab1c7dbda', 41.44760571, -21.51621145),
(3, 'Zoey3', '620 Kirlin Station3', '2017-01-12', 'Karlside', 'zoey3@hotmail.com', 'e80b5017098950fc58aad83c8c14978e', 31.34760571, 7.51621145),
(4, 'Zoey4', '621 Kirlin Station4', '2017-01-20', 'Karlside', 'zoey4@hotmail.com', '7ac66c0f148de9519b8bd264312c4d64', -51.34760571, 36.51621145),
(5, 'Zoey5', '615 Kirlin Station', '2017-01-01', 'Karlside5', 'zoey5@hotmail.com', 'e8dc4081b13434b45189a720b77b6818', -41.34760571, -36.51621145);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE IF NOT EXISTS `tbl_product` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ean` int(11) NOT NULL,
  `price` double NOT NULL,
  `rating` double NOT NULL,
  `title` text NOT NULL,
  `vendor` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`id`, `category`, `createdAt`, `ean`, `price`, `rating`, `title`, `vendor`) VALUES
(1, 3, '2017-07-07 07:40:56', 34525542, 16.84, 4, 'Ergonomic Leather Pants', 'Ms. Jaime Wyman LLC'),
(2, 1, '2017-07-07 07:42:40', 12445678, 46.32, 3.5, 'Sleek Paper Bag', 'Bode-Mueller'),
(3, 4, '2017-07-07 07:44:46', 34215677, 52.98, 4.4, 'Practical Wooden Hat', 'Abernathy-Franecki'),
(4, 2, '2017-07-07 07:44:46', 82345590, 15.22, 3, 'Awesome Granite Coat', 'Dickens-Ortiz');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
