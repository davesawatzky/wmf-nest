-- AlterTable
ALTER TABLE "tbl_registration" ADD COLUMN     "teacherID" INTEGER;

-- AddForeignKey
ALTER TABLE "tbl_registration" ADD CONSTRAINT "tbl_registration_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "tbl_teachers"("id") ON DELETE SET NULL ON UPDATE RESTRICT;
