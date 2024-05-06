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

  const ls_type = await prisma.t_content
    .findMany({
      include: {
        t_field: true,
        map_t_content_t_taxonomy: true,
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });
  return (
    <Suspense fallback={<Loading />}>
      <RepoProvider repo={{ ls_type }}>
        <AdminLayout>{children}</AdminLayout>
      </RepoProvider>
    </Suspense>
  );
}
