-- CreateTable
CREATE TABLE "Account" (
    "Account_id" TEXT NOT NULL,
    "Balance" INTEGER NOT NULL,
    "PIN" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("Account_id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
