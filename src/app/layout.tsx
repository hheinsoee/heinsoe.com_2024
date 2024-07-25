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
import { GoogleAnalytics } from "@next/third-parties/google";
import StyledComponentsRegistry from "@/components/AntdRegistry";

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
  const techs = await getTech({orderBy:{order:'desc'}});
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <RepoProvider init={{ tags, techs }}>
            <Suspense fallback={<Loading className="h-screen" />}>
              {children}
            </Suspense>
          </RepoProvider>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId={conf.gaId} />
    </html>
  );
}
