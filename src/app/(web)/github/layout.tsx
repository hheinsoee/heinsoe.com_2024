import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { seo } from "@/utility/seo";
import conf from "@config";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";
export const metadata: Metadata = seo({
  url: myLink.repo(),
  title: `${conf.title} | Public Repo`,
  description:
    "Explore my GitHub repository showcasing a collection of innovative web development projects. From responsive frontend designs using HTML, CSS, and JavaScript frameworks like React and Vue.js to scalable backend solutions with Node.js and Express, each project demonstrates my commitment to clean code, robust architecture, and seamless user experiences. Whether you're a developer seeking inspiration or a collaborator interested in contributing, these projects offer practical insights and opportunities to explore cutting-edge technologies in the digital landscape. Join me on GitHub and let's build the future of web development together.",
  images:[{url:'https://github-readme-stats.vercel.app/api/top-langs/?username=hheinsoee&layout=compact&theme=merko&hide_border=true&&langs_count=6'}]
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
