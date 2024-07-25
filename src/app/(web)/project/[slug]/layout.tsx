import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { getProject } from "@/service";
import { seo } from "@/utility/seo";
import conf from "@config";
import { noMarkdown } from "@hheinsoee/utility";
import { Project } from "@interface";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params

  // fetch data
  const { data } = await getProject({
    where: {
      id: parseInt(params.slug),
    },
  });
  const resMetadata: Project = data[0];

  return seo({
    title: resMetadata.title,
    description: resMetadata.description,
    images: resMetadata.image
      ? [{ url: myLink.image(resMetadata.image?.fileName) }]
      : [],
    url: myLink.project(params.slug),
  });
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
