-- CreateEnum
CREATE TYPE "tbl_SGS" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "tbl_subdiscipline_SGSlabel" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateTable
CREATE TABLE "tbl_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "required_composer" TEXT,

    CONSTRAINT "tbl_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_class_trophy" (
    "classID" INTEGER NOT NULL,
    "trophyID" INTEGER NOT NULL,

    CONSTRAINT "tbl_class_trophy_pkey" PRIMARY KEY ("classID","trophyID")
);

-- CreateTable
CREATE TABLE "tbl_classlist" (
    "id" SERIAL NOT NULL,
    "classNumber" TEXT NOT NULL,
    "subdisciplineID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "levelID" INTEGER NOT NULL,
    "min_selection" INTEGER NOT NULL,
    "max_selection" INTEGER NOT NULL,
    "required_selection" TEXT,
    "SGS_label" "tbl_SGS" NOT NULL DEFAULT 'SOLO',
    "price" DECIMAL(7,2),

    CONSTRAINT "tbl_classlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_discipline" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tbl_discipline_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "tbl_level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER,

    CONSTRAINT "tbl_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_classes" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "class_number" TEXT,
    "discipline" TEXT,
    "subdiscipline" TEXT,
    "level" TEXT,
    "category" TEXT,
    "number_of_selections" SMALLINT,
    "school_groupID" INTEGER,
    "price" DECIMAL(7,2),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_group" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" TEXT,
    "group_type" TEXT,
    "number_of_performers" SMALLINT,
    "age" SMALLINT,
    "instruments" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_performer" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT,
    "apartment" TEXT,
    "street_number" TEXT,
    "street_name" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Winnipeg',
    "province" TEXT NOT NULL DEFAULT 'MB',
    "postal_code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "age" SMALLINT,
    "instrument" TEXT,
    "level" TEXT,
    "other_classes" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_school" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" TEXT DEFAULT '',
    "division" TEXT,
    "street_number" TEXT,
    "street_name" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Winnipeg',
    "province" TEXT NOT NULL DEFAULT 'MB',
    "postal_code" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_schoolgroup" (
    "id" SERIAL NOT NULL,
    "schoolID" INTEGER NOT NULL,
    "name" TEXT,
    "group_size" INTEGER,
    "chaperones" INTEGER,
    "wheelchairs" INTEGER,
    "earliest_time" TEXT,
    "latest_time" TEXT,
    "unavailable" TEXT,
    "conflict_performers" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_schoolgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_selection" (
    "id" SERIAL NOT NULL,
    "classpickID" INTEGER NOT NULL,
    "title" TEXT,
    "larger_work" TEXT,
    "movement" TEXT,
    "composer" TEXT,
    "duration" TEXT NOT NULL DEFAULT '0:00',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_teacher" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "prefix" TEXT,
    "last_name" TEXT,
    "first_name" TEXT,
    "apartment" TEXT,
    "street_number" TEXT,
    "steet_name" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Winnipeg',
    "province" TEXT NOT NULL DEFAULT 'MB',
    "postal_code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_unavailable" (
    "id" SERIAL NOT NULL,
    "groupID" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME(0) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_unavailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_registration" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER DEFAULT 0,
    "label" TEXT NOT NULL DEFAULT 'Registration Form',
    "performer_type" "tbl_SGS" NOT NULL DEFAULT 'SOLO',
    "submitted_at" TIMESTAMP,
    "total_amt" DECIMAL(10,2),
    "payed_amt" DECIMAL(10,2),
    "transaction_info" TEXT,
    "submission" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_sacred" (
    "id" INTEGER NOT NULL,
    "composer" TEXT NOT NULL,
    "large_work" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "tbl_sacred_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_subdiscipline" (
    "id" SERIAL NOT NULL,
    "disciplineID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "max_performers" INTEGER,
    "min_performers" INTEGER,
    "SGS_label" "tbl_subdiscipline_SGSlabel" NOT NULL,
    "price" DECIMAL(7,2),

    CONSTRAINT "tbl_subdiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_trophy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "tbl_trophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "first_name" TEXT,
    "last_name" TEXT,
    "apartment" TEXT,
    "street_number" TEXT,
    "street_name" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postal_code" TEXT,
    "phone" TEXT,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_community" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" TEXT,
    "group_size" INTEGER,
    "chaperones" INTEGER,
    "wheelchairs" INTEGER,
    "earliest_time" TEXT,
    "latest_time" TEXT,
    "unavailable" TEXT,
    "conflict_performers" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_instruments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "tbl_instruments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tbl_class_trophy_trophyID_idx" ON "tbl_class_trophy"("trophyID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_classlist_classNumber_key" ON "tbl_classlist"("classNumber");

-- CreateIndex
CREATE INDEX "tbl_classlist_categoryID_idx" ON "tbl_classlist"("categoryID");

-- CreateIndex
CREATE INDEX "tbl_classlist_levelID_idx" ON "tbl_classlist"("levelID");

-- CreateIndex
CREATE INDEX "tbl_classlist_subdisciplineID_idx" ON "tbl_classlist"("subdisciplineID");

-- CreateIndex
CREATE INDEX "tbl_reg_classes_regID_idx" ON "tbl_reg_classes"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_group_regID_idx" ON "tbl_reg_group"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_performer_regID_idx" ON "tbl_reg_performer"("regID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reg_school_regID_key" ON "tbl_reg_school"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_school_regID_idx" ON "tbl_reg_school"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_schoolgroup_schoolID_idx" ON "tbl_reg_schoolgroup"("schoolID");

-- CreateIndex
CREATE INDEX "tbl_reg_selection_classpickID_idx" ON "tbl_reg_selection"("classpickID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reg_teacher_regID_key" ON "tbl_reg_teacher"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_teacher_regID_idx" ON "tbl_reg_teacher"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_unavailable_groupID_idx" ON "tbl_reg_unavailable"("groupID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_registration_submission_key" ON "tbl_registration"("submission");

-- CreateIndex
CREATE INDEX "tbl_registration_userID_idx" ON "tbl_registration"("userID");

-- CreateIndex
CREATE INDEX "tbl_subdiscipline_disciplineID_idx" ON "tbl_subdiscipline"("disciplineID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE INDEX "tbl_reg_community_regID_idx" ON "tbl_reg_community"("regID");

-- AddForeignKey
ALTER TABLE "tbl_class_trophy" ADD CONSTRAINT "tbl_class_trophy_classID_fkey" FOREIGN KEY ("classID") REFERENCES "tbl_classlist"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_class_trophy" ADD CONSTRAINT "tbl_class_trophy_trophyID_fkey" FOREIGN KEY ("trophyID") REFERENCES "tbl_trophy"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_classlist" ADD CONSTRAINT "tbl_classlist_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "tbl_category"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_classlist" ADD CONSTRAINT "tbl_classlist_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "tbl_level"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_classlist" ADD CONSTRAINT "tbl_classlist_subdisciplineID_fkey" FOREIGN KEY ("subdisciplineID") REFERENCES "tbl_subdiscipline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_classes" ADD CONSTRAINT "tbl_reg_classes_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_classes" ADD CONSTRAINT "tbl_reg_classes_school_groupID_fkey" FOREIGN KEY ("school_groupID") REFERENCES "tbl_reg_schoolgroup"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_group" ADD CONSTRAINT "tbl_reg_group_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_performer" ADD CONSTRAINT "tbl_reg_performer_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_school" ADD CONSTRAINT "tbl_reg_school_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_schoolgroup" ADD CONSTRAINT "tbl_reg_schoolgroup_schoolID_fkey" FOREIGN KEY ("schoolID") REFERENCES "tbl_reg_school"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_selection" ADD CONSTRAINT "tbl_reg_selection_classpickID_fkey" FOREIGN KEY ("classpickID") REFERENCES "tbl_reg_classes"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_teacher" ADD CONSTRAINT "tbl_reg_teacher_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_unavailable" ADD CONSTRAINT "tbl_reg_unavailable_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "tbl_reg_group"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_registration" ADD CONSTRAINT "tbl_registration_userID_fkey" FOREIGN KEY ("userID") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_subdiscipline" ADD CONSTRAINT "tbl_subdiscipline_disciplineID_fkey" FOREIGN KEY ("disciplineID") REFERENCES "tbl_discipline"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_reg_community" ADD CONSTRAINT "tbl_reg_community_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
