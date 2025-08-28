-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 25, 2025 at 09:14 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_products`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `nama_produk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` int NOT NULL,
  `Stok` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `nama_produk`, `deskripsi`, `gambar`, `harga`, `Stok`, `createdAt`, `updatedAt`) VALUES
(1, 'Kaos Hitam Polos', 'Kaos katun 100%, nyaman dipakai sehari-hari.', 'https://example.com/kaos-hitam.jpg', 85000, 20, '2025-06-24 05:45:08.281', '2025-06-24 05:45:08.281'),
(2, 'Jaket Hoodie Abu', 'Hoodie berbahan fleece, cocok untuk musim hujan.', 'https://example.com/hoodie-abu.jpg', 150000, 10, '2025-06-24 05:45:08.289', '2025-06-24 05:45:08.289'),
(4, 'Buku Belajar Dasar Javascript', 'Buku untuk pemula yang ingin belajar javascript', '1750821015357-219ff6e6-e359-4228-a44f-4f47aa7c2aad.png', 30000, 1, '2025-06-24 11:44:04.286', '2025-06-24 11:44:04.286'),
(6, 'Ini sayur', 'ini sayur', '1750820413404-80ee8381-ed98-4c77-8ea2-3ba3c609ba18.png', 10000, 10, '2025-06-25 03:00:13.412', '2025-06-25 03:00:13.412'),
(7, 'bayam', 'ini bayam', '1750835076941-89a96e37-40b1-460f-8159-32a1ebd7385d.png', 50000, 100, '2025-06-25 07:04:36.945', '2025-06-25 07:04:36.945');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `review` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_review` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `productId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `review`, `user_token`, `tanggal_review`, `productId`, `createdAt`, `updatedAt`) VALUES
(1, 'Produk bagus, bahannya adem!', 'anon-token-123', '2025-06-24 05:45:08.292', 1, '2025-06-24 05:45:08.292', '2025-06-24 05:45:08.292'),
(2, 'Pas banget dipakai buat nongkrong.', 'anon-token-456', '2025-06-24 05:45:08.297', 1, '2025-06-24 05:45:08.297', '2025-06-24 05:45:08.297'),
(3, 'Hoodie-nya hangat, kualitas oke.', 'anon-token-789', '2025-06-24 05:45:08.300', 2, '2025-06-24 05:45:08.300', '2025-06-24 05:45:08.300'),
(6, 'Produk nya apik loh ya', '1293c92eb48a6642aa8e85f26eb9a023', '2025-06-24 06:31:16.859', 2, '2025-06-24 06:31:16.859', '2025-06-24 06:31:16.859'),
(7, 'testing', 'c7a427a9235ab697c734d9ff1538f335', '2025-06-25 06:55:35.295', 1, '2025-06-25 06:55:35.295', '2025-06-25 06:55:35.295'),
(8, 'bayam nya menyehatkan ', 'c7a427a9235ab697c734d9ff1538f335', '2025-06-25 07:05:24.236', 7, '2025-06-25 07:05:24.236', '2025-06-25 07:05:24.236');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0aaa87a6-1493-4917-bce7-be68a4e78470', '236ae49e98aa0f48f5fc15f6d32be7fb2fc69e2a024c181bdb7c9965673e2e17', '2025-06-24 05:45:07.685', '20250623120810_adding_review_model_n_relation', NULL, NULL, '2025-06-24 05:45:07.599', 1),
('765c890e-891f-4f74-a6e9-7525bfb1dc1a', 'c7c9b42b813ab97bbcf473edbbe3f2f627cb70ef639f10dd0aa18203ae907b75', '2025-06-24 05:45:07.769', '20250623121135_modify_relation', NULL, NULL, '2025-06-24 05:45:07.687', 1),
('935a02ca-4605-4779-b71a-14d191feea78', '9ccc43b85a5077a25ddfdf59f7b16faaae6ff626c3c22296fdac26ed8cba6cd0', '2025-06-24 05:45:07.801', '20250624054455_add_update_time_on_both_models', NULL, NULL, '2025-06-24 05:45:07.771', 1),
('a85f23a2-6236-45f6-9b01-6adfe363b1dc', '739c79afaeca14282f0944f830aab485718574b1b15b9f6a698ac2ede45b0b29', '2025-06-24 05:45:07.597', '20250623115524_init_db', NULL, NULL, '2025-06-24 05:45:07.578', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Reviews_productId_fkey` (`productId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `Reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
