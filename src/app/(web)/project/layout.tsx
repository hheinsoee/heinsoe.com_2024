import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { seo } from "@/utility/seo";
import conf from "@config";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";
export const metadata: Metadata = seo({
  url: myLink.project(),
  title: `${conf.title} | Projects`,
  description:
    "My portfolio showcases a collection of my web development projects, highlighting my expertise in frontend and backend technologies. With a focus on responsive design and user experience, each project demonstrates my proficiency in HTML, CSS, JavaScript, and frameworks like React. I prioritize clean code and efficient problem-solving, ensuring robust functionality and seamless integration. From interactive web applications to intuitive UI/UX designs, my portfolio reflects my passion for crafting engaging digital experiences tailored to client needs",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
