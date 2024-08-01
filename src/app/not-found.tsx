"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Image } from "antd";
import myLink from "@/link";
import conf from "@config";

function NotFoundPage() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center h-screen items-center bg-gray-700 text-white font-mono">
      <div>
        <Link href={myLink.home()} title={conf.title}>
          <Image
            src={myLink.image(conf.logo.main, "m", true)}
            alt="not found"
            height={60}
            width={60}
            className="m-2"
            preview={false}
          />
        </Link>
        <br />
        <div className="p-2 mt-4">
          404. <span className="opacity-50">That’s an error. </span>
          <br />
          The requested URL {pathname} was not found on this server. <br />
          <span className="opacity-50">That’s all we know.</span>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
