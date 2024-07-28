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
  title: 'Junior Hein is Coming soon',
  description: '',
  url: "/junior",
  images: [{ url: "/junior.png" }],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading className="h-screen" />}>
      <canvas className="banner_canvas" id="canvas_banner"></canvas>
      <ThemeProvider>{children}</ThemeProvider>
      <Script src="/bg.js" />
    </Suspense>
  );
}
