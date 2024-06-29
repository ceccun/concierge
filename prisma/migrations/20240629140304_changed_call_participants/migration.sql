/*
  Warnings:

  - The primary key for the `CallParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CallParticipant" DROP CONSTRAINT "CallParticipant_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CallParticipant_pkey" PRIMARY KEY ("id");
