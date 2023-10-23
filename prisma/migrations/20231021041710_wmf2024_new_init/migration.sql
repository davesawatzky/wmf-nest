/*
  Warnings:

  - The primary key for the `tbl_class_trophy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classID` on the `tbl_class_trophy` table. All the data in the column will be lost.
  - Added the required column `class_number` to the `tbl_class_trophy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tbl_class_type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_class_trophy" DROP CONSTRAINT "tbl_class_trophy_classID_fkey";

-- AlterTable
ALTER TABLE "tbl_class_trophy" DROP CONSTRAINT "tbl_class_trophy_pkey",
DROP COLUMN "classID",
ADD COLUMN     "class_number" TEXT NOT NULL,
ADD CONSTRAINT "tbl_class_trophy_pkey" PRIMARY KEY ("class_number", "trophyID");

-- AlterTable
ALTER TABLE "tbl_class_type" ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_class_trophy" ADD CONSTRAINT "tbl_class_trophy_class_number_fkey" FOREIGN KEY ("class_number") REFERENCES "tbl_classlist"("class_number") ON DELETE CASCADE ON UPDATE RESTRICT;
