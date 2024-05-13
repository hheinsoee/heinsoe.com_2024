"use client";
import { Button, Space } from "antd";
import React from "react";
import { noHtml } from "@hheinsoee/utility";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

function ActionBar({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const handleShare = async () => {
    // try {
    //   await navigator.share(shareData);
    // } catch (err) {
    //   console.log("notshare");
    // }
    if (navigator.share) {
      // console.log({ title, text:noHtml(text), url});
      navigator
        .share({ title, text: noHtml(text), url })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    }
  };
  return (
    <Space>
      <Button
        type="text"
        icon={<ShareAltOutlined />}
        onClick={handleShare}
      ></Button>
    </Space>
  );
}

export default ActionBar;
