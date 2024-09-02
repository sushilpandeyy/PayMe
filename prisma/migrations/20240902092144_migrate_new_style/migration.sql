/*
  Warnings:

  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userID" TEXT;

-- DropTable
DROP TABLE "Merchant";

-- CreateTable
CREATE TABLE "Transactions" (
    "Transaction_id" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "Type" TEXT NOT NULL,
    "Sender_Id" INTEGER NOT NULL,
    "Receiver_Id" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("Transaction_id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_Sender_Id_fkey" FOREIGN KEY ("Sender_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_Receiver_Id_fkey" FOREIGN KEY ("Receiver_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
