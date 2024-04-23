'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, FloatButton, Layout, Menu, message, theme } from "antd";
import Link from "next/link";
import adminLink from "./../const_route"
import AdminMenu from "./MainMenu";

const { Header, Content, Footer, Sider } = Layout;


const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState(null)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (page?.path) {
            // go 
        }
    }, [page])

    return (
        <LayoutProvider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >

                    <div className="p-2">
                        <Link href={adminLink.home}>Home</Link>
                    </div>
                    Header
                </Header>
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
                    <Layout >

                        <Content className="min-h-screen m-8">
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            {children}
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            WP hub ©{new Date().getFullYear()} Created by heinsoe.com
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </LayoutProvider>
    );
};

export default AdminLayout;




const LayoutContext = createContext();
const LayoutProvider = ({ children }) => {
    const [messageAPi, contextHolder] = message.useMessage();

    return (
        <LayoutContext.Provider value={{ messageAPi }}>
            {contextHolder}
            {children}
        </LayoutContext.Provider>
    );
};

export const useAdminLayout = () => useContext(LayoutContext);