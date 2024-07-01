/*
  Warnings:

  - You are about to drop the column `client_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order"
    DROP CONSTRAINT "Order_client_id_fkey";

-- AlterTable
ALTER TABLE "Order"
    DROP COLUMN "client_id",
    ADD COLUMN "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order"
    ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
