-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2016 at 02:46 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `alert_expirations`
--

CREATE TABLE `alert_expirations` (
  `id` int(10) UNSIGNED NOT NULL,
  `days` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `alert_expirations`
--

INSERT INTO `alert_expirations` (`id`, `days`, `created_at`, `updated_at`) VALUES
(1, 90, '2016-12-07 02:34:12', '2016-12-07 02:34:12'),
(2, 25, '2016-12-07 02:35:21', '2016-12-07 02:35:21'),
(3, 15, '2016-12-07 02:35:41', '2016-12-07 02:35:41'),
(4, 36, '2016-12-07 02:36:22', '2016-12-07 02:36:22'),
(5, 16, '2016-12-07 02:36:51', '2016-12-07 02:36:51'),
(6, 36, '2016-12-07 02:37:02', '2016-12-07 02:37:02'),
(7, 16, '2016-12-07 02:38:23', '2016-12-07 02:38:23'),
(8, 25, '2016-12-07 02:43:50', '2016-12-07 02:43:50'),
(9, 26, '2016-12-07 03:52:47', '2016-12-07 03:52:47'),
(10, 45, '2016-12-07 03:53:09', '2016-12-07 03:53:09'),
(11, 69, '2016-12-07 03:53:25', '2016-12-07 03:53:25'),
(12, 14, '2016-12-07 03:56:41', '2016-12-07 03:56:41'),
(13, 25, '2016-12-07 03:56:54', '2016-12-07 03:56:54'),
(14, 23, '2016-12-07 03:56:57', '2016-12-07 03:56:57'),
(15, 15, '2016-12-07 03:57:09', '2016-12-07 03:57:09'),
(16, 25, '2016-12-08 04:08:40', '2016-12-08 04:08:40'),
(17, 26, '2016-12-08 04:08:49', '2016-12-08 04:08:49'),
(18, 15, '2016-12-08 04:21:05', '2016-12-08 04:21:05'),
(19, 14, '2016-12-08 04:23:26', '2016-12-08 04:23:26'),
(20, 16, '2016-12-08 04:23:56', '2016-12-08 04:23:56'),
(21, 25, '2016-12-08 04:23:58', '2016-12-08 04:23:58'),
(22, 18, '2016-12-08 05:35:22', '2016-12-08 05:35:22');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `code`, `created_at`, `updated_at`) VALUES
(1, 'SM cebu', '1111', '2016-12-01 02:37:47', '2016-12-01 02:37:47'),
(2, 'SM Tacloban', '2222', '2016-12-01 02:37:56', '2016-12-01 02:37:56'),
(3, 'SM manila', '3333', '2016-12-01 02:38:01', '2016-12-01 02:38:01');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Multivitamins', '2016-12-01 02:39:11', '2016-12-01 02:39:11'),
(2, 'Milk', '2016-12-01 02:39:13', '2016-12-01 02:39:13'),
(3, 'moisturizer', '2016-12-01 02:39:39', '2016-12-01 02:39:39'),
(4, 'Lotion', '2016-12-01 02:39:41', '2016-12-01 02:39:41'),
(5, 'Shampoo', '2016-12-01 02:39:44', '2016-12-01 02:39:44'),
(6, 'Soap', '2016-12-01 02:39:48', '2016-12-01 02:39:48');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `category` int(11) NOT NULL,
  `branch` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `purchase_price` double(8,2) NOT NULL,
  `selling_price` double(8,2) NOT NULL,
  `additional_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reorder_point` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `running_balance` int(11) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'pcs'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `category`, `branch`, `name`, `purchase_price`, `selling_price`, `additional_description`, `reorder_point`, `created_at`, `updated_at`, `running_balance`, `deleted_at`, `unit`) VALUES
