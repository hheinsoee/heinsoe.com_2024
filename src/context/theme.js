"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { App, ConfigProvider, theme } from "antd";
import { useCookies } from "react-cookie";
import { Loading } from "@/components/loading";
import Script from "next/script";
const ThemeContext = createContext(); // Rename the context variable
export const ThemeProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(["themeMode"]);
  const isDefaultDark = true;
  // cookie?.themeMode !== undefined ? cookie?.themeMode == "dark" : true;

  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    if (cookie?.themeMode) {
      setIsDark(cookie?.themeMode == "dark");
    } else {
      setIsDark(isDefaultDark);
    }
  }, [cookie.themeMode]);

  const setDarkMode = (value) => {
    setCookie("themeMode", value ? "dark" : "light", { path: "/" });
  };
  const [hue, setHue] = useState(210);
  // const hue = 180;
  // const hue = 210;
  // const hue = 235;
  // const [hue, setHue]=useState(180)
  const different = 10;
  const antTheme = {
    token: {
      colorPrimary: `hsl(${hue}, ${isDark ? "50%,60%" : "90%,45%"})`,
      // // borderRadius: borderRadius,
      fontFamily: "Arial",
      colorText: `hsl(${hue}, ${isDark ? "10%,70%" : "0%,0%"})`,
      colorPrimaryBg: `hsl(${hue}, ${isDark ? "35%,15%" : "70%,95%"})`,
      secondColor: `hsl(${hue + different}, ${isDark ? "50%,75%" : "50%,20%"})`,
      // colorLink: `hsl(${hue}, ${isDark ? "90%,60%" : "80%,50%"})`,
      colorBgContainer: `hsl(${hue + different}, ${
        isDark ? "10%,12%" : "10%,100%"
      })`,
      glassBg: `hsla(${hue}, ${isDark ? "12%,16%,40%" : "10%,100%, 70%"} )`,
      bodyBgColor: `hsl(${hue}, ${isDark ? "12%,10%" : "20%,95%"})`,
      successColor: (l, op) =>
        `hsla(130, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      errorColor: (l, op) =>
        `hsla(0, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      warnColor: (l, op) =>
        `hsla(30, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
      infoColor: (l, op) =>
        `hsla(200, ${isDark ? `70%,${l || 40}%` : `100%,${l || 50}%`}, ${
          op ? op : 100
        }%)`,
    },
    // components: {
    //   Layout: {
    //     colorBgHeader: "black",
    //     colorBgBody: "skyblue",
    //   },
    // },
    algorithm: [
      isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      // theme.compactAlgorithm,
    ],
  };
  if (isDark == null) {
    return <Loading className="h-screen" />;
  } else {
    return (
      <ThemeContext.Provider value={{ isDark, setDarkMode, setHue, hue }}>
        {/* <Slider defaultValue={hue} onChange={(v)=>setHue(v)} max={360}/> */}
        <ConfigProvider theme={antTheme}>
          <div data-mode={isDark ? "dark" : "light"} data-color-mode="dark">
            <canvas
              className="banner_canvas"
              id="canvas_banner"
            ></canvas>
            <App
              style={{
                // background: antTheme.token.bodyBgColor,
                background: `rgba(0,0,0,0.8)`,
                minHeight: "100vh",
                padding: 0,
                margin: 0,
              }}
            >
              {children}
            </App>
          </div>
        </ConfigProvider>

        <Script src="/bg.js" />
      </ThemeContext.Provider>
    );
  }
};

export const useTheme = () => useContext(ThemeContext);
