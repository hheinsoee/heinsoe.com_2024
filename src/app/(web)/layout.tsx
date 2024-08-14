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
import Script from "next/script";

export const metadata: Metadata = seo({
  title: conf.title,
  description: conf.about,
  url: conf.baseUrl || "/",
  images: [{ url: `${conf.baseUrl}/heinsoe.jpg` }],
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
