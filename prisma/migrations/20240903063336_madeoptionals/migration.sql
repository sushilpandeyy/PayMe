/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Account_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Account_number` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Category` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_Receiver_Id_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_Sender_Id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "Account_id",
DROP COLUMN "user_id",
ADD COLUMN     "Account_number" INTEGER NOT NULL,
ADD COLUMN     "userID" INTEGER NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Account_number");

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "Category" TEXT NOT NULL,
ALTER COLUMN "Sender_Id" SET DATA TYPE TEXT,
ALTER COLUMN "Receiver_Id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_Sender_Id_fkey" FOREIGN KEY ("Sender_Id") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_Receiver_Id_fkey" FOREIGN KEY ("Receiver_Id") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
