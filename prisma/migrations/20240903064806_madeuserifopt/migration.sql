/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `auth_type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "AuthType" ADD VALUE 'user';

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "Account_number" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Account_number");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth_type",
ADD COLUMN     "auth_type" "AuthType" NOT NULL DEFAULT 'user';
