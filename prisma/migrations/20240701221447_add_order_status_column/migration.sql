/*
  Warnings:

  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE
TYPE "OrderStatus" AS ENUM ('WAITING', 'PREPARING', 'READY', 'DONE');

-- AlterTable
ALTER TABLE "Order"
    ADD COLUMN "status" "OrderStatus" NOT NULL;
