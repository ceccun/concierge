/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriptionModels" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "CallRoles" AS ENUM ('HOST', 'MODERATOR', 'PARTICIPANT', 'SPEAKER', 'AUDIENCE');

-- CreateEnum
CREATE TYPE "CallType" AS ENUM ('REGULAR', 'WEBINAR', 'VIRTUAL_EVENT');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "SubscriptionModels" NOT NULL DEFAULT 'FREE'
);

-- CreateTable
CREATE TABLE "CallParticipant" (
    "id" INTEGER NOT NULL,
    "role" "CallRoles" NOT NULL DEFAULT 'PARTICIPANT',
    "userId" TEXT,
    "callId" TEXT,

    CONSTRAINT "CallParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "type" "CallType" NOT NULL DEFAULT 'REGULAR',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "timeStarted" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Call_id_key" ON "Call"("id");

-- AddForeignKey
ALTER TABLE "CallParticipant" ADD CONSTRAINT "CallParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallParticipant" ADD CONSTRAINT "CallParticipant_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE SET NULL ON UPDATE CASCADE;
