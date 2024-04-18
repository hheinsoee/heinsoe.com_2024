"use client";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

export const BlogCard = ({
  id,
  title,
  img_url,
  description,
  created_time,
}) => {
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
        <Link href={`/blog/${id}`} alt={title}>
          <h5
            className={`hover:underline font-bold tracking-tight ${
              img_url ? "text-2xl mb-2 " : "text-3xl mb-4 "
            }`}
          >
            {title}
          </h5>
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
          <Button  icon={<ShareAltOutlined />}></Button>
          <Button
            href={`/blog/${id}`}
            alt={title}
            icon={<ArrowRightOutlined />}
          >
            Read more
          </Button>
        </Space>
      </div>
    </div>
  );
};

