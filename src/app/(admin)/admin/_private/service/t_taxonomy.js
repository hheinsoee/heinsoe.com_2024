"use server";
import prisma from "@/db";
import { safeData } from "./index";

export const getTaxonomyTypes = async ({ r_taxonomy, where } = {}) =>
  await prisma.t_taxonomy
    .findMany({
      where,
      include: {
        r_taxonomy,
      },
    })
    .then((d) => {
      return d;
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
      // process.exit(1);
    });

export const createTaxonomy = async ({ data }) => {
  return await prisma.t_taxonomy
    .create({
      data: {
        ...(await safeData("t_taxonomy", data)),
        r_taxonomy: {
          createMany: {
            data: data.r_taxonomy.map(({ name }) => ({
              name,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getTaxonomyTypes({
        r_taxonomy: true,
        where: {
          id: d.id,
        },
      });
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export const updateTaxonomy = async ({ where, data }) =>
  await prisma.t_taxonomy
    .update({
      where: {
        ...where,
      },
      data: {
        ...(await safeData("t_taxonomy", data)),
        r_taxonomy: {
          deleteMany: {},
          createMany: {
            data: data.r_taxonomy.map(({ name }) => ({
              name,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getTaxonomyTypes({
        r_taxonomy: true,
        where: {
          id: d.id,
        },
      });
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
export const deleteTaxonomyType = async ({ where }) => {
  return await prisma.t_taxonomy
    .delete({
      where,
    })
    .then((d) => {
      return d;
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
