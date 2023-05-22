-- CreateEnum
CREATE TYPE "tbl_SGS" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "tbl_registration_performerType" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "tbl_subdiscipline_SGSlabel" AS ENUM ('SOLO', 'GROUP', 'SCHOOL', 'COMMUNITY');

-- CreateTable
CREATE TABLE "tbl_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "requiredComposer" VARCHAR(255),

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
    "classNumber" VARCHAR(12) NOT NULL,
    "subdisciplineID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "levelID" INTEGER NOT NULL,
    "minSelection" INTEGER NOT NULL,
    "maxSelection" INTEGER NOT NULL,
    "requiredSelection" VARCHAR(255),
    "SGSlabel" "tbl_SGS" NOT NULL DEFAULT 'SOLO',
    "price" DECIMAL(7,2),

    CONSTRAINT "tbl_classlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_discipline" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbl_discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_level" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "order" INTEGER,

    CONSTRAINT "tbl_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_classes" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "classNumber" VARCHAR(9),
    "discipline" VARCHAR(30),
    "subdiscipline" VARCHAR(30),
    "level" VARCHAR(30),
    "category" VARCHAR(30),
    "numberOfSelections" SMALLINT,
    "schoolCommunityId" INTEGER,
    "price" DECIMAL(7,2),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_group" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" VARCHAR(50),
    "groupType" VARCHAR(15),
    "numberOfPerformers" SMALLINT,
    "age" SMALLINT,
    "instruments" VARCHAR(200),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_performer" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "lastName" VARCHAR(30),
    "firstName" VARCHAR(30),
    "apartment" VARCHAR(5),
    "streetNumber" VARCHAR(6),
    "streetName" VARCHAR(50),
    "city" VARCHAR(30) NOT NULL DEFAULT 'Winnipeg',
    "province" VARCHAR(2) NOT NULL DEFAULT 'MB',
    "postalCode" VARCHAR(7),
    "phone" VARCHAR(14),
    "email" VARCHAR(50),
    "age" SMALLINT,
    "instrument" VARCHAR(50),
    "level" VARCHAR(20),
    "otherClasses" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_school" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" VARCHAR(50) DEFAULT '',
    "division" VARCHAR(50),
    "streetNumber" VARCHAR(6),
    "streetName" VARCHAR(100),
    "city" VARCHAR(30) NOT NULL DEFAULT 'Winnipeg',
    "province" VARCHAR(30) NOT NULL DEFAULT 'MB',
    "postalCode" VARCHAR(7),
    "phone" VARCHAR(14),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_selection" (
    "id" SERIAL NOT NULL,
    "classpickID" INTEGER NOT NULL,
    "title" VARCHAR(100),
    "largerWork" VARCHAR(100),
    "movement" VARCHAR(30),
    "composer" VARCHAR(30),
    "duration" VARCHAR(10) NOT NULL DEFAULT '0:00',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_teacher" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "prefix" VARCHAR(5),
    "lastName" VARCHAR(30),
    "firstName" VARCHAR(30),
    "apartment" VARCHAR(5),
    "streetNumber" VARCHAR(6),
    "streetName" VARCHAR(100),
    "city" VARCHAR(30) NOT NULL DEFAULT 'Winnipeg',
    "province" VARCHAR(30) NOT NULL DEFAULT 'MB',
    "postalCode" VARCHAR(7),
    "phone" VARCHAR(14),
    "email" VARCHAR(50),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_unavailable" (
    "id" SERIAL NOT NULL,
    "groupID" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME(0) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_unavailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_registration" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER DEFAULT 0,
    "label" VARCHAR(100) NOT NULL DEFAULT 'Registration Form',
    "performerType" "tbl_registration_performerType" NOT NULL DEFAULT 'SOLO',
    "submittedAt" TIMESTAMP,
    "totalAmt" DECIMAL(10,2),
    "payedAmt" DECIMAL(10,2),
    "transactionInfo" VARCHAR(200),
    "confirmation" VARCHAR(20),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_sacred" (
    "id" INTEGER NOT NULL,
    "composer" VARCHAR(255) NOT NULL,
    "largeWork" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "tbl_sacred_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_subdiscipline" (
    "id" SERIAL NOT NULL,
    "disciplineID" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "maxPerformers" INTEGER,
    "minPerformers" INTEGER,
    "SGSlabel" "tbl_subdiscipline_SGSlabel" NOT NULL,
    "price" DECIMAL(7,2),

    CONSTRAINT "tbl_subdiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_trophy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "tbl_trophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "firstName" VARCHAR(30),
    "lastName" VARCHAR(30),
    "apartment" VARCHAR(5),
    "streetNumber" VARCHAR(6),
    "streetName" VARCHAR(50),
    "city" VARCHAR(30),
    "province" VARCHAR(2),
    "postalCode" VARCHAR(7),
    "phone" VARCHAR(14),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reg_community" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "name" VARCHAR(50),
    "groupSize" INTEGER,
    "chaperones" INTEGER,
    "wheelchairs" INTEGER,
    "earliestTime" VARCHAR(20),
    "latestTime" VARCHAR(20),
    "unavailable" TEXT,
    "conflictPerformers" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_reg_community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_instruments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL DEFAULT '0',

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
CREATE UNIQUE INDEX "school_constraint" ON "tbl_reg_school"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_school_regID_idx" ON "tbl_reg_school"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_selection_classpickID_idx" ON "tbl_reg_selection"("classpickID");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_constraint" ON "tbl_reg_teacher"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_teacher_regID_idx" ON "tbl_reg_teacher"("regID");

-- CreateIndex
CREATE INDEX "tbl_reg_unavailable_groupID_idx" ON "tbl_reg_unavailable"("groupID");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_registration_confirmation_key" ON "tbl_registration"("confirmation");

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
ALTER TABLE "tbl_reg_group" ADD CONSTRAINT "tbl_reg_group_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_performer" ADD CONSTRAINT "tbl_reg_performer_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tbl_reg_school" ADD CONSTRAINT "tbl_reg_school_regID_fkey" FOREIGN KEY ("regID") REFERENCES "tbl_registration"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

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
