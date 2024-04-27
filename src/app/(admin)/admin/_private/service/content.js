"use server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getContent = async ({ type_id }) =>
  await prisma.rec_content.findMany({
    where: {
      type_id,
    },
    include: {
      rec_field: true,
      map_content_rectaxonomy: true,
    },
  });
