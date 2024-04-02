-- AlterTable
ALTER TABLE "Lead"
    ADD COLUMN "ifood_url" TEXT,
    ALTER COLUMN "password" DROP NOT NULL;
