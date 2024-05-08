"use client";
import myLink from "@/link";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { MarkDownView } from "./../../../(admin)/admin/_private/components/Inputs";

export const BlogThumbnail = ({
  id,
  title,
  img_url,
  description,
  created_time,
}) => {
  return (
    <div className="flex justify-between flex-1">
      <div className="flex-1">
        <div className="opacity-70 dark:opacity-50 text-xs">
          <CalendarOutlined /> {dayjs(created_time).format("DD MMM YYYY")}
        </div>
        <Link className="text-lg" href={myLink.blog(id)}>
          {title}
        </Link>
        <MarkDownView text={description} />
        <Space>
          <Button type="text" icon={<ShareAltOutlined />}></Button>
        </Space>
      </div>
      {img_url && <Image src={img_url} width={100} height={100} />}
    </div>
  );
};
export const BlogCard = ({ id, title, img_url, description, created_time }) => {
  return (
    <div className="blog_card mb-8">
      {img_url && (
        <img
          className="w-full h-56 object-cover object-center rounded-xl"
          src={img_url}
          alt={title}
        />
      )}
      <div className="py-4">
        <Link
          href={myLink.blog(id)}
          alt={title}
          className={`hover:underline font-bold tracking-tight ${
            img_url ? "text-2xl mb-2 " : "text-3xl mb-4 "
          }`}
        >
          {title}
        </Link>
        <div className="text-sm flex gap-2 opacity-70 mb-4">
          <CalendarOutlined /> {dayjs(created_time).format("DD MMM YYYY")}
        </div>
        {!img_url && (
          <p
            className={`mb-5 font-normal ${
              img_url ? "line-clamp-3" : "line-clamp-6"
            }`}
          >
            {description}
          </p>
        )}
        <Space>
          <Button type="text" icon={<ShareAltOutlined />}></Button>
        </Space>
      </div>
    </div>
  );
};
