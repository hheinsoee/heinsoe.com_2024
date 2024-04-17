import { ConfigProvider, theme } from "antd";
import "./../globals.css";
import AdminNav from "./admin/component/nav";
import { Loading } from "@/components/loading";
import { Progress } from "@components/index";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";

export default async function RootLayout({
  children,
  params: { session, ...params },
}) {
  console.log(session);
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#fff0e9" }}>
        <Progress />
        <Suspense fallback={<Loading />}>
          <StyledComponentsRegistry>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "#F97316",
                  colorBgContainer: "#ffffff",
                },
              }}
            >
              <div className="flex">
                <div className="w-44">
                  <div className="sticky top-0 h-screen bg-white shadow-md">
                    <AdminNav />
                  </div>
                </div>

                <div className="flex-1">{children}</div>
              </div>
            </ConfigProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  );
}
