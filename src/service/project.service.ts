"use server";
import prisma from "./db";
import { Prisma } from "@prisma/client";

export const getProject = async (props?: Prisma.ProjectFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  props.where.isDeleted = false;
  const query: Prisma.ProjectFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    include: {
      image: true,
      tags: true,
      techs: true,
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.project.findMany(query),
      prisma.project.count({ where: query.where }),
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
export const createProject = async (props: Prisma.ProjectCreateInput) => {
  return await prisma.project
    .create({ data: props })
    .then((res) => {
      return getProject({
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
export const updateProject = async (props: Prisma.ProjectUpdateArgs) => {
  return await prisma.project
    .update(props)
    .then((res) => {
      return getProject({
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
