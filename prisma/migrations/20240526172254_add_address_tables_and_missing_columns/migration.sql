/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address"
    DROP CONSTRAINT "Address_user_id_fkey";

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "UserAddress"
(
    "id"          SERIAL       NOT NULL,
    "user_id"     INTEGER      NOT NULL,
    "street"      TEXT         NOT NULL,
    "number"      TEXT         NOT NULL,
    "city"        TEXT         NOT NULL,
    "postal_code" TEXT         NOT NULL,
    "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreAddress"
(
    "id"          SERIAL       NOT NULL,
    "store_id"    INTEGER      NOT NULL,
    "street"      TEXT         NOT NULL,
    "city"        TEXT         NOT NULL,
    "number"      TEXT         NOT NULL,
    "postal_code" TEXT         NOT NULL,
    "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAddress"
    ADD CONSTRAINT "UserAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress"
    ADD CONSTRAINT "StoreAddress_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
