import { Loading } from "@/components/loading";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}
