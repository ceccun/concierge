/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_secret_key" ON "Token"("secret");
