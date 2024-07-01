/*
  Warnings:

  - The primary key for the `StoreDeliveryMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StorePaymentMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `store_delivery_method_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_payment_method_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order"
    ADD COLUMN "store_delivery_method_id" INTEGER NOT NULL,
    ADD COLUMN "store_id"                 INTEGER NOT NULL,
    ADD COLUMN "store_payment_method_id"  INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StoreDeliveryMethod"
    DROP CONSTRAINT "StoreDeliveryMethod_pkey",
    ADD COLUMN "id" SERIAL NOT NULL,
    ADD CONSTRAINT "StoreDeliveryMethod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StorePaymentMethod"
    DROP CONSTRAINT "StorePaymentMethod_pkey",
    ADD COLUMN "id" SERIAL NOT NULL,
    ADD CONSTRAINT "StorePaymentMethod_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Order"
    ADD CONSTRAINT "Order_store_delivery_method_id_fkey" FOREIGN KEY ("store_delivery_method_id") REFERENCES "StoreDeliveryMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order"
    ADD CONSTRAINT "Order_store_payment_method_id_fkey" FOREIGN KEY ("store_payment_method_id") REFERENCES "StorePaymentMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
