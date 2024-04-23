import "./../globals.css";
import "./../bg.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Loading } from "@components/loading";
import info from "../../../siteInfo.json";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { LayoutProvider } from "@/context/layout";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
  title: info.name,
  description: info.title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
