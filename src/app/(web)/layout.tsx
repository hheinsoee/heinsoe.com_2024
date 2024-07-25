import "./../globals.css";
import "./../bg.css";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { LayoutProvider } from "@/context/layout";

import conf from "@config";
import { seo } from "@/utility/seo";
import { Metadata } from "next";

export const metadata:Metadata = seo({
  title: conf.title,
  description: conf.about,
  url: "/",
  images: [{ url: "/heinsoe.com.png" }],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading className="h-screen" />}>
      <ThemeProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </ThemeProvider>
    </Suspense>
  );
}
