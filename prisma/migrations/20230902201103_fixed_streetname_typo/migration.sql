/*
  Warnings:

  - You are about to drop the column `steet_name` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `steet_name` on the `tbl_teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_reg_teacher" DROP COLUMN "steet_name",
ADD COLUMN     "street_name" TEXT;

-- AlterTable
ALTER TABLE "tbl_teachers" DROP COLUMN "steet_name",
ADD COLUMN     "street_name" TEXT;
