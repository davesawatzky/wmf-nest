/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tbl_class_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_discipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_subdiscipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_trophy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tbl_class_type_name_key" ON "tbl_class_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_discipline_name_key" ON "tbl_discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_level_name_key" ON "tbl_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_subdiscipline_name_key" ON "tbl_subdiscipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_trophy_name_key" ON "tbl_trophy"("name");
