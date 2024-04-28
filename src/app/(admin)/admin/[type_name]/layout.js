import { Loading } from "@/components/loading";
import { Suspense } from "react";


export default async function Layout({
  children,
  params: { session, ...params },
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
