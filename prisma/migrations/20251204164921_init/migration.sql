-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL,
    "store" TEXT NOT NULL,
    "category" TEXT,
    "imageUrl" TEXT,
    "scrapedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
