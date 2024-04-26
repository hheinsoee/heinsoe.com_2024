import "./../globals.css";
import { Loading } from "@/components/loading";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";

export default async function RootLayout({
  children,
  params: { session, ...params },
}) {
  console.log(session);
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
