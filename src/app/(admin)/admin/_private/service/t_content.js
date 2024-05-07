"use server";
import prisma from "@/db";
import { safeData } from "./index";

export const getContentStructure = async ({ where } = {}) =>
  await prisma.t_content
    .findMany({
      where,
      include: {
        t_field: true,
        map_t_content_t_taxonomy: true,
        // map_t_content_t_taxonomy: {
        //   include: {
        //     t_taxonomy: {
        //       include: {
        //         r_taxonomy: true,
        //       },
        //     },
        //   },
        // },
      },
    })
    .then((data) => {
      return data.map((d) => ({
        ...d,
        t_taxonomy_ids: d.map_t_content_t_taxonomy.map((t) => t.t_taxonomy_id),
        // t_taxonomy: d.map_t_content_t_taxonomy.map(t=>t.t_taxonomy),
        map_t_content_t_taxonomy: undefined,
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(() => {
      prisma.$disconnect();
    });
export const createContentType = async ({ data }) => {
  console.log({ safeData: await safeData("t_content", data) });
  return await prisma.t_content
    .create({
      data: {
        ...(await safeData("t_content", data)),
        t_field: {
          createMany: {
            data: data.t_field.map(({ name, data_type }) => ({
              name,
              data_type,
            })),
          },
        },
        map_t_content_t_taxonomy: {
          createMany: {
            data: data.t_taxonomy_ids.map((id) => ({
              t_taxonomy_id: id,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getContentStructure({
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
// updateContentType;

export const updateContentType = async ({ where, data }) =>
  await prisma.t_content
    .update({
      where: {
        ...where,
      },
      data: {
        ...(await safeData("t_content", data)),
        t_field: {
          deleteMany: {},
          createMany: {
            data: data.t_field.map(({ name, data_type }) => ({
              name,
              data_type,
            })),
          },
        },
        map_t_content_t_taxonomy: {
          deleteMany: {},
          createMany: {
            data: data.t_taxonomy_ids.map((id) => ({
              t_taxonomy_id: id,
            })),
          },
        },
      },
    })
    .then((d) => {
      return getContentStructure({
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
export const deleteContentType = async ({ where }) => {
  return await prisma.t_content
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
