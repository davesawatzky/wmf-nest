/*
  Warnings:

  - You are about to drop the column `requiredComposer` on the `tbl_category` table. All the data in the column will be lost.
  - You are about to drop the column `classNumber` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `maxSelection` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `minSelection` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `requiredSelection` on the `tbl_classlist` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `tbl_level` table. All the data in the column will be lost.
  - You are about to drop the column `classNumber` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfSelections` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - You are about to drop the column `schoolCommunityId` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_classes` table. All the data in the column will be lost.
  - You are about to drop the column `conflictPerformers` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `earliestTime` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `latestTime` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_community` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_group` table. All the data in the column will be lost.
  - You are about to drop the column `groupType` on the `tbl_reg_group` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfPerformers` on the `tbl_reg_group` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_group` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `otherClasses` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_performer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_school` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `tbl_reg_school` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `tbl_reg_school` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `tbl_reg_school` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_school` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_selection` table. All the data in the column will be lost.
  - You are about to drop the column `largerWork` on the `tbl_reg_selection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_selection` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_teacher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_reg_unavailable` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_reg_unavailable` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `payedAmt` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `performerType` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `submittedAt` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmt` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `transactionInfo` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_registration` table. All the data in the column will be lost.
  - You are about to drop the column `largeWork` on the `tbl_sacred` table. All the data in the column will be lost.
  - You are about to drop the column `SGSlabel` on the `tbl_subdiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `maxPerformers` on the `tbl_subdiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `minPerformers` on the `tbl_subdiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tbl_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_number]` on the table `tbl_classlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_number` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_selection` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_selection` to the `tbl_classlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `large_work` to the `tbl_sacred` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SGS_label` to the `tbl_subdiscipline` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tbl_classlist_classNumber_key";

-- AlterTable
ALTER TABLE "tbl_category" DROP COLUMN "requiredComposer",
ADD COLUMN     "required_composer" VARCHAR(255);

-- AlterTable
ALTER TABLE "tbl_classlist" DROP COLUMN "classNumber",
DROP COLUMN "maxSelection",
DROP COLUMN "minSelection",
DROP COLUMN "requiredSelection",
ADD COLUMN     "class_number" VARCHAR(12) NOT NULL,
ADD COLUMN     "max_selection" INTEGER NOT NULL,
ADD COLUMN     "min_selection" INTEGER NOT NULL,
ADD COLUMN     "required_selection" VARCHAR(255);

-- AlterTable
ALTER TABLE "tbl_level" DROP COLUMN "order",
ADD COLUMN     "sort_order" INTEGER;

-- AlterTable
ALTER TABLE "tbl_reg_classes" DROP COLUMN "classNumber",
DROP COLUMN "createdAt",
DROP COLUMN "numberOfSelections",
DROP COLUMN "schoolCommunityId",
DROP COLUMN "updatedAt",
ADD COLUMN     "class_number" VARCHAR(9),
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "number_of_selections" SMALLINT,
ADD COLUMN     "school_communityId" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_community" DROP COLUMN "conflictPerformers",
DROP COLUMN "createdAt",
DROP COLUMN "earliestTime",
DROP COLUMN "latestTime",
DROP COLUMN "updatedAt",
ADD COLUMN     "conflict_performers" TEXT,
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "earliest_time" VARCHAR(20),
ADD COLUMN     "latest_time" VARCHAR(20),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_group" DROP COLUMN "createdAt",
DROP COLUMN "groupType",
DROP COLUMN "numberOfPerformers",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "group_type" VARCHAR(15),
ADD COLUMN     "number_of_performers" SMALLINT,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_performer" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "otherClasses",
DROP COLUMN "postalCode",
DROP COLUMN "streetName",
DROP COLUMN "streetNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR(30),
ADD COLUMN     "last_name" VARCHAR(30),
ADD COLUMN     "other_classes" VARCHAR(255),
ADD COLUMN     "postal_code" VARCHAR(7),
ADD COLUMN     "street_name" VARCHAR(50),
ADD COLUMN     "street_number" VARCHAR(6),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_school" DROP COLUMN "createdAt",
DROP COLUMN "postalCode",
DROP COLUMN "streetName",
DROP COLUMN "streetNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postal_code" VARCHAR(7),
ADD COLUMN     "street_name" VARCHAR(100),
ADD COLUMN     "street_number" VARCHAR(6),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_selection" DROP COLUMN "createdAt",
DROP COLUMN "largerWork",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "larger_work" VARCHAR(100),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_teacher" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "postalCode",
DROP COLUMN "streetName",
DROP COLUMN "streetNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR(30),
ADD COLUMN     "last_name" VARCHAR(30),
ADD COLUMN     "postal_code" VARCHAR(7),
ADD COLUMN     "street_name" VARCHAR(100),
ADD COLUMN     "street_number" VARCHAR(6),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_reg_unavailable" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_registration" DROP COLUMN "createdAt",
DROP COLUMN "payedAmt",
DROP COLUMN "performerType",
DROP COLUMN "submittedAt",
DROP COLUMN "totalAmt",
DROP COLUMN "transactionInfo",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "payed_amt" DECIMAL(10,2),
ADD COLUMN     "performer_type" "tbl_registration_performerType" NOT NULL DEFAULT 'SOLO',
ADD COLUMN     "submitted_at" TIMESTAMP,
ADD COLUMN     "total_amt" DECIMAL(10,2),
ADD COLUMN     "transaction_info" VARCHAR(200),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tbl_sacred" DROP COLUMN "largeWork",
ADD COLUMN     "large_work" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "tbl_subdiscipline" DROP COLUMN "SGSlabel",
DROP COLUMN "maxPerformers",
DROP COLUMN "minPerformers",
ADD COLUMN     "SGS_label" "tbl_subdiscipline_SGSlabel" NOT NULL,
ADD COLUMN     "max_performers" INTEGER,
ADD COLUMN     "min_performers" INTEGER;

-- AlterTable
ALTER TABLE "tbl_user" DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "postalCode",
DROP COLUMN "streetName",
DROP COLUMN "streetNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR(30),
ADD COLUMN     "last_name" VARCHAR(30),
ADD COLUMN     "postal_code" VARCHAR(7),
ADD COLUMN     "street_name" VARCHAR(50),
ADD COLUMN     "street_number" VARCHAR(6),
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_classlist_class_number_key" ON "tbl_classlist"("class_number");
