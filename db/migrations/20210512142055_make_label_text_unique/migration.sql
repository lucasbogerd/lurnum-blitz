/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Label.text_unique" ON "Label"("text");
