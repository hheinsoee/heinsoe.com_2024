import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { seo } from "@/utility/seo";
import conf from "@config";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = seo({
  url: myLink.blog(),
  title: `${conf.title} | Blog`,
  description:
    "Welcome to my blog, a digital space where I share insights, experiences, and knowledge gained through my journey as a web developer. Dive into articles that explore frontend and backend development, UX/UI design tips, and practical coding tutorials. Join me as we discuss industry trends, best practices, and innovative solutions in web development. Whether you're a fellow developer, tech enthusiast, or simply curious about the digital world, let's connect, learn, and grow together through the power of shared knowledge.",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div>{children}</div>
    </Suspense>
  );
}
