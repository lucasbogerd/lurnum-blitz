const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
};

export default async function handle(req, res) {
  let dbResponse = { count: 0 };
  try {
    dbResponse = await prisma.type.createMany(types);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
    res.json(dbResponse);
  }
}
