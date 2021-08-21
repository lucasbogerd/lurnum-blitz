import prisma from "../../../components/data/client"

import pokemon from "../../../components/data/pokemon"

function capitalize(word) {
  const lower = word.toLowerCase()
  return word.charAt(0).toUpperCase() + lower.slice(1)
}

function nullAsStringToUndefined(string) {
  return string === "NULL" ? undefined : string
}

function gameNameToGenerationName(gameName) {
  switch (gameName) {
    case "Red":
      return "I"
    case "Gold":
      return "II"
    case "Ruby":
      return "III"
    case "Diamond":
      return "IV"
    case "Black":
      return "V"
    case "X":
      return "VI"
    case "Sun":
    case "Ultra Sun":
    case "Let's Go Pikachu":
      return "VII"
    default:
      return "VIII"
  }
}

function getUpdateObject(currentPokemon, allPokemon) {
  console.log(currentPokemon)

  const pred = allPokemon.find(
    (p) =>
      p["Pokemon Id"] === parseInt(currentPokemon["Pre-Evolution Pokemon Id"])
  )
  console.log(pred)

  return pred["Pokedex Number"]
}

export default async function handle(req, res) {
  let dbResponse = { pokemonCreated: 0, predecessorsLinked: 0 }
  const pokemonReadyForDb = pokemon.map((p) => {
    return {
      createData: {
        name: p["Pokemon Name"],
        pokedexId: p["Pokedex Number"],
        classification: p.Classification,
        legendaryClassification: nullAsStringToUndefined(p["Legendary Type"]),
        evolutionDetails: nullAsStringToUndefined(p["Evolution Details"]),
        type1: {
          connectOrCreate: {
            where: { name: capitalize(p["Primary Type"]) },
            create: { name: capitalize(p["Primary Type"]) },
          },
        },
        type2: nullAsStringToUndefined(p["Secondary Type"])
          ? {
              connectOrCreate: {
                where: { name: capitalize(p["Secondary Type"]) },
                create: { name: capitalize(p["Secondary Type"]) },
              },
            }
          : undefined,
        experienceGroup: {
          connectOrCreate: {
            where: { name: p["Experience Growth"] },
            create: { name: p["Experience Growth"] },
          },
        },
        generation: {
          connectOrCreate: {
            where: { name: gameNameToGenerationName(p["Game(s) of Origin"]) },
            create: {
              name: gameNameToGenerationName(p["Game(s) of Origin"]),
              region: p["Region of Origin"],
            },
          },
        },
      },
      updateData:
        p["Pre-Evolution Pokemon Id"] !== "NULL"
          ? {
              data: {
                predecessorPokemon: {
                  connect: {
                    pokedexId: getUpdateObject(p, pokemon),
                  },
                },
              },
              where: {
                pokedexId: p["Pokedex Number"],
              },
            }
          : undefined,
    }
  })
  // TODO REMOVE ME
  return

  const pokemonReadyForDbWithPredecessor = pokemonReadyForDb.filter(
    (p) => p.updateData !== undefined
  )

  try {
    const startTime = new Date().getTime()
    console.log(`Starting database actions at ${startTime}`)

    await prisma.pokemon.deleteMany({})

    const promisesForCreateActions = pokemonReadyForDb.map(async (p) => {
      return await prisma.pokemon.create({
        data: p.createData,
      })
    })
    const recordsCreated = await Promise.all(promisesForCreateActions)
    dbResponse.pokemonCreated = recordsCreated.length

    const promisesForLinkActions = pokemonReadyForDbWithPredecessor.map(
      async (p) => {
        console.log(p.updateData)
        return await prisma.pokemon.update(p.updateData)
      }
    )
    const recordsUpdated = await Promise.all(promisesForLinkActions)
    dbResponse.predecessorsLinked = recordsUpdated.length

    const endingTime = new Date().getTime()
    console.log(`Database actions ending at ${endingTime}`)
    console.log(`Duration: ${endingTime - startTime} ms`)
  } catch (error) {
    console.log(error)
  } finally {
    res.json(dbResponse)
  }
}
