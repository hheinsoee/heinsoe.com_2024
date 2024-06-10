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
import { adminLink } from "../adminRoute";
import { FaDotCircle } from "react-icons/fa";

const AdminMenu: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const { repo } = useRepo();
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
          children: repo.contentTypes.map((t: any) => ({
            key: t.id,
            icon: <FaDotCircle />,
            label: <Link href={adminLink.content(t.name)}>{t.name}</Link>,
          })),
          label: "content",
          type: "group",
        },

        { type: "divider" },
        {
          key: "content",
          children: [
            {
              key: "content_type",
              icon: <FaDotCircle />,
              label: (
                <Link href={adminLink.setup("content")}>
                  Content Type Manager
                </Link>
              ),
            },
            {
              key: "taxonomy_type",
              icon: <FaDotCircle />,
              label: (
                <Link href={adminLink.setup("taxonomy")}>Taxonomy Manager</Link>
              ),
            },
          ],
          label: "setup",
          type: "group",
        },
      ]}
    />
  );
};

export default AdminMenu;
