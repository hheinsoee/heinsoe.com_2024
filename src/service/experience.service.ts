"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";

export const getExperience = async (props?: Prisma.ExperienceFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  props.where.isDeleted = false;
  const query: Prisma.ExperienceFindManyArgs = {
    orderBy: {
      startDate: "desc",
    },
    include: {
      tags: {
        include: {
          Tag: true,
        },
      },
      techs: {
        include: {
          Tech: true,
        },
      },
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.experience.findMany(query),
      prisma.experience.count({ where: query.where }),
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
export const createExperience = async (props: Prisma.ExperienceCreateInput) => {
  return await prisma.experience
    .create({ data: props })
    .then((res) => {
      revalidatePath("/");
      return getExperience({
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
export const updateExperience = async (props: Prisma.ExperienceUpdateArgs) => {
  return await prisma.experience
    .update(props)
    .then((res) => {
      revalidatePath("/");
      return getExperience({
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
