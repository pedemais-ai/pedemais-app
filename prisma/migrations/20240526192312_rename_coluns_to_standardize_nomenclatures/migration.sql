/*
  Warnings:

  - You are about to drop the column `option` on the `DeliveryMethod` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `PaymentMethod` table. All the data in the column will be lost.
  - Added the required column `name` to the `DeliveryMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryMethod"
    DROP COLUMN "option",
    ADD COLUMN "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod"
    DROP COLUMN "method",
    ADD COLUMN "name" TEXT NOT NULL;
