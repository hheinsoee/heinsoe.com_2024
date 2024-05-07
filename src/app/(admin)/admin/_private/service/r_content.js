"use server";
import prisma from "@/db";
import { safeData } from "./index";

export const getContent = async ({ where }) =>
  await prisma.r_content
    .findMany({
      where,
      orderBy: {
        id: "desc",
      },
      include: {
        t_content: {
          select: {
            map_t_content_t_taxonomy: {
              select: {
                t_taxonomy: true,
              },
            },
          },
        },
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
        // taxonomy: d.map_r_content_r_taxonomy.map((a) => a.r_taxonomy),
        // t_taxonomy: d.t_content.map_t_content_t_taxonomy.map((a) => ({
        //   ...a.t_taxonomy,
        //   r_taxonomy_ids: d.map_r_content_r_taxonomy
        //     .filter((map) => map.r_taxonomy.t_taxonomy_id == a.t_taxonomy.id)
        //     .map((o) => o.r_taxonomy.id),
        // })),
        t_taxonomy: d.t_content.map_t_content_t_taxonomy.reduce((acc, obj) => {
          acc[obj.t_taxonomy.id] = d.map_r_content_r_taxonomy
            .filter((map) => map.r_taxonomy.t_taxonomy_id == obj.t_taxonomy.id)
            .map((o) => o.r_taxonomy.id);
          return acc;
        }, {}),
        r_field: undefined,
        map_r_content_r_taxonomy: undefined,
        t_content: undefined,
      }));
    })
    .catch((e) => {
      throw new Error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

export const createContent = async ({ data }) => {
  console.dir("create");
  return await prisma.r_content
    .create({
      data: {
        ...(await safeData("r_content", data)),
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
            data: Object.entries(data.t_taxonomy).flatMap(([key, value]) =>
              value.map((num) => ({ r_taxonomy_id: parseInt(num) }))
            ),
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
export const updateContent = async ({ where, data }) => {
  return await prisma.r_content
    .update({
      where: {
        ...where,
      },
      data: {
        ...(await safeData("r_content", data)),
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
            data: Object.entries(data.t_taxonomy).flatMap(([key, value]) =>
              value.map((num) => ({ r_taxonomy_id: parseInt(num) }))
            ),
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

export const deleteContent = async ({ where }) => {
  return await prisma.r_content
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
