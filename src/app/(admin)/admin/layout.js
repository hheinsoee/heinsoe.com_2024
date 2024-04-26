import { Loading } from "@/components/loading";
import { Suspense } from "react";
import RepoProvider from "./_private/context/repo";
const { PrismaClient } = require("@prisma/client");

import AdminLayout from "./_private/components/AdminLayout";

const prisma = new PrismaClient();

export default async function Layout({
  children,
  params: { session, ...params },
}) {
  // Rename the context variable

  const type = await prisma.ls_type.findMany();
  const taxonomy = await prisma.ls_taxonomy.findMany();
  return (
    <Suspense fallback={<Loading />}>
      <RepoProvider repo={{ type, taxonomy }}>
        <AdminLayout>{children}</AdminLayout>;
      </RepoProvider>
    </Suspense>
  );
}
