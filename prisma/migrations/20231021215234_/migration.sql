/*
  Warnings:

  - You are about to drop the column `discipline` on the `tbl_instruments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_instruments" DROP COLUMN "discipline",
ADD COLUMN     "disciplineID" INTEGER;

-- AddForeignKey
ALTER TABLE "tbl_instruments" ADD CONSTRAINT "tbl_instruments_disciplineID_fkey" FOREIGN KEY ("disciplineID") REFERENCES "tbl_discipline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
