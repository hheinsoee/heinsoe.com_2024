import myLink from "@/link";
import { Anchor, List, Switch } from "antd";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMailBulk,
  FaMailchimp,
  FaNpm,
  FaWhatsapp,
} from "react-icons/fa";

import conf from "@config";
import {
  ImGithub,
  ImLinkedin,
  ImLinkedin2,
  ImNpm,
  ImWhatsapp,
} from "react-icons/im";
import { SiNpm } from "react-icons/si";
import { useLayout } from "@/context/layout";
import { usePathname, useRouter } from "next/navigation";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import { PhoneFilled } from "@ant-design/icons";

function MyMenu() {
  const router = useRouter();
  const handleClick = (e: any, link: { href: string }) => {
    e.preventDefault();
    router.push(link.href);
  };
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <nav
      className={
        "max-h-screen overflow-hidden px-8 py-24 box-border flex flex-col  max-w-xl mx-auto"
      }
    >
      <div>
        <h1>
          <div className=" font-light">Hi, I am</div>
          <Link href="/" className="title" title={conf.title}>
            {conf.title}
          </Link>
        </h1>
        <div className=" font-thin">a {conf.description}</div>
        {/* <div className="opacity-50">{conf.moto}</div> */}
        <img
          alt={conf.description}
          src={`https://readme-typing-svg.herokuapp.com/?lines=${conf.moto
            .split(",")
            .join(";")}&size=14`}
        />
      </div>
      <div className="flex-1 my-16">
        <Anchor
          affix={false}
          onClick={handleClick}
          items={[
            {
              key: "Experience",
              href: "/#experience",
              title: "Experience",
            },
            {
              key: "Projects",
              href: isHome ? "/#projects" : myLink.project(),
              title: "Projects",
            },
            {
              key: "Stacks",
              href: "/#stacks",
              title: "Stacks",
            },
            {
              key: "note",
              href: isHome ? "/#note" : myLink.note(),
              title: "Note",
            },
            {
              key: "gitHubrepo",
              href: myLink.repo(),
              title: "Public Repo",
            },
          ]}
        />
      </div>
      <div className="text-2xl flex gap-3 flex-wrap">
        <Link
          href={myLink.github}
          target="_blank"
          className="opacity-50 hover:opacity-100 flex items-center"
        >
          <FaGithub />
        </Link>
        {/* <Link
          href={myLink.npm}
          target="_blank"
          className="opacity-50 hover:opacity-100"
        >
          <SiNpm style={{ fontSize: "16pt" }} />
        </Link> */}
        <Link
          href={myLink.linkedin}
          target="_blank"
          className="opacity-50 hover:opacity-100 flex items-center"
        >
          <FaLinkedin />
        </Link>
        <Link
          href={myLink.whatsapp}
          target="_blank"
          className="opacity-50 hover:opacity-100  flex items-center"
        >
          <FaWhatsapp />
        </Link>
        <Link
          href={myLink.email}
          target="_blank"
          className="opacity-50 hover:opacity-100  flex items-center"
        >
          <FaEnvelope />
        </Link>
        <Link
          href={myLink.phone}
          target="_blank"
          className="opacity-50 hover:opacity-100 flex items-center"
        >
          <PhoneFilled />
        </Link>
      </div>
    </nav>
  );
}

export default MyMenu;
