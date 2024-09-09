/*
  Warnings:

  - You are about to drop the column `chaperones` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `conflict_performers` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `earliest_time` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `group_size` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `latest_time` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `unavailable` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `wheelchairs` on the `tbl_reg_community` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `tbl_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_class_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subdisciplineID,categoryID,levelID]` on the table `tbl_classlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_discipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_instruments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_level` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_subdiscipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tbl_trophy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbl_instruments" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tbl_reg_classes" ADD COLUMN     "community_groupID" INTEGER;

-- AlterTable
ALTER TABLE "tbl_reg_community" DROP COLUMN "chaperones",
DROP COLUMN "conflict_performers",
DROP COLUMN "earliest_time",
DROP COLUMN "group_size",
DROP COLUMN "latest_time",
DROP COLUMN "unavailable",
DROP COLUMN "wheelchairs",
ADD COLUMN     "city" TEXT DEFAULT 'Winnipeg',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "province" TEXT DEFAULT 'MB',
ADD COLUMN     "street_name" TEXT,
ADD COLUMN     "street_number" TEXT;

-- CreateTable
CREATE TABLE "tbl_reg_communitygroup" (
    "id" SERIAL NOT NULL,
    "communityID" INTEGER NOT NULL,
    "name" TEXT,
    "group_size" INTEGER,
    "chaperones" INTEGER,
    "wheelchairs" INTEGER,
    "earliest_time" TEXT,
    "latest_time" TEXT,
    "unavailable" TEXT,
    "conflict_performers" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_communitygroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_reg_communitygroup_communityID_idx" ON "tbl_reg_communitygroup"("communityID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_category_name_key" ON "tbl_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_class_type_name_key" ON "tbl_class_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_classlist_subdisciplineID_categoryID_levelID_key" ON "tbl_classlist"("subdisciplineID", "categoryID", "levelID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_discipline_name_key" ON "tbl_discipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_instruments_name_key" ON "tbl_instruments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_level_name_key" ON "tbl_level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_subdiscipline_name_key" ON "tbl_subdiscipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_trophy_name_key" ON "tbl_trophy"("name");

-- AddForeignKey
ALTER TABLE "tbl_reg_classes" ADD CONSTRAINT "tbl_reg_classes_community_groupID_fkey" FOREIGN KEY ("community_groupID") REFERENCES "tbl_reg_communitygroup"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_communitygroup" ADD CONSTRAINT "tbl_reg_communitygroup_communityID_fkey" FOREIGN KEY ("communityID") REFERENCES "tbl_reg_community"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
