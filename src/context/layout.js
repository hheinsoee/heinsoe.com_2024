"use client";
import React, { createContext, useContext, useState } from "react";

import { useTheme } from "@/context/theme";
import Link from "next/link";
import myLink from "@/link";
import { Button } from "antd";

const LayoutContext = createContext(); // Rename the context variable
export const LayoutProvider = ({ children }) => {
  const [menuSize, setMenuSize] = useState("l"); //l,m,s, null
  const { setDarkMode, isDark } = useTheme();
  return (
    <LayoutContext.Provider value={{ menuSize, setMenuSize }}>
      <nav>
        {menuSize}
        <Button type="primary" onClick={() => setDarkMode(!isDark)}>
          Primary Button
        </Button>
        <Link href={myLink.blog()}>Blog</Link>
      </nav>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
