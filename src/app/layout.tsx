import "./globals.css";
import "./bg.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import info from "../../siteInfo.json";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
const inter = Inter({ subsets: ["latin"] });

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
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
