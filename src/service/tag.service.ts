"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";

export const getTag = async (props?: Prisma.TagFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  const query: Prisma.TagFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.tag.findMany(query),
      prisma.tag.count({ where: query.where }),
    ]);
    return {
      pagination: {
        total: count,
      },
      data: data,
    };
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
export const createTag = async (props: Prisma.TagCreateInput) => {
  return await prisma.tag
    .create({ data: props })
    .then((res) => {
      revalidatePath("/", 'layout');
      return getTag({
        where: {
          id: res.id,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export const updateTag = async (props: Prisma.TagUpdateArgs) => {
  return await prisma.tag
    .update(props)
    .then((res) => {
      revalidatePath("/", 'layout');
      return getTag({
        where: {
          id: res.id,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
