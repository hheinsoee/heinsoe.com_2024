"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

import { useTheme } from "@/context/theme";
import Link from "next/link";
import myLink from "@/link";
import { Button } from "antd";

const LayoutContext = createContext(); // Rename the context variable
export const LayoutProvider = ({ children }) => {
  const [menuSize, setMenuSize] = useState("m"); //l,m,s, null
  const { setDarkMode, isDark } = useTheme();

  return (
    <LayoutContext.Provider value={{ menuSize, setMenuSize }}>
      <div
        className={`layout ${menuSize}`}
        style={{
          display: "flex",
          margin: "auto",
        }}
      >
        <div
          className="menu"
          style={{
            flex: 1,
          }}
        >
          <nav className="sticky h-screen" style={{ top: 0 }}>
            <Button type="primary" onClick={() => setDarkMode(!isDark)}>
              Primary Button
            </Button>
            <Link href={myLink.blog()}>Blog</Link>
          </nav>
        </div>
        <div className="flex-1">
          {["l", "m", "s", "no"].map((s) => (
            <Button onClick={() => setMenuSize(s)} key={s}>
              {s}
            </Button>
          ))}
          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
