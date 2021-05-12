/*
  Warnings:

  - Added the required column `text` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_Label" ("id", "createdAt", "updatedAt") SELECT "id", "createdAt", "updatedAt" FROM "Label";
DROP TABLE "Label";
ALTER TABLE "new_Label" RENAME TO "Label";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
