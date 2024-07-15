"use server";
import prisma from "./db";
import { Prisma, Image } from "@prisma/client";

// #region getContents
export const getImage = async (props?: Prisma.ImageFindManyArgs) =>
  await prisma.image
    .findMany({
      orderBy: {
        id: "desc",
      },
      ...props,
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

export const createImage = async (props: Prisma.ImageCreateArgs) => {
  return await prisma.image
    .create({
      select: {
        id: true,
        fileName: true,
        caption: true,
      },
      ...props,
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
