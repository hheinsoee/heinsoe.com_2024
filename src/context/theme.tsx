"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { App, ConfigProvider, Switch, theme } from "antd";
import { useCookies } from "react-cookie";
import { Loading } from "@/components/Loading";
import Script from "next/script";
interface ThemeContextType {
  isDark: boolean | null;
  setDarkMode: (value: boolean) => void;
  setHue: React.Dispatch<React.SetStateAction<number>>;
  hue: number;
  theme: any; // Adjust the type according to your theme object structure
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, setCookie] = useCookies(["themeMode"]);
  const isDefaultDark = true;
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (cookie?.themeMode) {
      setIsDark(cookie.themeMode === "dark");
    } else {
      setIsDark(isDefaultDark);
    }
  }, [cookie.themeMode]);

  const setDarkMode = (value: boolean) => {
    setCookie("themeMode", value ? "dark" : "light", { path: "/" });
  };

  const [hue, setHue] = useState(200);
  // const hue = 180;
  // const hue = 210;
  // const hue = 235;
  // const [hue, setHue]=useState(180)
  const different = 0;
  const antTheme = {
    token: {
      colorPrimary: `hsl(${hue}, ${isDark ? "50%,60%" : "90%,45%"})`,
      // // borderRadius: borderRadius,
      fontFamily: "Arial",
      colorText: isDark ? "#ffffff" : "#000000", //`hsl(${hue}, ${isDark ? "10%,100%" : "0%,0%"})`,
      colorPrimaryBg: `hsl(${hue}, ${isDark ? "35%,15%" : "70%,95%"})`,
      secondColor: `hsl(${hue + different}, ${isDark ? "50%,75%" : "50%,20%"})`,
      // colorLink: `hsl(${hue}, ${isDark ? "90%,60%" : "80%,50%"})`,
      colorBgContainer: `hsl(${hue + different}, ${
        isDark ? "40%,10%" : "10%,100%"
      })`,
      colorBgContainer_: `hsla(${hue + different}, ${
        isDark ? "50%,12%" : "10%,100%"
      },40%)`,
      glassBg: `hsla(${hue}, ${isDark ? "12%,16%,40%" : "10%,100%, 70%"} )`,
      bodyBgColor: `hsl(${hue}, ${isDark ? "12%,10%" : "20%,95%"})`,

      colorPrimary_: (l: number, op: number) =>
        `hsla(${hue}, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      successColor: (l: number, op: number) =>
        `hsla(130, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      errorColor: (l: number, op: number) =>
        `hsla(0, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      warnColor: (l: number, op: number) =>
        `hsla(30, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      infoColor: (l: number, op: number) =>
        `hsla(200, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
    },
    components: {
      Layout: {
        // colorBgHeader: isDark ? "black" : "white",
        bodyBg: isDark ? `hsl(${hue}, 40%, 10%)` : "#FFF",
      },
    },
    algorithm: [
      isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // theme.compactAlgorithm,
    ],
  };
  const updateThemeColor = (color: string) => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute("content", color);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.name = "theme-color";
      newMetaTag.content = color;
      document.head.appendChild(newMetaTag);
    }
  };
  useEffect(() => {
    updateThemeColor(antTheme.token.colorBgContainer);
  }, [isDark]);

  if (isDark == null) {
    return <Loading className="h-screen" />;
  } else {
    return (
      <ThemeContext.Provider
        value={{ isDark, setDarkMode, setHue, hue, theme: antTheme }}
      >
        {/* <Slider defaultValue={hue} onChange={(v)=>setHue(v)} max={360}/> */}
        <ConfigProvider theme={antTheme}>
          <div data-mode={isDark ? "dark" : "light"} data-color-mode="dark">
            <div
              style={{
                background: antTheme.token.colorBgContainer,
                position: "fixed",
                zIndex: -2,
                top: 0,
                left: 0,
                right: 0,
                height: "100vh",
                width: "100%",
              }}
            />
            <App
              style={{
                background: antTheme.token.colorBgContainer_,
                minHeight: "100vh",
                padding: 0,
                margin: 0,
              }}
            >
              {children}
            </App>
          </div>
          <div style={{ position: "fixed", bottom: 8, right: 8 }}>
            <Switch
              style={isDark ? { background: "#000" } : {}}
              size="small"
              onChange={(value) => setDarkMode(value)}
              checked={isDark}
              // checkedChildren={<MoonOutline />}
              // unCheckedChildren={<SunOutlined />}
            ></Switch>
          </div>
        </ConfigProvider>
      </ThemeContext.Provider>
    );
  }
};

export const useTheme = () => useContext(ThemeContext);
