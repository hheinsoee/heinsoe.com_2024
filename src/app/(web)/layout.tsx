import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Loading } from "@components/loading";
import info from "./../../../siteInfo.json";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { AppProgressBar } from "next-nprogress-bar";

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
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* <AppProgressBar
          height="2px"
          color="cyan"
          options={{ showSpinner: true }}
          shallowRouting
        /> */}
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
