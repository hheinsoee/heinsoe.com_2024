"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

import { useTheme } from "@/context/theme";
import Link from "next/link";
import myLink from "@/link";
import { Button, Switch } from "antd";
import MyMenu from "@components/MyMenu";
import { usePathname } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa";
import Script from "next/script";

const LayoutContext = createContext(); // Rename the context variable
export const LayoutProvider = ({ children }) => {
  // const [menuSize, setMenuSize] = useState("l"); //l,m,s,null
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuSize = isHome ? "l" : "m";
  return (
    <LayoutContext.Provider value={{ menuSize }}>
      <canvas className="banner_canvas" id="canvas_banner"></canvas>
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
      <Script src="/bg.js" />
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
