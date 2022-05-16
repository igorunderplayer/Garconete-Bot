-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "money" INTEGER NOT NULL DEFAULT 0,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "marriedWithId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_marriedWithId_key" ON "User"("marriedWithId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_marriedWithId_fkey" FOREIGN KEY ("marriedWithId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
