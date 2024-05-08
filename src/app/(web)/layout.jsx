import "./../globals.css";
import "./../bg.css";
import { Loading } from "@components/loading";
import info from "../../../siteInfo.json";
import { Suspense } from "react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { ThemeProvider } from "@/context/theme";
import { LayoutProvider } from "@/context/layout";
import Head from "next/head";
import Script from "next/script";
import { getContentStructure } from "../(admin)/admin/_private/service/t_content";
import { getTaxonomyTypes } from "../(admin)/admin/_private/service/t_taxonomy";
import RepoProvider from "../(admin)/admin/_private/context/repo";

export const metadata = {
  title: info.name,
  description: info.title,
};

export default async function RootLayout({
  children,
}) {
  const ls_content_type = await getContentStructure();
  const ls_taxonomy_type = await getTaxonomyTypes({ r_taxonomy: true });
  return (
    <StyledComponentsRegistry>
      <Suspense fallback={<Loading />}>
        <RepoProvider repo={{ ls_content_type, ls_taxonomy_type }}>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </RepoProvider>
      </Suspense>
    </StyledComponentsRegistry>
  );
}
