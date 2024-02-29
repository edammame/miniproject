const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const data = [];

async function main() {
  try {
    data.map(async (user) => {
      const newUser = await prisma.user.create({
        data: user,
      });
      console.log(`Created user with id: ${newUser.id}`);
    });
    console.log(`Seeding finished.`);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => {
    prisma.$disconnect;
  })
  .catch((err) => {
    console.log(err);
    prisma.$disconnect;
    process.exit(1);
  });
