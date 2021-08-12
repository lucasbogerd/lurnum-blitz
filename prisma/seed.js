const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Main() {
  const Types = await prisma.type.createMany({
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
  });
}

Main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
