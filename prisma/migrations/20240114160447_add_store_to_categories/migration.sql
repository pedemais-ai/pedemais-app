/*
  Warnings:

  - Added the required column `store_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category"
    ADD COLUMN "store_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Category"
    ADD CONSTRAINT "Category_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
