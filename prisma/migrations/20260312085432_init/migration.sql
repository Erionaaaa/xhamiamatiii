-- CreateTable
CREATE TABLE "MosqueInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "description" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "facebookUrl" TEXT,
    "youtubeUrl" TEXT,
    "instagramUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VideoCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "youtubeUrl" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "VideoCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcademyPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "coverImage" TEXT,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DonationMethod" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "iban" TEXT,
    "swift" TEXT,
    "bankName" TEXT,
    "accountName" TEXT,
    "phone" TEXT,
    "linkUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoCategory_slug_key" ON "VideoCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Video_slug_key" ON "Video"("slug");

-- CreateIndex
CREATE INDEX "Video_categoryId_idx" ON "Video"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyPost_slug_key" ON "AcademyPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");
