/*
  Warnings:

  - Added the required column `userId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Link_userId_idx" ON "Link"("userId");
