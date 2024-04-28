import { Loading } from "@/components/loading";
import { Suspense } from "react";
import RepoProvider from "./_private/context/repo";
import prisma from "@/db";
import AdminLayout from "./_private/components/AdminLayout";

export default async function Layout({
  children,
  params: { session, ...params },
}) {
  // Rename the context variable

  const ls_type = await prisma.ls_type.findMany({
    include: {
      ls_field: true,
      map_taxonomy_type: true,
    },
  }).finally(()=>{
    prisma.$disconnect()
  });
  return (
    <Suspense fallback={<Loading />}>
      <RepoProvider repo={{ ls_type }}>
        <AdminLayout>{children}</AdminLayout>
      </RepoProvider>
    </Suspense>
  );
}
