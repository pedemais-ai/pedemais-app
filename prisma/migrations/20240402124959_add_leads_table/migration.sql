-- CreateTable
CREATE TABLE "Lead"
(
    "id"             SERIAL       NOT NULL,
    "name"           TEXT         NOT NULL,
    "email"          TEXT         NOT NULL,
    "store_name"     TEXT         NOT NULL,
    "phone_number"   TEXT         NOT NULL,
    "orders_per_day" INTEGER      NOT NULL,
    "password"       TEXT         NOT NULL,
    "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
