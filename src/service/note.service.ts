"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import myLink from "@/link";

export const getNote = async (props?: Prisma.NoteFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  props.where.isDeleted = false;
  const query: Prisma.NoteFindManyArgs = {
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
      prisma.note.findMany(query),
      prisma.note.count({ where: query.where }),
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
export const createNote = async (props: Prisma.NoteCreateInput) => {
  return await prisma.note
    .create({ data: props })
    .then((res) => {
      revalidatePath("/");
      return getNote({
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
export const updateNote = async (props: Prisma.NoteUpdateArgs) => {
  return await prisma.note
    .update(props)
    .then((res) => {
      revalidatePath(myLink.note(res.id));
      revalidatePath("/");
      return getNote({
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
