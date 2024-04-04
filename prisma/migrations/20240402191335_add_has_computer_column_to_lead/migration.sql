/*
  Warnings:

  - Added the required column `has_computer` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead"
    ADD COLUMN "has_computer" BOOLEAN NOT NULL;
