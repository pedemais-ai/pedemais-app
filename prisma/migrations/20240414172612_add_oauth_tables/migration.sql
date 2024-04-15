-- CreateTable
CREATE TABLE "OAuthApplication"
(
    "id"            SERIAL       NOT NULL,
    "name"          TEXT         NOT NULL,
    "client_id"     TEXT         NOT NULL,
    "client_secret" TEXT         NOT NULL,
    "redirect_uris" JSONB NOT NULL DEFAULT '[]',
    "scopes" JSONB NOT NULL DEFAULT '[]',
    "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP(3) NOT NULL,
    "grants" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "OAuthApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthAccessToken"
(
    "id"             SERIAL       NOT NULL,
    "user_id"        INTEGER      NOT NULL,
    "application_id" INTEGER      NOT NULL,
    "token"          TEXT         NOT NULL,
    "refresh_token"  TEXT,
    "token_expires_at" TIMESTAMPTZ(6),
    "refresh_token_expires_at" TIMESTAMPTZ(6),
    "scopes" JSONB NOT NULL DEFAULT '[]',
    "created_at"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthAccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthAccessGrant"
(
    "id"                    SERIAL       NOT NULL,
    "user_id"               INTEGER      NOT NULL,
    "application_id"        INTEGER      NOT NULL,
    "token"                 TEXT         NOT NULL,
    "expires_at"            TIMESTAMP(3) NOT NULL,
    "redirect_uri"          TEXT         NOT NULL,
    "code_challenge_method" TEXT,
    "code_challenge"        TEXT,
    "scopes" JSONB NOT NULL DEFAULT '[]',
    "created_at"            TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"            TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthAccessGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIdentity"
(
    "id"         SERIAL       NOT NULL,
    "user_id"    INTEGER      NOT NULL,
    "provider"   TEXT         NOT NULL,
    "uid"        TEXT         NOT NULL,
    "name"       TEXT,
    "email"      TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthApplication_client_id_key" ON "OAuthApplication" ("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccessToken_token_key" ON "OAuthAccessToken" ("token");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccessToken_refresh_token_key" ON "OAuthAccessToken" ("refresh_token");

-- CreateIndex
CREATE INDEX "OAuthAccessToken_application_id_idx" ON "OAuthAccessToken" ("application_id");

-- CreateIndex
CREATE INDEX "OAuthAccessToken_user_id_idx" ON "OAuthAccessToken" ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccessGrant_token_key" ON "OAuthAccessGrant" ("token");

-- CreateIndex
CREATE INDEX "OAuthAccessGrant_application_id_idx" ON "OAuthAccessGrant" ("application_id");

-- CreateIndex
CREATE INDEX "OAuthAccessGrant_user_id_idx" ON "OAuthAccessGrant" ("user_id");

-- CreateIndex
CREATE INDEX "UserIdentity_user_id_idx" ON "UserIdentity" ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserIdentity_provider_uid_key" ON "UserIdentity" ("provider", "uid");

-- AddForeignKey
ALTER TABLE "OAuthAccessToken"
    ADD CONSTRAINT "OAuthAccessToken_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "OAuthApplication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccessToken"
    ADD CONSTRAINT "OAuthAccessToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccessGrant"
    ADD CONSTRAINT "OAuthAccessGrant_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "OAuthApplication" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccessGrant"
    ADD CONSTRAINT "OAuthAccessGrant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIdentity"
    ADD CONSTRAINT "UserIdentity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
