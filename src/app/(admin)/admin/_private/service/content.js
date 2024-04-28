"use server";
import prisma from "@/db";
import { error } from "console";

export const getContent = async ({ type_id }) =>
  await prisma.rec_content
    .findMany({
      where: {
        type_id,
      },
      include: {
        rec_field: true,
        map_content_rectaxonomy: {
          include: { rec_taxonomy: true },
        },
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
    });

export const createContent = async ({ data }) =>
  await prisma.rec_content
    .create({
      data: data,
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
export const updateContent = async ({ where, data }) =>
  await prisma.rec_content
    .update({
      where: {
        ...where,
      },
      data: {
        ...data,
        rec_field: {
          createMany: data.fields,
        },
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
    });

export const getTaxonomy = async ({ type_id }) =>
  await prisma.ls_taxonomy
    .findMany({
      where: {
        map_taxonomy_type: {
          some: {
            type_id: type_id,
          },
        },
      },
      include: {
        rec_taxonomy: true,
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
