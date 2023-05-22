/*
  Warnings:

  - You are about to drop the column `SGS_label` on the `tbl_classlist` table. All the data in the column will be lost.
  - The `performer_type` column on the `tbl_registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `SGS_label` on the `tbl_subdiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_exp` on the `tbl_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[regID]` on the table `tbl_reg_community` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[regID]` on the table `tbl_reg_group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `performer_type` to the `tbl_subdiscipline` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tbl_performer_type" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "tbl_subdiscipline_performer_type" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- AlterTable
ALTER TABLE "tbl_classlist" DROP COLUMN "SGS_label",
ADD COLUMN     "performer_type" "tbl_performer_type" NOT NULL DEFAULT 'SOLO';

-- AlterTable
ALTER TABLE "tbl_registration" DROP COLUMN "performer_type",
ADD COLUMN     "performer_type" "tbl_performer_type" NOT NULL DEFAULT 'SOLO';

-- AlterTable
ALTER TABLE "tbl_subdiscipline" DROP COLUMN "SGS_label",
ADD COLUMN     "performer_type" "tbl_subdiscipline_performer_type" NOT NULL;

-- AlterTable
ALTER TABLE "tbl_user" DROP COLUMN "refresh_token",
DROP COLUMN "refresh_token_exp";

-- DropEnum
DROP TYPE "tbl_SGS";

-- DropEnum
DROP TYPE "tbl_subdiscipline_SGSlabel";

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reg_community_regID_key" ON "tbl_reg_community"("regID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reg_group_regID_key" ON "tbl_reg_group"("regID");
