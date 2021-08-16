import prisma from "../../../components/data/client";

import { pokemon } from "../../../components/data/pokemon";

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export default async function handle(req, res) {
  await prisma.pokemon.deleteMany({});
  let dbResponse = { count: 0 };
  const pokemonReadyForDb = pokemon.map((p) => {
    return {
      name: p.name,
      pokedexId: p.pokedex_number,
      type1: {
        connect: {
          name: capitalize(p.type1),
        },
      },
      type2: p.type2
        ? {
            connect: {
              name: capitalize(p.type2),
            },
          }
        : undefined,
      generation: p.generation,
      isLegendary: p.is_legendary === 1 ? true : false,
    };
  });
  try {
    pokemonReadyForDb.forEach(
      async (p) => await prisma.pokemon.create({ data: p })
    );
  } catch (error) {
    console.log(error);
  } finally {
    res.json(dbResponse);
  }
}
