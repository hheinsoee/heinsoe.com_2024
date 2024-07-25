"use client";
import myLink from "@/link";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { JSONTree } from "react-json-tree";

function Header({
  title,
  extra,
}: {
  title?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Flex justify="space-between" className="p-4">
      <Space>
        <Button
          className="md:hidden"
          icon={<LeftOutlined />}
          onClick={(e) => router.back()}
          type="text"
        />
        {title}
      </Space>
      {extra}
    </Flex>
  );
}

export default Header;
