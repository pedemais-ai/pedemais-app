/*
  Warnings:

  - You are about to drop the `UserStoreLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserStoreLink"
    DROP CONSTRAINT "UserStoreLink_store_id_fkey";

-- DropForeignKey
ALTER TABLE "UserStoreLink"
    DROP CONSTRAINT "UserStoreLink_user_id_fkey";

-- DropTable
DROP TABLE "UserStoreLink";

-- CreateTable
CREATE TABLE "ContactStoreLink"
(
    "id"         SERIAL       NOT NULL,
    "contact_id" INTEGER      NOT NULL,
    "store_id"   INTEGER      NOT NULL,
    "unique_id"  TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactStoreLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactStoreLink_unique_id_key" ON "ContactStoreLink" ("unique_id");

-- AddForeignKey
ALTER TABLE "ContactStoreLink"
    ADD CONSTRAINT "ContactStoreLink_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactStoreLink"
    ADD CONSTRAINT "ContactStoreLink_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
