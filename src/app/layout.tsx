import "./globals.css";
import "./bg.css";
import type { Metadata } from "next";
import conf from "@config";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import RepoProvider from "../context/repo";
import {} from "@/service";
import { getTag } from "@/service/tag.service";
import { getTech } from "@/service/tech.service";
import { GoogleAnalytics } from '@next/third-parties/google'

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
      <body>
        <RepoProvider init={{ tags, techs }}>
          <Suspense fallback={<Loading className="h-screen" />}>
            {children}
          </Suspense>
        </RepoProvider>
      </body>
      <GoogleAnalytics gaId={conf.gaId} />
    </html>
  );
}
