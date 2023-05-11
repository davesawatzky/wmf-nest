/*
  Warnings:

  - You are about to drop the column `classNumber` on the `tbl_classlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_number]` on the table `tbl_classlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_number` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tbl_classlist_classNumber_key";

-- AlterTable
ALTER TABLE "tbl_classlist" DROP COLUMN "classNumber",
ADD COLUMN     "class_number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "refresh_token_exp" TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_classlist_class_number_key" ON "tbl_classlist"("class_number");
