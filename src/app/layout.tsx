import "./globals.css";
import "./bg.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import conf from "@config";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
const inter = Inter({ subsets: ["latin"] });
import RepoProvider from "../context/repo";
import {} from "@/service";
import { getTag } from "@/service/tag.service";
import { getTech } from "@/service/tech.service";
export const metadata: Metadata = {
  title: conf.name,
  description: conf.title,
};
export const revalidate = 3600;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = await getTag();
  const techs = await getTech();
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
        <RepoProvider init={{ tags, techs }}>
          <Suspense fallback={<Loading className="h-screen" />}>
            {children}
          </Suspense>
        </RepoProvider>
      </body>
    </html>
  );
}
