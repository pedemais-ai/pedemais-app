-- DropIndex
DROP INDEX "Client_flow_id_key";

-- CreateTable
CREATE TABLE "StoreType"
(
    "id"         SERIAL       NOT NULL,
    "name"       TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store"
(
    "id"         SERIAL       NOT NULL,
    "type_id"    INTEGER      NOT NULL,
    "user_id"    INTEGER      NOT NULL,
    "name"       TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Store"
    ADD CONSTRAINT "Store_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "StoreType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store"
    ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
