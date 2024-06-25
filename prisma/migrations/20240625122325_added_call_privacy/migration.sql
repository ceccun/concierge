/*
  Warnings:

  - Added the required column `privacy` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CallPrivacy" AS ENUM ('ANYONE', 'APPROVAL', 'INVITED');

-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "privacy" "CallPrivacy" NOT NULL;
