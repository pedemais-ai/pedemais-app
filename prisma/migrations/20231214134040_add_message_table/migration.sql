-- CreateTable
CREATE TABLE "Message"
(
    "id"         SERIAL       NOT NULL,
    "contact_id" INTEGER      NOT NULL,
    "message"    TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message"
    ADD CONSTRAINT "Message_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
