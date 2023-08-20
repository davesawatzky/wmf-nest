/*
  Warnings:

  - Made the column `custom_field` on table `tbl_field_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `community_required` on table `tbl_field_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `group_required` on table `tbl_field_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `school_required` on table `tbl_field_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `solo_required` on table `tbl_field_config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_field_config" ALTER COLUMN "custom_field" SET NOT NULL,
ALTER COLUMN "community_required" SET NOT NULL,
ALTER COLUMN "group_required" SET NOT NULL,
ALTER COLUMN "school_required" SET NOT NULL,
ALTER COLUMN "solo_required" SET NOT NULL;
