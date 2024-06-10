"use client";
import React, { createContext, useContext, useState } from "react";
import { Breadcrumb, Layout, message } from "antd";
import AdminMenu from "./MainMenu";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="sticky top-0">
          <AdminMenu />
        </div>
      </Sider>
      <Layout className="min-h-screen">
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
