import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Loading } from "@components/loading";
import { APP } from "@constant/index";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: APP.NAME,
  description: APP.TITLE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white text-gray-800 ${inter.className} animationBg`}>
        {/* <Animatedbg/> */}
        <Suspense fallback={<Loading />}>
          <StyledComponentsRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#F97316",
                  colorBgContainer: "#ffffff",
                },
              }}
            >
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}
