const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// async function main() {
//   const taxonomy = await prisma.taxonomy.findMany({
//     include: {
//       rec_taxonomy: true,
//     },
//   });
//   return taxonomy;
// }

// async function main() {
//   await prisma.taxonomy.create({
//     data: {
//       name: "tag",
//       rec_taxonomy: {
//         create: {
//           name: "E-commerse",
//         },
//       },
//     },
//   });
//   const allTaxonomy = await prisma.taxonomy.findMany({
//     include: {
//       rec_taxonomy: true,
//     },
//   });
//   console.dir(allTaxonomy, { depth: null });
// }

async function main() {
    const content = await prisma.rec_content.findMany({
      include: {
        _type: true,
      },
    });
    return content;
  }

main()
  .then(async (d) => {
    console.dir(d, { depth: null });
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
