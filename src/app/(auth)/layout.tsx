import "./../globals.css";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import myLink from "@/link";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { ThemeProvider } from "@/context/theme";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getSession();

  if (session?.user) {
    redirect(myLink.admin());
  }
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading className="h-screen" />}>
        <ThemeProvider>{children}</ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
