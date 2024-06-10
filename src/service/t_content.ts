"use server";
import prisma from "@/db";
import { safeData } from "./index";
import { Prisma } from "@prisma/client";
import { ContentType, UpdateTaxonomyType } from "@schema";


// #region getMany
export const getContentTypes = async (
  props?: Prisma.contentTypeFindManyArgs
) => {
  const q: Prisma.contentTypeFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    include: {
      fieldType: true,
      mapContentTypeTaxonomyType: {
        include: {
          taxonomyType: true,
        },
      },
    },
    ...props,
  };
  return await prisma.contentType
    .findMany(q)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
// #region getOnce
export const getContentType = async (
  props?: Prisma.contentTypeFindUniqueArgs
) => {
  const q = {
    include: {
      fieldType: true,
      mapContentTypeTaxonomyType: {
        include: {
          taxonomyType: true,
        },
      },
    },
    ...props,
  };
  return await prisma.contentType
    .findFirst(q)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      prisma.$disconnect();
    });
};

// #region create
export const createContentType = async (data: ContentType) => {
  const q: Prisma.contentTypeCreateArgs = {
    data: {
      ...(await safeData("contentType", data)),
      fieldType: {
        createMany: {
          data: data.fieldTypes
            .map(({ name, dataType }) => ({
              name,
              dataType,
            }))
            .filter((item: any) => item !== undefined),
        },
      },
      ...(data.taxonomyTypes && {
        mapContentTypeTaxonomytype: {
          createMany: {
            data:
              data.taxonomyTypes?.map(({ id }) => ({
                taxonomyTypeId: id,
              })) || [],
          },
        },
      }),
    } as Prisma.contentTypeCreateInput,
  };
  return await prisma.contentType
    .create(q)
    .then((d) => {
      return getContentType({
        where: {
          id: d.id,
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
// updateContentType;

// #region Update
interface UpdateContentType {
  where: Prisma.contentTypeWhereUniqueInput;
  data: ContentType;
}
export const updateContentType = async ({ where, data }: UpdateContentType) => {
  const inputs: Prisma.contentTypeUpdateInput = {
    ...(await safeData("contentType", data)),
    fieldType: {
      deleteMany: {},
      createMany: {
        data: data.fieldTypes
          .map(({ name, dataType }: any) => ({
            name,
            dataType,
          }))
          .filter((item: any) => item !== undefined),
      },
    },
    mapContentTypeTaxonomyType: {
      deleteMany: {},
      createMany: {
        data: data.taxonomieTypeIds
          .map((id) => ({
            taxonomyTypeId: id,
          }))
          .filter((item: any) => item !== undefined),
      },
    },
  };
  return await prisma.contentType
    .update({
      where,
      data: inputs,
    })
    .then((d) => {
      console.log({ d });
      return getContentType({
        where: {
          id: d.id,
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

// #region Delete
export const deleteContentType = async ({
  where,
}: Prisma.contentTypeDeleteArgs) => {
  return await prisma.contentType
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
