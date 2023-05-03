/*
  Warnings:

  - You are about to drop the column `school_communityID` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - The `performer_type` column on the `tbl_registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tbl_reg_classes" DROP COLUMN "school_communityID",
ADD COLUMN     "school_groupID" INTEGER;

-- AlterTable
ALTER TABLE "tbl_registration" DROP COLUMN "performer_type",
ADD COLUMN     "performer_type" "tbl_SGS" NOT NULL DEFAULT 'SOLO';

-- DropEnum
DROP TYPE "tbl_registration_performer_type";

-- CreateTable
CREATE TABLE "tbl_reg_schoolgroup" (
    "id" SERIAL NOT NULL,
    "schoolID" INTEGER NOT NULL,
    "name" TEXT,
    "group_size" INTEGER,
    "chaperones" INTEGER,
    "wheelchairs" INTEGER,
    "earliest_time" TEXT,
    "latest_time" TEXT,
    "unavailable" TEXT,
    "conflict_performers" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_schoolgroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_reg_schoolgroup_schoolID_idx" ON "tbl_reg_schoolgroup"("schoolID");

-- AddForeignKey
ALTER TABLE "tbl_reg_classes" ADD CONSTRAINT "tbl_reg_classes_school_groupID_fkey" FOREIGN KEY ("school_groupID") REFERENCES "tbl_reg_schoolgroup"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_schoolgroup" ADD CONSTRAINT "tbl_reg_schoolgroup_schoolID_fkey" FOREIGN KEY ("schoolID") REFERENCES "tbl_reg_school"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
