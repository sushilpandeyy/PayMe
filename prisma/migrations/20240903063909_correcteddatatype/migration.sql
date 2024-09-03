-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userID_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
