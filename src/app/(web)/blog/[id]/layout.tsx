import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { getBlog, getProject } from "@/service";
import { seo } from "@/utility/seo";
import conf from "@config";
import { noMarkdown } from "@hheinsoee/utility";
import { Blog, Project } from "@interface";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params

  // fetch data
  const { data } = await getBlog({
    where: {
      id: parseInt(params.id),
    },
  });
  const resMetadata: Blog = data[0];

  return seo({
    title: resMetadata.title,
    description: resMetadata.description,
    images: resMetadata.image
      ? [{ url: myLink.image(resMetadata.image?.fileName, "xl") }]
      : [],
    url: myLink.project(params.id),
  });
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
