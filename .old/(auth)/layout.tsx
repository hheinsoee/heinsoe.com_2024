import "./../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@components/nav";
import { APP } from "@constant/index";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import { Button, ConfigProvider, Space } from "antd";
import StyledComponentsRegistry from "@/components/AntdRegistry";

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
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#d0a070",
                colorBgContainer: "#f6ffed",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
