-- CreateTable
CREATE TABLE "Drop" (
    "DropID" TEXT NOT NULL,
    "Receiver_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("DropID")
);
