import "./../globals.css";
import {Loading} from "@/components/Loading";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import Menu from "./_components/Menu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          <div className="flex">
            <div className="w-52">
              <div className="sticky top-0">
                <Menu />
              </div>
            </div>
            <div className="flex-1">
            {children}
            </div>
          </div>
        </ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
