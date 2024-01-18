-- CreateTable
CREATE TABLE "UserStoreLink"
(
    "id"         SERIAL       NOT NULL,
    "user_id"    INTEGER      NOT NULL,
    "store_id"   INTEGER      NOT NULL,
    "unique_id"  TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStoreLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStoreLink_unique_id_key" ON "UserStoreLink" ("unique_id");

-- AddForeignKey
ALTER TABLE "UserStoreLink"
    ADD CONSTRAINT "UserStoreLink_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStoreLink"
    ADD CONSTRAINT "UserStoreLink_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
