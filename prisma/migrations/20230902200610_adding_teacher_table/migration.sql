-- CreateTable
CREATE TABLE "tbl_teachers" (
    "id" SERIAL NOT NULL,
    "regID" INTEGER NOT NULL,
    "prefix" TEXT,
    "last_name" TEXT,
    "first_name" TEXT,
    "apartment" TEXT,
    "street_number" TEXT,
    "steet_name" TEXT,
    "city" TEXT,
    "province" TEXT,
    "postal_code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_teachers_pkey" PRIMARY KEY ("id")
);
