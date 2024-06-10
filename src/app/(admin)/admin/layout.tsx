import { Loading } from "@components/loading";
import { Suspense } from "react";
import prisma from "@/db";
import AdminLayout from "./_private/components/AdminLayout";
import { getContentTypes } from "../../../service/t_content";
import { getTaxonomyTypes } from "../../../service/t_taxonomy";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rename the context variable

  return (
    <Suspense fallback={<Loading />}>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}