(1, 1, 2, 'centrum', 250.00, 295.00, 'for 21 yrs.', 5, '2016-12-01 02:40:23', '2016-12-02 07:21:38', 593, NULL, 'box'),
(2, 1, 2, 'Enervon', 190.00, 240.00, 'for 18 yrs.', 5, '2016-12-01 02:40:51', '2016-12-02 03:19:33', 496, NULL, 'box'),
(3, 5, 2, 'M1NKOi', 4971.00, 6961.00, 'cJnOARoCdQ', 4, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 22, NULL, 'pcs'),
(4, 6, 1, 'UQ4g3i', 1849.00, 5663.00, 'olQfmbJ6YU', 3, '2016-12-02 03:21:58', '2016-12-04 00:22:50', 273, NULL, 'pcs'),
(5, 3, 2, '2WK9j0', 1195.00, 6247.00, 'eX9Dok9HwP', 51, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 218, NULL, 'pcs'),
(6, 4, 3, 'B3J0Wx', 3274.00, 5664.00, 'BPhT4gLxF2', 48, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 213, NULL, 'pcs'),
(7, 3, 2, 'ZkK4fH', 2225.00, 5243.00, 'By4BouthmH', 11, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 209, NULL, 'pcs'),
(8, 1, 3, 'kCNY4X', 3065.00, 7688.00, '5Q0X8KTStP', 7, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 192, NULL, 'pcs'),
(9, 5, 2, 'e1Xd7d', 2685.00, 6076.00, 'wjlBs6lJNd', 73, '2016-12-02 03:21:58', '2016-12-02 07:21:38', 266, NULL, 'pcs'),
(10, 4, 3, 'McU8KY', 2849.00, 8861.00, '3jcM5qw4rK', 45, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 47, NULL, 'pcs'),
(11, 5, 2, 'Ts9zfv', 3199.00, 8870.00, '1AcIxmmLKe', 79, '2016-12-02 03:21:58', '2016-12-02 03:23:21', 140, NULL, 'pcs'),
(12, 6, 1, 'purl9F', 2250.00, 8306.00, 'sLj2HaKdBI', 79, '2016-12-02 03:21:58', '2016-12-03 23:21:22', 139, NULL, 'pcs'),
(13, 4, 3, '6uqVC7', 2393.00, 7749.00, 'qVjd0TFj34', 19, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 105, NULL, 'pcs'),
(14, 1, 3, 'gHGFs9', 2893.00, 7150.00, 'lGB5mw1hXt', 73, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 306, NULL, 'pcs'),
(15, 1, 3, 'QXxp2O', 4892.00, 6839.00, 'BRY5HiyVJn', 34, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 257, NULL, 'pcs'),
(16, 5, 1, 'mS3MeC', 4404.00, 8518.00, 'W2MIA2KvPn', 44, '2016-12-02 03:21:58', '2016-12-03 23:21:22', 205, NULL, 'pcs'),
(17, 6, 1, 'ZrrWgG', 1319.00, 8266.00, 'i2BfPE7r7t', 14, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 170, NULL, 'pcs'),
(18, 1, 1, 'lANB1F', 4406.00, 5534.00, 'gXGBkBCxCC', 56, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 25, NULL, 'pcs'),
(19, 5, 1, 'gC1Z2k', 4303.00, 8153.00, 'parSkJCjRG', 1, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 293, NULL, 'pcs'),
(20, 6, 3, 'AeYYAD', 2525.00, 5323.00, 'g3HVhk9K1p', 27, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 126, NULL, 'pcs'),
(21, 1, 3, 'nonnsJ', 4465.00, 8626.00, 'aN3oY2pYhj', 84, '2016-12-02 03:21:58', '2016-12-02 05:14:49', 198, NULL, 'pcs'),
(22, 2, 2, 'CksR4V', 4387.00, 5011.00, 'FPm3zsaVGG', 20, '2016-12-02 03:21:58', '2016-12-03 23:30:19', 339, NULL, 'pcs'),
(23, 6, 2, '0hS6DK', 2432.00, 5810.00, 'gyVU0psLVi', 4, '2016-12-02 03:21:58', '2016-12-02 03:23:21', 337, NULL, 'pcs'),
(24, 4, 3, 'u8AxiK', 1616.00, 7723.00, 'GEROOhSDoa', 52, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 340, NULL, 'pcs'),
(25, 3, 2, 'agICTX', 4830.00, 5830.00, 'wyZ5Br4xas', 53, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 281, NULL, 'pcs'),
(26, 3, 2, 'pk6K47', 3837.00, 6583.00, '3e3bNgNUmz', 89, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 299, NULL, 'pcs'),
(27, 5, 2, 'kRIh0B', 4281.00, 8811.00, 'Qve8qkHCds', 69, '2016-12-02 03:21:58', '2016-12-02 07:21:01', 127, NULL, 'pcs'),
(28, 2, 2, 'Gad2Ne', 2676.00, 8717.00, '2x4m3rgmZ1', 46, '2016-12-02 03:21:58', '2016-12-02 07:21:01', 231, NULL, 'pcs'),
(29, 1, 1, 'AkA1Et', 3412.00, 8878.00, 'BTuhMVf4VE', 45, '2016-12-02 03:21:58', '2016-12-04 00:22:34', 150, NULL, 'pcs'),
(30, 1, 2, 'QkKkuH', 3756.00, 7248.00, 'Zi6mO6TlGe', 89, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 328, NULL, 'pcs'),
(31, 4, 3, 'Q3vj0H', 2848.00, 6155.00, '2yeK6JSmka', 21, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 101, NULL, 'pcs'),
(32, 5, 1, 'PG8L6w', 2704.00, 5303.00, 'i4MOvXwoSj', 33, '2016-12-02 03:21:58', '2016-12-04 00:22:59', 241, NULL, 'pcs'),
(33, 3, 1, 'Wzcsfh', 1214.00, 6769.00, 'NCBCKHCbKd', 88, '2016-12-02 03:21:58', '2016-12-04 00:22:42', 249, NULL, 'pcs'),
(34, 3, 2, 'ApTBWP', 1143.00, 8007.00, '8wRxl7ZxGr', 44, '2016-12-02 03:21:58', '2016-12-04 00:24:53', 165, NULL, 'pcs'),
(35, 4, 2, 'x1vGXV', 3134.00, 6844.00, 'QZE96Il75n', 85, '2016-12-02 03:21:58', '2016-12-06 02:05:09', 339, NULL, 'pcs'),
(36, 5, 1, 'tALI9D', 2701.00, 6484.00, 'wGDcPZJlzT', 38, '2016-12-02 03:21:58', '2016-12-04 00:22:26', 109, NULL, 'pcs'),
(37, 4, 2, 'MNCP0b', 3235.00, 8505.00, '9oGk67T8CM', 4, '2016-12-02 03:21:58', '2016-12-02 06:28:29', 310, NULL, 'pcs'),
(38, 5, 3, 'TadVIU', 1000.00, 5859.00, '4NphYlu8ku', 80, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 257, NULL, 'pcs'),
(39, 2, 3, 'Aw1Odb', 2139.00, 7876.00, 'I1FYqnplYu', 85, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 248, NULL, 'pcs'),
(40, 1, 2, 'SRhSyH', 3667.00, 5258.00, '3ozdz5QDrx', 86, '2016-12-02 03:21:58', '2016-12-03 18:36:12', 267, NULL, 'pcs'),
(41, 6, 3, 'Dsq9NO', 2474.00, 7084.00, 'LLIBx3OD7l', 19, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 76, NULL, 'pcs'),
(42, 1, 3, 'Fd7toD', 4326.00, 5805.00, 'CN0GDHXSK9', 21, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 333, NULL, 'pcs'),
(43, 4, 1, 'MAB2m0', 4863.00, 6252.00, 'PtRczhdFqW', 47, '2016-12-02 03:21:58', '2016-12-04 00:22:26', 245, NULL, 'pcs'),
(44, 3, 2, 'BA6uAw', 2601.00, 6626.00, 'apvnQN1EUl', 2, '2016-12-02 03:21:58', '2016-12-03 18:35:16', 106, NULL, 'pcs'),
(45, 4, 1, 'UdV8Nk', 3932.00, 7507.00, 't21kYbtKCT', 59, '2016-12-02 03:21:58', '2016-12-02 03:21:58', 330, NULL, 'pcs'),
(46, 1, 2, '6fVAi1', 4120.00, 8846.00, 'v2nNKv0q2N', 93, '2016-12-02 03:21:58', '2016-12-08 05:25:33', 474, NULL, 'pcs'),
(47, 5, 2, 'mmuyWe', 4306.00, 6972.00, 'ENqOBvq7sH', 96, '2016-12-02 03:21:58', '2016-12-08 05:25:33', 671, NULL, 'pcs'),
(48, 5, 2, 'SF8IvF', 4505.00, 7589.00, 'uKpExFMzuQ', 10, '2016-12-02 03:21:58', '2016-12-08 05:25:33', 557, NULL, 'pcs'),
(49, 5, 2, 'xIUK5R', 4609.00, 6773.00, 'DTrlOpn2qA', 48, '2016-12-02 03:21:58', '2016-12-06 12:30:22', 747, NULL, 'pcs'),
(50, 4, 1, 'WNxVKq', 1382.00, 7980.00, 'L5uQuXmJwS', 20, '2016-12-02 03:21:58', '2016-12-06 12:30:22', 2688, NULL, 'pcs'),
(51, 3, 1, 'qeNZ5I', 1466.00, 7035.00, 'GNsn5Z59Zl', 57, '2016-12-02 03:21:58', '2016-12-08 03:43:49', 1784, NULL, 'pcs'),
(52, 3, 2, '79pZui', 2377.00, 5144.00, 'UrYAtyFzn9', 37, '2016-12-02 03:21:58', '2016-12-08 03:43:49', 716, NULL, 'pcs');

