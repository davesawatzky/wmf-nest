/*
  Warnings:

  - You are about to drop the `tbl_reg_errors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_reg_errors" DROP CONSTRAINT "tbl_reg_errors_regID_fkey";

-- DropTable
DROP TABLE "tbl_reg_errors";
