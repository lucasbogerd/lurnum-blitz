/*
  Warnings:

  - Added the required column `comment` to the `NameRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGranted` to the `NameRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NameRequest" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "createdOn" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grantedOn" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isGranted" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "CaughtPokemon" (
    "id" SERIAL NOT NULL,
    "caughtOn" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDead" BOOLEAN NOT NULL,
    "diedOn" TIMESTAMP(3)[],
    "pokemonId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CaughtPokemon" ADD FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
