import "./../globals.css";
import { Loading } from "@/components/loading";
import { Suspense } from "react";

import StyledComponentsRegistry from "@/components/AntdRegistry";
import AdminLayout from "./_component/AdminLayout";
import { ThemeProvider } from "@/context/theme";
import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export default async function RootLayout({
  children,
  params: { session, ...params },
}) {
  console.log(session);
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
          <AdminLayout>{children}</AdminLayout>
        </ThemeProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
