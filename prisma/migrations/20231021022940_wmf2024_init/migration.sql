/*
  Warnings:

  - Added the required column `class_typeID` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_classlist" ADD COLUMN     "class_typeID" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tbl_class_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tbl_class_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_classlist_class_typeID_idx" ON "tbl_classlist"("class_typeID");

-- AddForeignKey
ALTER TABLE "tbl_classlist" ADD CONSTRAINT "tbl_classlist_class_typeID_fkey" FOREIGN KEY ("class_typeID") REFERENCES "tbl_class_type"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
