import type { Metadata } from "next";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import myLink from "@/link";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect(myLink.admin());
  }
  return <div>{children}</div>;
}
