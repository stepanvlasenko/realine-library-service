/*
  Warnings:

  - You are about to drop the column `writtenBooksIds` on the `Author` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "dayOfDeath" DATETIME,
    "secondName" TEXT
);
INSERT INTO "new_Author" ("birthday", "dayOfDeath", "description", "id", "name", "secondName", "surname") SELECT "birthday", "dayOfDeath", "description", "id", "name", "secondName", "surname" FROM "Author";
DROP TABLE "Author";
ALTER TABLE "new_Author" RENAME TO "Author";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
