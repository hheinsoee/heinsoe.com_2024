"use client";
import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRepo } from "../context/repo";
import Link from "next/link";
import { adminLink } from "./../route";
import { FaDotCircle } from "react-icons/fa";

const AdminMenu: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const { type } = useRepo();
  return (
    <Menu
      onClick={onClick}
      title="hello"
      style={{ border: "none" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={[
        {
          key: "content",
          children: type.map((t: any) => ({
            key: t.id,
            icon: <FaDotCircle />,
            label: <Link href={adminLink.type(t.name)}>{t.name}</Link>,
          })),
          label: "content",
          type: "group",
        },

        { type: "divider" },
      ]}
    />
  );
};

export default AdminMenu;
