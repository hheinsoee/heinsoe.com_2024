'use client'
import React, { createContext, useContext, useState } from "react";
import { Breadcrumb, Layout, message } from "antd";
import AdminMenu from "./MainMenu";


const { Header, Content, Footer, Sider } = Layout;


const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);



    return (
        <LayoutProvider>
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
                <Layout className="px-4 py-1 relative min-h-screen" >
                    <Content className="-my-1" >
                        {children}
                    </Content>
                    <Footer style={{ textAlign: "right" }} className="fixed bg-transparent bottom-0 right-0 p-16 opacity-25">
                        Crow CMS ©{new Date().getFullYear()} Created by heinsoe.com
                    </Footer>
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