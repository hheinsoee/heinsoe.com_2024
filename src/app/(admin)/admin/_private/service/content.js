"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";

const safeData = (table, data) => {
  const contentKeys = Prisma.dmmf.datamodel.models
    .find((model) => model.name === table)
    .fields.map((f) => f.name);
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => contentKeys.includes(key))
  );
};

export const getContent = async ({ where }) =>
  await prisma.r_content
    .findMany({
      where,
      orderBy: {
        id: "desc",
      },
      include: {
        map_r_content_r_taxonomy: {
          include: {
            r_taxonomy: true,
          },
        },
        r_field: true,
      },
    })
    .then((d) => {
      return d.map((d) => ({
        ...d,
        fields: Object.assign(
          {},
          ...d.r_field?.map((f) => ({ [f.name]: f.value }))
        ),
        taxonomy: d.map_r_content_r_taxonomy.map((m) => m.r_taxonomy_id),
        r_field: undefined,
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

export const createContent = async ({ data }) => {
  return await prisma.r_content
    .create({
      data: {
        ...safeData("r_content", data),
        r_field: {
          createMany: {
            data: Object.entries(data.fields).map(([key, value]) => ({
              name: key,
              value: value,
            })),
          },
        },
        map_r_content_r_taxonomy: {
          createMany: {
            data: data.taxonomy.map((t_id) => ({
              r_taxonomy_id: t_id,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getContent({
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
export const updateContent = async ({ where, data }) =>
  await prisma.r_content
    .update({
      where: {
        ...where,
      },
      data: {
        ...safeData("r_content", data),
        r_field: {
          deleteMany: {},
          createMany: {
            data: Object.entries(data.fields).map(([key, value]) => ({
              name: key,
              value: value,
            })),
          },
        },
        map_r_content_r_taxonomy: {
          deleteMany: {},
          createMany: {
            data: data.taxonomy.map((t_id) => ({
              r_taxonomy_id: t_id,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getContent({
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

export const getTaxonomy = async ({ type_id }) =>
  await prisma.t_taxonomy
    .findMany({
      where: {
        map_t_content_t_taxonomy: {
          some: {
            t_content_id: type_id,
          },
        },
      },
      include: {
        r_taxonomy: true,
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
