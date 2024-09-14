/*
  Warnings:

  - A unique constraint covering the columns `[subdisciplineID,categoryID,levelID]` on the table `tbl_classlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tbl_classlist_subdisciplineID_categoryID_levelID_key" ON "tbl_classlist"("subdisciplineID", "categoryID", "levelID");
