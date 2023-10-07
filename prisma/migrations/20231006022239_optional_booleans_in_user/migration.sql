-- AlterTable
ALTER TABLE "tbl_user" ALTER COLUMN "staff" DROP NOT NULL,
ALTER COLUMN "admin" DROP NOT NULL,
ALTER COLUMN "private_teacher" DROP NOT NULL,
ALTER COLUMN "school_teacher" DROP NOT NULL;
