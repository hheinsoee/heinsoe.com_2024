"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import myLink from "@/link";

export const getBlog = async (props?: Prisma.BlogFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  props.where.isDeleted = false;
  const query: Prisma.BlogFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    include: {
      image: true,
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.blog.findMany(query),
      prisma.blog.count({ where: query.where }),
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
export const createBlog = async (props: Prisma.BlogCreateInput) => {
  return await prisma.blog
    .create({ data: props })
    .then((res) => {
      return getBlog({
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
export const updateBlog = async (props: Prisma.BlogUpdateArgs) => {
  return await prisma.blog
    .update(props)
    .then((res) => {
      revalidatePath(myLink.blog(res.id))
      return getBlog({
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
