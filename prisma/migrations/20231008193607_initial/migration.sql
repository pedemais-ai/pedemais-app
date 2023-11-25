-- CreateTable
CREATE TABLE "User"
(
    "id"         SERIAL       NOT NULL,
    "name"       TEXT         NOT NULL,
    "email"      TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client"
(
    "id"         SERIAL       NOT NULL,
    "user_id"    INTEGER      NOT NULL,
    "flow_id"    INTEGER,
    "name"       TEXT         NOT NULL,
    "handle"     TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact"
(
    "id"            SERIAL       NOT NULL,
    "client_id"     INTEGER      NOT NULL,
    "number"        TEXT         NOT NULL,
    "name"          TEXT,
    "current_stage" INTEGER,
    "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow"
(
    "id"         SERIAL       NOT NULL,
    "name"       TEXT         NOT NULL,
    "greeting"   TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_flow_id_key" ON "Client" ("flow_id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_handle_key" ON "Client" ("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_number_key" ON "Contact" ("number");

-- AddForeignKey
ALTER TABLE "Client"
    ADD CONSTRAINT "Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client"
    ADD CONSTRAINT "Client_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "Flow" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact"
    ADD CONSTRAINT "Contact_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