-- --------------------------------------------------------

--
-- Table structure for table `item_expirations`
--

CREATE TABLE `item_expirations` (
  `id` int(10) UNSIGNED NOT NULL,
  `expiry_date` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `rid` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `item_expirations`
--

INSERT INTO `item_expirations` (`id`, `expiry_date`, `rid`, `product_id`, `created_at`, `updated_at`) VALUES
(1, '2018-11-01', 4, 50, '2016-12-06 05:18:58', '2016-12-06 05:18:58'),
(2, '2017-03-16', 4, 49, '2016-12-06 05:18:58', '2016-12-06 05:18:58'),
(3, '2017-01-20', 5, 51, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(4, '2017-01-18', 5, 50, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(5, '2017-12-21', 5, 49, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(6, '2016-12-30', 6, 52, '2016-12-08 03:43:49', '2016-12-08 03:43:49'),
(7, '2016-12-25', 6, 51, '2016-12-08 03:43:49', '2016-12-08 03:43:49'),
(8, '2016-12-31', 7, 48, '2016-12-08 05:25:33', '2016-12-08 05:25:33'),
(9, '2016-12-30', 7, 47, '2016-12-08 05:25:33', '2016-12-08 05:25:33'),
(10, '2016-12-29', 7, 46, '2016-12-08 05:25:33', '2016-12-08 05:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2016_10_17_133019_add_admin_column_users_table', 1),
('2016_10_18_025337_create_table_branches', 1),
('2016_10_18_234331_create_staff_table', 1),
('2016_10_19_035510_add_column_branch_id_users_table', 1),
('2016_10_19_123253_add_deleted_at_column_users_table', 1),
('2016_10_24_061210_create_categories_table', 1),
('2016_10_25_065717_create_items_table', 1),
('2016_10_26_021521_add_column_running_balance_items_table', 1),
('2016_10_26_054344_drop_column_branch_id_categories_table', 1),
('2016_10_27_010209_add_soft_delete_items_table', 1),
('2016_11_02_043316_create_receiving_forms_table', 1),
('2016_11_04_100322_create_receiving_items_table', 1),
('2016_11_04_134003_add_column_units_items_table', 1),
('2016_11_08_033222_create_purchases_table', 1),
('2016_11_08_033923_create_purchase_items_table', 1),
('2016_12_02_111313_add_column_staff_purchase_table', 2),
('2016_12_02_121257_add_column_old_price_purchase_items_table', 3),
('2016_12_02_150838_add_column_branch_purchases_table', 4),
('2016_12_06_121125_create_item_expirations_table', 5),
('2016_12_06_132229_drop_column_date_received_item_expiratios_table', 6),
('2016_12_06_204619_create_alert_expirations_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount_received` double(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `staff` int(11) NOT NULL DEFAULT '0',
  `branch` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `date`, `amount_received`, `created_at`, `updated_at`, `staff`, `branch`) VALUES
(1, 'December 03, 2016 15:19:51', 36000.00, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 2, 2),
(2, 'December 03, 2016 15:21:22', 16900.00, '2016-12-03 23:21:22', '2016-12-03 23:21:22', 7, 1),
(3, 'December 03, 2016 15:30:07', 19000.00, '2016-12-03 23:30:07', '2016-12-03 23:30:07', 2, 2),
(4, 'December 04, 2016 15:30:19', 25100.00, '2016-12-03 23:30:19', '2016-12-03 23:30:19', 2, 2),
(5, 'December 04, 2016 15:30:33', 16000.00, '2016-12-03 23:30:34', '2016-12-03 23:30:34', 7, 1),
(6, 'December 05, 2016 16:22:26', 13000.00, '2016-12-04 00:22:26', '2016-12-04 00:22:26', 7, 1),
(7, 'December 05, 2016 16:22:34', 24000.00, '2016-12-04 00:22:34', '2016-12-04 00:22:34', 7, 1),
(8, 'December 06, 2016 16:22:42', 29000.00, '2016-12-04 00:22:42', '2016-12-04 00:22:42', 7, 1),
(9, 'December 06, 2016 16:22:50', 6000.00, '2016-12-04 00:22:50', '2016-12-04 00:22:50', 7, 1),
(10, 'December 06, 2016 16:22:59', 11000.00, '2016-12-04 00:22:59', '2016-12-04 00:22:59', 7, 1),
(11, 'December 06, 2016 16:24:37', 19000.00, '2016-12-04 00:24:37', '2016-12-04 00:24:37', 2, 2),
(12, 'December 06, 2016 16:24:44', 7000.00, '2016-12-04 00:24:44', '2016-12-04 00:24:44', 2, 2),
(13, 'December 06, 2016 16:24:53', 15000.00, '2016-12-04 00:24:53', '2016-12-04 00:24:53', 2, 2),
(14, 'December 06, 2016 18:04:52', 16000.00, '2016-12-06 02:04:52', '2016-12-06 02:04:52', 7, 1),
(15, 'December 06, 2016 18:05:09', 6850.00, '2016-12-06 02:05:09', '2016-12-06 02:05:09', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_items`
--

CREATE TABLE `purchase_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `purchase_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `old_price` double(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `purchase_items`
--

INSERT INTO `purchase_items` (`id`, `qty`, `product_id`, `purchase_id`, `created_at`, `updated_at`, `old_price`) VALUES
(1, 1, 46, 1, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 8846.00),
(2, 1, 47, 1, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 6972.00),
(3, 1, 48, 1, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 7589.00),
(4, 1, 49, 1, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 6773.00),
(5, 1, 52, 1, '2016-12-03 23:19:51', '2016-12-03 23:19:51', 5144.00),
(6, 1, 12, 2, '2016-12-03 23:21:22', '2016-12-03 23:21:22', 8306.00),
(7, 1, 16, 2, '2016-12-03 23:21:22', '2016-12-03 23:21:22', 8518.00),
(8, 1, 35, 3, '2016-12-03 23:30:07', '2016-12-03 23:30:07', 6844.00),
(9, 1, 52, 3, '2016-12-03 23:30:07', '2016-12-03 23:30:07', 5144.00),
(10, 1, 49, 3, '2016-12-03 23:30:08', '2016-12-03 23:30:08', 6773.00),
(11, 5, 22, 4, '2016-12-03 23:30:19', '2016-12-03 23:30:19', 5011.00),
(12, 1, 51, 5, '2016-12-03 23:30:34', '2016-12-03 23:30:34', 7035.00),
(13, 1, 50, 5, '2016-12-03 23:30:34', '2016-12-03 23:30:34', 7980.00),
(14, 1, 36, 6, '2016-12-04 00:22:26', '2016-12-04 00:22:26', 6484.00),
(15, 1, 43, 6, '2016-12-04 00:22:26', '2016-12-04 00:22:26', 6252.00),
(16, 1, 32, 7, '2016-12-04 00:22:34', '2016-12-04 00:22:34', 5303.00),
(17, 2, 29, 7, '2016-12-04 00:22:34', '2016-12-04 00:22:34', 8878.00),
(18, 1, 50, 8, '2016-12-04 00:22:42', '2016-12-04 00:22:42', 7980.00),
(19, 2, 51, 8, '2016-12-04 00:22:42', '2016-12-04 00:22:42', 7035.00),
(20, 1, 33, 8, '2016-12-04 00:22:42', '2016-12-04 00:22:42', 6769.00),
(21, 1, 4, 9, '2016-12-04 00:22:50', '2016-12-04 00:22:50', 5663.00),
(22, 2, 32, 10, '2016-12-04 00:22:59', '2016-12-04 00:22:59', 5303.00),
(23, 1, 52, 11, '2016-12-04 00:24:37', '2016-12-04 00:24:37', 5144.00),
(24, 2, 49, 11, '2016-12-04 00:24:37', '2016-12-04 00:24:37', 6773.00),
(25, 1, 49, 12, '2016-12-04 00:24:44', '2016-12-04 00:24:44', 6773.00),
(26, 1, 35, 13, '2016-12-04 00:24:53', '2016-12-04 00:24:53', 6844.00),
(27, 1, 34, 13, '2016-12-04 00:24:53', '2016-12-04 00:24:53', 8007.00),
(28, 1, 51, 14, '2016-12-06 02:04:53', '2016-12-06 02:04:53', 7035.00),
(29, 1, 50, 14, '2016-12-06 02:04:53', '2016-12-06 02:04:53', 7980.00),
(30, 1, 35, 15, '2016-12-06 02:05:09', '2016-12-06 02:05:09', 6844.00);

-- --------------------------------------------------------

--
-- Table structure for table `receiving_forms`
--

CREATE TABLE `receiving_forms` (
  `id` int(10) UNSIGNED NOT NULL,
  `supplier` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `person` int(11) NOT NULL,
  `verified_by` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `receiving_forms`
--

INSERT INTO `receiving_forms` (`id`, `supplier`, `date`, `person`, `verified_by`, `created_at`, `updated_at`) VALUES
(1, 'batman', 'December 01, 2016 18:41:30', 1, 'rody duterte', '2016-12-01 02:41:30', '2016-12-01 02:41:30'),
(2, 'superman', 'December 01, 2016 21:21:51', 1, 'marcos not hero', '2016-12-01 05:21:51', '2016-12-01 05:21:51'),
(3, 'heather plus', 'December 04, 2016 10:37:45', 1, 'homers uy', '2016-12-03 18:37:45', '2016-12-03 18:37:45'),
(4, 'superman', 'December 06, 2016 21:18:58', 1, 'johny', '2016-12-06 05:18:58', '2016-12-06 05:18:58'),
(5, 'batman', 'December 07, 2016 04:30:22', 1, 'johny bravo', '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(6, 'Batman', 'December 08, 2016 19:43:49', 1, 'ethan', '2016-12-08 03:43:49', '2016-12-08 03:43:49'),
(7, 'super man', 'December 08, 2016 21:25:33', 1, 'dayang', '2016-12-08 05:25:33', '2016-12-08 05:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `receiving_items`
--

CREATE TABLE `receiving_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `pid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `receiving_items`
--

INSERT INTO `receiving_items` (`id`, `pid`, `qty`, `rid`, `created_at`, `updated_at`) VALUES
(1, 2, 20, 1, '2016-12-01 02:41:30', '2016-12-01 02:41:30'),
(2, 1, 30, 1, '2016-12-01 02:41:30', '2016-12-01 02:41:30'),
(3, 2, 600, 2, '2016-12-01 05:21:51', '2016-12-01 05:21:51'),
(4, 1, 700, 2, '2016-12-01 05:21:51', '2016-12-01 05:21:51'),
(5, 52, 5, 3, '2016-12-03 18:37:45', '2016-12-03 18:37:45'),
(6, 51, 10, 3, '2016-12-03 18:37:45', '2016-12-03 18:37:45'),
(7, 50, 100, 4, '2016-12-06 05:18:58', '2016-12-06 05:18:58'),
(8, 49, 150, 4, '2016-12-06 05:18:58', '2016-12-06 05:18:58'),
(9, 51, 1000, 5, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(10, 50, 2500, 5, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(11, 49, 500, 5, '2016-12-06 12:30:22', '2016-12-06 12:30:22'),
(12, 52, 500, 6, '2016-12-08 03:43:49', '2016-12-08 03:43:49'),
(13, 51, 600, 6, '2016-12-08 03:43:49', '2016-12-08 03:43:49'),
(14, 48, 500, 7, '2016-12-08 05:25:33', '2016-12-08 05:25:33'),
(15, 47, 600, 7, '2016-12-08 05:25:33', '2016-12-08 05:25:33'),
(16, 46, 350, 7, '2016-12-08 05:25:33', '2016-12-08 05:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `id` int(10) UNSIGNED NOT NULL,
  `branch_id` int(11) NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `admin` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `old_price` double(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `admin`, `branch_id`, `deleted_at`, `old_price`) VALUES
(1, 'john doe', 'johndoe@gmail.com', '$2y$10$frfATZyyhALHJut9l2KUBuppr05OrO54HrmmPfCc0.ND51P37xet2', 'w3qUukdBx718L25aHY3E1rzKAuRY2N0SJbVFEPt8twcbqzp0raVnfvwcayWf', '2016-12-01 02:36:40', '2016-12-08 05:36:00', 1, 0, NULL, 0.00),
(2, 'asombrado', 'asombrado@gmail.com', '$2y$10$2/UGIlXsjnEIoFJERMtN2esA3X8LxEwin8.mJQKKpaz3yKhEjCAoi', 'n23XKj2ze7omR96kEwWv6jSeGehn1S6rqNJkR51W9Jcq8aIlOqaNxAVaVTRw', '2016-12-01 02:38:20', '2016-12-06 02:05:12', 0, 2, NULL, 0.00),
(3, 'johny bravo', 'johnybravo@gmail.com', '$2y$10$C.7P8/lfXhc1l6mftMvC0.MuKjAjOxqf/7BQbxihTCPZJu5CVqqmu', NULL, '2016-12-01 02:38:39', '2016-12-01 02:38:39', 0, 1, NULL, 0.00),
(5, 'john', 'john@gmail.com', '$2y$10$GAG/Be3fCXUfn6cwUTxB4.A8j2b7pFKg8uNn.rnxkxJAivtVIrb7K', 'CXlzQL4i2UOnkiFef8eOjS9SppVuYyDoFUOAxZqIMTMrSFZsJdxqmevvwK4y', '2016-12-02 03:30:52', '2016-12-02 07:20:20', 0, 3, NULL, 0.00),
(6, 'james', 'james@gmail.com', '$2y$10$zJUdTc/w3Lwf04Btwi/QxewzjgTEGeXoexRjUxes1jHny8zPXZqp.', 'Az2AGpDYbTLgjY9IM5myivznuQtopgdBc7ZkFhdozHzQmoRNj0aE1ZkRrniE', '2016-12-02 07:19:46', '2016-12-02 07:20:03', 0, 2, NULL, 0.00),
(7, 'cebu staff', 'cebustaff@gmail.com', '$2y$10$RvFin2WGxLDJHqVSH5nVxeapzvXSDg19DJLPBe2xC715bC1neWsBu', 'MG86Tj4DAjwakXbAstwii39Bys3JKK0xF6jLbdHFPbsq6ofmahVO4cT8an1G', '2016-12-03 21:03:05', '2016-12-06 02:04:55', 0, 1, NULL, 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alert_expirations`
--
ALTER TABLE `alert_expirations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_expirations`
--
ALTER TABLE `item_expirations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receiving_forms`
--
ALTER TABLE `receiving_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receiving_items`
--
ALTER TABLE `receiving_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alert_expirations`
--
ALTER TABLE `alert_expirations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `item_expirations`
--
ALTER TABLE `item_expirations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `receiving_forms`
--
ALTER TABLE `receiving_forms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `receiving_items`
--
ALTER TABLE `receiving_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
