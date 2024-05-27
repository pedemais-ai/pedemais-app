-- CreateTable
CREATE TABLE "DeliveryMethod"
(
    "id"         SERIAL       NOT NULL,
    "option"     TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod"
(
    "id"         SERIAL       NOT NULL,
    "method"     TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreDeliveryMethod"
(
    "store_id"           INTEGER NOT NULL,
    "delivery_method_id" INTEGER NOT NULL,

    CONSTRAINT "StoreDeliveryMethod_pkey" PRIMARY KEY ("store_id", "delivery_method_id")
);

-- CreateTable
CREATE TABLE "StorePaymentMethod"
(
    "store_id"          INTEGER NOT NULL,
    "payment_method_id" INTEGER NOT NULL,

    CONSTRAINT "StorePaymentMethod_pkey" PRIMARY KEY ("store_id", "payment_method_id")
);

-- AddForeignKey
ALTER TABLE "StoreDeliveryMethod"
    ADD CONSTRAINT "StoreDeliveryMethod_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreDeliveryMethod"
    ADD CONSTRAINT "StoreDeliveryMethod_delivery_method_id_fkey" FOREIGN KEY ("delivery_method_id") REFERENCES "DeliveryMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorePaymentMethod"
    ADD CONSTRAINT "StorePaymentMethod_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorePaymentMethod"
    ADD CONSTRAINT "StorePaymentMethod_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
