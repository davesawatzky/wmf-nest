-- AlterTable
ALTER TABLE "tbl_reg_selection" ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "duration" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tbl_reg_teacher" ADD COLUMN     "instrument" TEXT;
