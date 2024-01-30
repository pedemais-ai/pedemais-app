-- AlterTable
ALTER TABLE "Category"
    ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN "order"     INTEGER;
