import "./../globals.css";
import "./../bg.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Loading } from "@components/loading";
import info from "../../../siteInfo.json";
const inter = Inter({ subsets: ["latin"] });
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { LayoutProvider } from "@/context/layout";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
  title: info.name,
  description: info.title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.ga = window.ga || function(){" "}
          {(ga.q = ga.q || []).push(arguments)};
              `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        {/* <AppProgressBar
          height="2px"
          color="cyan"
          options={{ showSpinner: true }}
          shallowRouting
        /> */}

     

        <StyledComponentsRegistry>
          <Suspense fallback={<Loading />}>
            <ThemeProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </ThemeProvider>
          </Suspense>
        </StyledComponentsRegistry>
        
       
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('mousemove', function(event) {
                var targetElement = document.getElementById('mouseMoveee');
                color_hover(event);
                //console.log(targetElement); // You can do whatever you want with the element here
            });
              `,
          }}
        /> */}
      </body>
    </html>
  );
}
