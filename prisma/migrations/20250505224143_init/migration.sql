/*
  Warnings:

  - You are about to drop the column `description` on the `Dress` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Dress` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `returned` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `saleDate` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rentalPrice` to the `Dress` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `Dress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `clientName` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DressStatus" AS ENUM ('DISPONIBLE', 'RENTADO', 'VENDIDO');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Rental" DROP CONSTRAINT "Rental_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_clientId_fkey";

-- AlterTable
ALTER TABLE "Dress" DROP COLUMN "description",
DROP COLUMN "isAvailable",
ADD COLUMN     "rentalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "DressStatus" NOT NULL DEFAULT 'DISPONIBLE',
DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "clientId",
DROP COLUMN "returned",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "clientId",
DROP COLUMN "createdAt",
DROP COLUMN "saleDate",
DROP COLUMN "salePrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "DressSize";

-- DropEnum
DROP TYPE "PaymentMethod";

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
