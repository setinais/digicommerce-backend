/*
  Warnings:

  - Made the column `created_at` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `brands` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `brands` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `validate` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `budgets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `budgets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `cities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `cities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `measures` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `measures` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `product_on_budgets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `product_on_budgets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `states` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `states` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `sub_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `sub_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "brands" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "gross_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "net_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "observation" TEXT,
ADD COLUMN     "validate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "cities" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "measures" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_on_budgets" ADD COLUMN     "pricer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "states" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "sub_categories" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
