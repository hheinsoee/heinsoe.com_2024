"use client";
import React, { createContext, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { BiArrowBack } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button, Switch } from "antd";
import MyMenu from "@components/MyMenu";
import { LeftCircleOutlined, LeftOutlined } from "@ant-design/icons";

interface ThemeContextType {
  menuSize: "l" | "m" | "s" | null;
}

const LayoutContext = createContext<ThemeContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome: boolean = pathname === "/";

  const menuSize: "l" | "m" = useMemo(() => (isHome ? "l" : "m"), [isHome]);

  return (
    <LayoutContext.Provider value={{ menuSize }}>
      <canvas className="banner_canvas" id="canvas_banner"></canvas>

      <div className={`layout ${menuSize} mx-auto`}>
        <div className="menu flex-1">
          <div className="sticky " style={{ top: 0 }}>
            <MyMenu />
          </div>
        </div>
        <div className="flex-1 ">
          <div className="my-4">
            {/* {!isHome && (
              // <Link href={"/"} className="mx-4 md:hidden">
              
              // </Link>
            )} */}
            {children}
          </div>
        </div>
      </div>

      <Script src="/bg.js" />
    </LayoutContext.Provider>
  );
};

export const useLayout = (): ThemeContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
