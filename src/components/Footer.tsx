import myLink from "@/link";
import { Divider, Flex } from "antd";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="dotBg h-16" />
      <div className="text-sm opacity-50 font-light">
        <p>
          Crafted with passion using{" "}
          <Link href="https://nextjs.org" target="_blank">
            Next.js
          </Link>
          ,{" "}
          <Link href="https://tailwindcss.com/" target="_blank">
            Tailwind CSS
          </Link>
          , and{" "}
          <Link href="https://ant.design" target="_blank">
            Ant Design
          </Link>
          . This site showcases my journey and projects. Taking cues from{" "}
          <Link href="https://brittanychiang.com/" target="_blank">
            Brittany Chiang&apos;s portfolio
          </Link>{" "}
          website layout, I utilized similar concepts as a reference for this
          design.
        </p>
        <Divider className="my-2"/>
        <Flex justify="space-between">
          <span>&copy; {new Date().getFullYear()}</span>
          <Link href={myLink.privacyPolicy()}>Privacy Policy</Link>
        </Flex>
      </div>
    </div>
  );
}

export default Footer;
