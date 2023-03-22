/*
  Warnings:

  - You are about to drop the column `school_communityId` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - The `performer_type` column on the `tbl_registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "tbl_registration_performer_type" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- AlterTable
ALTER TABLE "tbl_category" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "required_composer" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_classlist" ALTER COLUMN "class_number" SET DATA TYPE TEXT,
ALTER COLUMN "required_selection" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_discipline" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_instruments" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_level" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_classes" DROP COLUMN "school_communityId",
ADD COLUMN     "school_communityID" INTEGER,
ALTER COLUMN "discipline" SET DATA TYPE TEXT,
ALTER COLUMN "subdiscipline" SET DATA TYPE TEXT,
ALTER COLUMN "level" SET DATA TYPE TEXT,
ALTER COLUMN "category" SET DATA TYPE TEXT,
ALTER COLUMN "class_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_community" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "earliest_time" SET DATA TYPE TEXT,
ALTER COLUMN "latest_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_group" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "instruments" SET DATA TYPE TEXT,
ALTER COLUMN "group_type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_performer" ALTER COLUMN "apartment" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "instrument" SET DATA TYPE TEXT,
ALTER COLUMN "level" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "other_classes" SET DATA TYPE TEXT,
ALTER COLUMN "postal_code" SET DATA TYPE TEXT,
ALTER COLUMN "street_name" SET DATA TYPE TEXT,
ALTER COLUMN "street_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_school" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "division" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "postal_code" SET DATA TYPE TEXT,
ALTER COLUMN "street_name" SET DATA TYPE TEXT,
ALTER COLUMN "street_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_selection" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "movement" SET DATA TYPE TEXT,
ALTER COLUMN "composer" SET DATA TYPE TEXT,
ALTER COLUMN "duration" SET DATA TYPE TEXT,
ALTER COLUMN "larger_work" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_reg_teacher" ALTER COLUMN "prefix" SET DATA TYPE TEXT,
ALTER COLUMN "apartment" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "postal_code" SET DATA TYPE TEXT,
ALTER COLUMN "street_name" SET DATA TYPE TEXT,
ALTER COLUMN "street_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_registration" ALTER COLUMN "label" SET DATA TYPE TEXT,
ALTER COLUMN "submission" SET DATA TYPE TEXT,
DROP COLUMN "performer_type",
ADD COLUMN     "performer_type" "tbl_registration_performer_type" NOT NULL DEFAULT 'SOLO',
ALTER COLUMN "transaction_info" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_sacred" ALTER COLUMN "composer" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "large_work" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_subdiscipline" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_trophy" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tbl_user" ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "apartment" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "postal_code" SET DATA TYPE TEXT,
ALTER COLUMN "street_name" SET DATA TYPE TEXT,
ALTER COLUMN "street_number" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "tbl_registration_performerType";

-- CreateTable
CREATE TABLE "tbl_field_config" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "submission_required" BOOLEAN NOT NULL,
    "custom_field" BOOLEAN,
    "custom_field_type" TEXT,

    CONSTRAINT "tbl_field_config_pkey" PRIMARY KEY ("id")
);

-- RenameIndex
ALTER INDEX "school_constraint" RENAME TO "tbl_reg_school_regID_key";

-- RenameIndex
ALTER INDEX "teacher_constraint" RENAME TO "tbl_reg_teacher_regID_key";
