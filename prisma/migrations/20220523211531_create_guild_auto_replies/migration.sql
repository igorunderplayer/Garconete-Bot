-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoReply" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "AutoReply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutoReply" ADD CONSTRAINT "AutoReply_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
