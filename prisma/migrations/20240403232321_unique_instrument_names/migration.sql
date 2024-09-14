/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tbl_instruments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbl_instruments" ALTER COLUMN "name" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_instruments_name_key" ON "tbl_instruments"("name");
