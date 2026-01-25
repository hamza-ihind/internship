/*
  Warnings:

  - The values [ACTIVE] on the enum `InternshipStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `endsAt` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `openings` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `postedById` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `screeningQuestions` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `stipend` on the `Internship` table. All the data in the column will be lost.
  - Added the required column `city` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullDescription` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internshipType` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredLevel` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InternshipStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED');
ALTER TABLE "Internship" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Internship" ALTER COLUMN "status" TYPE "InternshipStatus_new" USING ("status"::text::"InternshipStatus_new");
ALTER TYPE "InternshipStatus" RENAME TO "InternshipStatus_old";
ALTER TYPE "InternshipStatus_new" RENAME TO "InternshipStatus";
DROP TYPE "InternshipStatus_old";
ALTER TABLE "Internship" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "Internship" DROP COLUMN "description",
DROP COLUMN "endsAt",
DROP COLUMN "location",
DROP COLUMN "openings",
DROP COLUMN "postedById",
DROP COLUMN "requirements",
DROP COLUMN "screeningQuestions",
DROP COLUMN "startsAt",
DROP COLUMN "stipend",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "adminNotes" TEXT,
ADD COLUMN     "allowedFields" TEXT[],
ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "applyMethod" TEXT NOT NULL DEFAULT 'platform',
ADD COLUMN     "autoClose" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "datePosted" TIMESTAMP(3),
ADD COLUMN     "durationMonths" INTEGER,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "externalUrl" TEXT,
ADD COLUMN     "fullDescription" TEXT NOT NULL,
ADD COLUMN     "hoursPerWeek" INTEGER,
ADD COLUMN     "internshipType" TEXT NOT NULL,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxApplications" INTEGER,
ADD COLUMN     "qualifications" TEXT[],
ADD COLUMN     "remote" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiredDocs" TEXT[] DEFAULT ARRAY['CV']::TEXT[],
ADD COLUMN     "requiredLanguages" TEXT[],
ADD COLUMN     "requiredLevel" TEXT NOT NULL,
ADD COLUMN     "requires_cv" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "responsibilities" TEXT[],
ADD COLUMN     "salary" INTEGER,
ADD COLUMN     "salaryUnit" TEXT,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "targetSchools" TEXT[],
ADD COLUMN     "validThrough" TIMESTAMP(3),
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public',
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorSecret" TEXT;
