import prisma from "../../../components/data/client"

const types = {
  data: [
    { name: "Normal" },
    { name: "Fighting" },
    { name: "Flying" },
    { name: "Poison" },
    { name: "Ground" },
    { name: "Rock" },
    { name: "Bug" },
    { name: "Ghost" },
    { name: "Steel" },
    { name: "Fire" },
    { name: "Water" },
    { name: "Grass" },
    { name: "Electric" },
    { name: "Psychic" },
    { name: "Ice" },
    { name: "Dragon" },
    { name: "Dark" },
    { name: "Fairy" },
  ],
}

export default async function handle(req, res) {
  let dbResponse = { count: 0, message: "" }
  try {
    await prisma.type.deleteMany({})
    dbResponse.count = await prisma.type.createMany(types)
  } catch (error) {
    if (error.code === "P2002") {
      dbResponse.message =
        "One or more records with already exist in DB, fully aborting..."
    } else {
      dbResponse.message = error
    }
    console.log(dbResponse.message)
  } finally {
    res.json(dbResponse)
  }
}
