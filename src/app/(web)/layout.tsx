import "./../globals.css";
import "./../bg.css";
import { Loading } from "@components/loading";
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { LayoutProvider } from "@/context/layout";

import app from "@config";

export const metadata = {
  title: app.name,
  description: app.title,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading className="h-screen" />}>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
