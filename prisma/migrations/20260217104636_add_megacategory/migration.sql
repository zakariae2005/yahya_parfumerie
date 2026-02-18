-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "megacategory" TEXT;

-- CreateIndex
CREATE INDEX "Product_megacategory_idx" ON "Product"("megacategory");
