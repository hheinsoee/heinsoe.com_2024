"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";

export const getTech = async (props?: Prisma.TechFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  const query: Prisma.TechFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.tech.findMany(query),
      prisma.tech.count({ where: query.where }),
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
export const createTech = async (props: Prisma.TechCreateInput) => {
  return await prisma.tech
    .create({ data: props })
    .then((res) => {
      revalidatePath("/", 'layout');
      return getTech({
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
export const updateTech = async (props: Prisma.TechUpdateArgs) => {
  return await prisma.tech
    .update(props)
    .then((res) => {
      revalidatePath("/", 'layout');
      return getTech({
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
