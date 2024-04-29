"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { error } from "console";

const safeData = (table, data) => {
  const contentKeys = Prisma.dmmf.datamodel.models
    .find((model) => model.name === table)
    .fields.map((f) => f.name);
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => contentKeys.includes(key))
  );
};

export const getContent = async ({ type_id }) =>
  await prisma.rec_content
    .findMany({
      where: {
        type_id,
      },
      include: {
        map_content_rectaxonomy: {
          include: {
            rec_taxonomy: true,
          },
        },
        rec_field: true,
      },
    })
    .then((d) => {
      return d.map((d) => ({
        ...d,
        fields: Object.assign(
          {},
          ...d.rec_field?.map((f) => ({ [f.name]: f.value }))
        ),
        rec_field: undefined,
        taxonomy: d.map_content_rectaxonomy?.map((t) => t.taxonomy_id),
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

export const createContent = async ({ data }) => {
  return await prisma.rec_content
    .create({
      data: {
        ...safeData("rec_content", data),
        // rec_field: {
        //   createMany: fields,
        // },
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
};
export const updateContent = async ({ where, data }) =>
  await prisma.rec_content
    .update({
      where: {
        ...where,
      },
      data: {
        ...safeData("rec_content", data),
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
