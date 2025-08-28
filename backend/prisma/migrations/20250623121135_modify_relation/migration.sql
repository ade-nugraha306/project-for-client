/*
  Warnings:

  - You are about to drop the column `product_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_product_id_fkey`;

-- DropIndex
DROP INDEX `Reviews_product_id_fkey` ON `reviews`;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `product_id`,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
