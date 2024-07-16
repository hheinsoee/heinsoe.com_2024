"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  CodeFilled,
  CommentOutlined,
  DotChartOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Divider, Image, Menu, Space } from "antd";
import Link from "next/link";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { BiPen } from "react-icons/bi";
import { adminLink } from "../_private/adminLink";
import myLink from "@/link";
import conf from "@config";
import { logout } from "@/auth";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    icon: <HomeOutlined />,
    key: adminLink.experience(),
    label: "experience",
  },
  {
    icon: <CodeFilled />,
    key: adminLink.project(),
    label: "project",
  },
  {
    icon: <BiPen />,
    key: adminLink.blog(),
    label: "blog",
  },
  {
    icon: <DotChartOutlined />,
    key: adminLink.tag(),
    label: "tag",
  },
  {
    icon: <CodeFilled />,
    key: adminLink.tech(),
    label: "tech",
  },
];

const AdminMenu = ({ collapsed }: { collapsed?: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  // const path = `/${pathname.split("/")[1]}/${pathname.split("/")[2]}`;

  return (
    <div className="h-full flex flex-col justify-between overflow-auto hideScroll">
      <Link href={adminLink.home()} className="sticky top-0">
        <Image
          alt={conf.title}
          src={myLink.image(conf.logo.main, "m", true)}
          height={40}
          width={40}
          className="my-4 mx-6"
          preview={false}
        />
      </Link>
      <Divider />
      <div className="flex flex-col justify-between flex-1">
        <Menu
          mode="inline"
          style={{ border: "none", backgroundColor: "transparent" }}
          // defaultSelectedKeys={["231"]}
          // openKeys={stateOpenKeys}
          selectedKeys={[pathname]}
          // onOpenChange={onOpenChange}
          onClick={(e) => router.push(e.key, { scroll: false })}
          items={[
            ...items,
            {
              key: adminLink.user(),
              icon: "",
              label: (
                <Button onClick={() => logout()} className="w-full">
                  Log Out
                </Button>
              ),
            },
          ]}
          // theme="dark"
        />
      </div>
    </div>
  );
};

export default AdminMenu;
