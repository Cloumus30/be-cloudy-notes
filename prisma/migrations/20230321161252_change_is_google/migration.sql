/*
  Warnings:

  - You are about to drop the column `is_google` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_google",
ADD COLUMN     "google_id" TEXT;
