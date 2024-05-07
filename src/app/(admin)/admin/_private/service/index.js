"use server";
import { Prisma } from "@prisma/client";

export const safeData = async (table, data) => {
  const contentKeys = await Prisma.dmmf.datamodel.models
    .find((model) => model.name === table)
    .fields.filter((field) => !field.relationName)
    .map((f) => f.name);
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => contentKeys.includes(key))
  );
};
