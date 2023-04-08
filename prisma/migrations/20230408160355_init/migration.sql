-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genresIds" TEXT NOT NULL,
    "reviewsIds" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "coverImageURL" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "fileURL" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "role" TEXT NOT NULL,
    "interestsIds" TEXT NOT NULL,
    "readedBooksIds" TEXT NOT NULL,
    "favoritesIds" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "writtenBooksIds" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "dayOfDeath" DATETIME NOT NULL,
    "secondName" TEXT
);
