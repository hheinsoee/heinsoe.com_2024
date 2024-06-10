
import { Prisma } from "@prisma/client";

export const safeData = async (table: string, data: any): Promise<Object> => {
  const contentKeys: String[] | undefined =
    Prisma.dmmf.datamodel.models
      .find((model) => model.name === table)
      ?.fields.filter((field) => !field.relationName)
      .map((f) => f.name) ?? [];
  return (
    Object.fromEntries(
      Object.entries(data).filter(([key]) => contentKeys?.includes(key))
    ) ?? {}
  );
};

export * from "./r_content";
export * from "./t_content";
export * from "./t_taxonomy";
export * from "./prittier";
