import "./globals.css";
import "./bg.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import info from "@config";
import { Suspense } from "react";
import { Loading } from "@/components/loading";
const inter = Inter({ subsets: ["latin"] });
import RepoProvider from "./(admin)/admin/_private/context/repo";
import {
  getContentTypes,
  getTaxonomyTypes,
  prettyTaxonomy,
  prettyType,
} from "@/service";
export const metadata: Metadata = {
  title: info.name,
  description: info.title,
};
export const revalidate = 3600;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentTypes = await getContentTypes();
  const taxonomyTypes = await getTaxonomyTypes({ taxonomy: true });
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
        <RepoProvider
          init={{
            contentTypes: contentTypes.map((d) => prettyType(d)),
            taxonomyTypes: taxonomyTypes.map((d) => prettyTaxonomy(d)),
          }}
        >
          <Suspense fallback={<Loading className="h-screen" />}>
            {children}
          </Suspense>
        </RepoProvider>
      </body>
    </html>
  );
}
