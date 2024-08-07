import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { getNote } from "@/service";
import { seo } from "@/utility/seo";
import conf from "@config";
import { noMarkdown } from "@hheinsoee/utility";
import { Note, Project } from "@interface";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  if (isNaN(parseInt(params.id))) {
    return notFound();
  } else {
    // fetch data
    const { data } = await getNote({
      where: {
        id: parseInt(params.id),
      },
    });
    const resMetadata: Note = data[0];
    if (resMetadata) {
      return seo({
        title: resMetadata.title,
        description: resMetadata.description,
        images: resMetadata.image
          ? [{ url: myLink.image(resMetadata.image?.fileName) }]
          : [],
        url: myLink.project(params.id),
      });
    } else {
      notFound();
    }
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
