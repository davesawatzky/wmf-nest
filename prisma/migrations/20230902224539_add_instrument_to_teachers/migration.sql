/*
  Warnings:

  - You are about to drop the column `regID` on the `tbl_teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_teachers" DROP COLUMN "regID",
ADD COLUMN     "instrument" TEXT;
