/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `datePurchased` on the `PurchasedCourseDetails` table. All the data in the column will be lost.
  - You are about to drop the `Mentor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `PurchasedCourseDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedCourseDetails" DROP CONSTRAINT "PurchasedCourseDetails_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "mentorId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ALTER COLUMN "dateCreated" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PurchasedCourseDetails" DROP COLUMN "datePurchased",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "Mentor";
