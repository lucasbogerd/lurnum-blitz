-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    "name" VARBIT(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NameRequest" (
    "id" SERIAL NOT NULL,
    "requestedName" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonTypes" (
    "pokemonId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    PRIMARY KEY ("pokemonId","typeId")
);

-- CreateTable
CREATE TABLE "PokemonNameRequests" (
    "pokemonId" INTEGER NOT NULL,
    "nameRequestId" INTEGER NOT NULL,

    PRIMARY KEY ("pokemonId","nameRequestId")
);

-- AddForeignKey
ALTER TABLE "PokemonTypes" ADD FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTypes" ADD FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonNameRequests" ADD FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonNameRequests" ADD FOREIGN KEY ("nameRequestId") REFERENCES "NameRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
