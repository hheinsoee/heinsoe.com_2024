import { Loading } from "@/components/loading";
import { Suspense } from "react";

export default function RootLayout({
  children,
  params
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}
