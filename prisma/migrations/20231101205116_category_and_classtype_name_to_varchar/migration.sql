/*
  Warnings:

  - You are about to alter the column `name` on the `tbl_category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `tbl_class_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "tbl_category" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "tbl_class_type" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);
