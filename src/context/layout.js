"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

import { useTheme } from "@/context/theme";
import Link from "next/link";
import myLink from "@/link";
import { Button, Switch } from "antd";
import MyMenu from "@components/MyMenu";
import { usePathname } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa";

const LayoutContext = createContext(); // Rename the context variable
export const LayoutProvider = ({ children }) => {
  // const [menuSize, setMenuSize] = useState("l"); //l,m,s,null
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuSize = isHome ? "l" : "m";
  const { setDarkMode, isDark } = useTheme();
  return (
    <LayoutContext.Provider value={{ menuSize }}>
      <div className="light_effect" />
      <div className={`layout ${menuSize} mx-auto`}>
        <div className="menu flex-1">
          <div className="sticky " style={{ top: 0 }}>
            <MyMenu />
          </div>
        </div>
        <div className="flex-1">
          <div className="py-24">{children}</div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 8, right: 8 }}>
        <Switch
          style={isDark ? { background: "#000" } : {}}
          size="small"
          type="primary"
          onChange={(value) => setDarkMode(value)}
          checked={isDark}
          // checkedChildren={<MoonOutline />}
          // unCheckedChildren={<SunOutlined />}
        ></Switch>
      </div>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
