/*
  Warnings:

  - Added the required column `permissionType` to the `Pin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureSrc` to the `Pin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pin" ADD COLUMN     "permissionType" TEXT NOT NULL,
ADD COLUMN     "pictureSrc" TEXT NOT NULL;
