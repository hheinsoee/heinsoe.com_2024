import { Loading } from "@/components/loading";
import Link from "next/link";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
