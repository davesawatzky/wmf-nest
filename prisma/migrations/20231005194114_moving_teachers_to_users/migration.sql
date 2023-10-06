-- DropForeignKey
ALTER TABLE "tbl_reg_teacher" DROP CONSTRAINT "tbl_reg_teacher_regID_fkey";

-- DropForeignKey
ALTER TABLE "tbl_registration" DROP CONSTRAINT "tbl_registration_teacherID_fkey";

-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "instrument" TEXT,
ADD COLUMN     "private_teacher" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "school_teacher" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "tbl_registration_teacherID_idx" ON "tbl_registration"("teacherID");

-- AddForeignKey
ALTER TABLE "tbl_registration" ADD CONSTRAINT "tbl_registration_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE RESTRICT;
