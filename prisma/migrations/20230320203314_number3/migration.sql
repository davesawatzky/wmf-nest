/*
  Warnings:

  - You are about to drop the column `SGSlabel` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `groupSize` on the `tbl_reg_community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_classlist" DROP COLUMN "SGSlabel",
ADD COLUMN     "SGS_label" "tbl_SGS" NOT NULL DEFAULT 'SOLO';

-- AlterTable
ALTER TABLE "tbl_reg_community" DROP COLUMN "groupSize",
ADD COLUMN     "group_size" INTEGER;
