"use client";

import {
  GrProductHunt,
  GrLanguage,
  GrBusinessService,
  GrServices,
} from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { MdEvent, MdOutlineCategory } from "react-icons/md";
import { LuType } from "react-icons/lu";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { contentType } from "@/app/contentSetting";

const items = [
  {
    key: "dashboard",
    label: <Link href="/admin/">Dashboard</Link>,
    icon: <BiSolidDashboard className="text-2xl" />,
  },
  ...contentType.map((c) => {
    return {
      key: c.name,
      label: <Link href={`/admin/content/${c.name}`}>{c.label}</Link>,
      icon: c.icon || null,
    };
  }),
  {
    key: "setting",
    label: <Link href="/admin/setting">Setting</Link>,
    icon: <CiSettings className="text-2xl" />,
  },
  {
    key: "terms",
    label: "Terms",
    icon: <SettingOutlined />,
    children: [
      {
        key: "category",
        label: <Link href="/admin/category">Category</Link>,
        icon: <MdOutlineCategory className="text-2xl" />,
      },
      {
        key: "language",
        label: <Link href="/admin/language">Language</Link>,
        icon: <GrLanguage className="text-2xl" />,
      },
    ],
  },
  {
    key: "Logout",
    label: <Link href="">Logout</Link>,
    icon: <AiOutlineLogout className="text-2xl" />,
  },
];
const App = () => {
  const nav = useRouter();

  const [current, setCurrent] = useState("dashboard");
  const onClick = (e) => {
    if (e.key === "Logout") {
      Cookies.remove("auth");
      nav.push("/signin");
    } else {
      setCurrent(e.key);
    }
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};
export default App;
