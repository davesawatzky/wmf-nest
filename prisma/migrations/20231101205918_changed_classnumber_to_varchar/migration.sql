/*
  Warnings:

  - The primary key for the `tbl_class_trophy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `class_number` on the `tbl_class_trophy` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `class_number` on the `tbl_classlist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `class_number` on the `tbl_reg_classes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- DropForeignKey
ALTER TABLE "tbl_class_trophy" DROP CONSTRAINT "tbl_class_trophy_class_number_fkey";

-- AlterTable
ALTER TABLE "tbl_class_trophy" DROP CONSTRAINT "tbl_class_trophy_pkey",
ALTER COLUMN "class_number" SET DATA TYPE VARCHAR(15),
ADD CONSTRAINT "tbl_class_trophy_pkey" PRIMARY KEY ("class_number", "trophyID");

-- AlterTable
ALTER TABLE "tbl_classlist" ALTER COLUMN "class_number" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "tbl_reg_classes" ALTER COLUMN "class_number" SET DATA TYPE VARCHAR(15);

-- AddForeignKey
ALTER TABLE "tbl_class_trophy" ADD CONSTRAINT "tbl_class_trophy_class_number_fkey" FOREIGN KEY ("class_number") REFERENCES "tbl_classlist"("class_number") ON DELETE CASCADE ON UPDATE RESTRICT;
