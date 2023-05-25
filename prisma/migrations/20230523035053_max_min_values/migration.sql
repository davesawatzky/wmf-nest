/*
  Warnings:

  - You are about to drop the column `max_selection` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `min_selection` on the `tbl_classlist` table. All the data in the column will be lost.
  - Added the required column `max_selections` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_selections` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_classlist" RENAME COLUMN "max_selection" TO "max_selections";
ALTER TABLE "tbl_classlist" RENAME COLUMN "min_selection" TO "min_selections";

-- AlterTable
ALTER TABLE "tbl_reg_classes" ADD COLUMN     "max_selections" SMALLINT,
ADD COLUMN     "min_selections" SMALLINT;
