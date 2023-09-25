-- AlterTable
ALTER TABLE "tbl_reg_performer" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tbl_reg_school" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tbl_reg_teacher" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tbl_registration" ALTER COLUMN "label" DROP NOT NULL;
