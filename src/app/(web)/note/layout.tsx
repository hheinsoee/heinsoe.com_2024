import ActionBar from "@/components/ActionBar";
import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { Seo, seo } from "@/utility/seo";
import conf from "@config";
import { Metadata } from "next";
import { Suspense } from "react";
// export const og = {
//   url: myLink.note(),
//   title: "Note",
//   description:
//     "Welcome to my note, a digital space where I share insights, experiences, and knowledge gained through my journey as a web developer. Dive into articles that explore frontend and backend development, UX/UI design tips, and practical coding tutorials. Join me as we discuss industry trends, best practices, and innovative solutions in web development. Whether you're a fellow developer, tech enthusiast, or simply curious about the digital world, let's connect, learn, and grow together through the power of shared knowledge.",
// };
export const metadata: Metadata = seo({
  url: myLink.note(),
  title: "Note",
  description:
    "Welcome to my note, a digital space where I share insights, experiences, and knowledge gained through my journey as a web developer. Dive into articles that explore frontend and backend development, UX/UI design tips, and practical coding tutorials. Join me as we discuss industry trends, best practices, and innovative solutions in web development. Whether you're a fellow developer, tech enthusiast, or simply curious about the digital world, let's connect, learn, and grow together through the power of shared knowledge.",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
