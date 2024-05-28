-- CreateEnum
CREATE
TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Store"
    ADD COLUMN "is_open" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "StoreHours"
(
    "id"         SERIAL  NOT NULL,
    "store_id"   INTEGER NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "open_time"  TEXT    NOT NULL,
    "close_time" TEXT    NOT NULL,

    CONSTRAINT "StoreHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreHours_store_id_day_of_week_key" ON "StoreHours" ("store_id", "day_of_week");

-- AddForeignKey
ALTER TABLE "StoreHours"
    ADD CONSTRAINT "StoreHours_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
