/*
  Warnings:

  - A unique constraint covering the columns `[table_name,field_name]` on the table `tbl_field_config` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "tbl_reg_errors" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "class_errors" SMALLINT,
    "group_info_errors" SMALLINT,
    "group_performers_errors" SMALLINT,
    "group_teacher_errors" SMALLINT,
    "solo_performer_errors" SMALLINT,
    "solo_teacher_errors" SMALLINT,
    "school_info_errors" SMALLINT,
    "school_teacher_errors" SMALLINT,
    "school_group_errors" SMALLINT,
    "school_groups_errors" SMALLINT,
    "community_info_errors" SMALLINT,
    "community_teacher_errors" SMALLINT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_errors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reg_errors_regID_key" ON "tbl_reg_errors"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_errors_regID_idx" ON "tbl_reg_errors"("regID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_field_config_table_name_field_name_key" ON "tbl_field_config"("table_name", "field_name");

-- AddForeignKey
ALTER TABLE "tbl_reg_errors" ADD CONSTRAINT "tbl_reg_errors_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
