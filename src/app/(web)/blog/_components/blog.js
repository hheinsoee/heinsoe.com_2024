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
  isDark,
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
          <Button ghost={isDark} icon={<ShareAltOutlined />}></Button>
          <Button
            ghost={isDark}
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

export const BlogGrid = ({ content, isDark }) => {
  return (
    <main className="p-4 ">
      <div className="max-w-5xl mx-auto py-20">
        <h2 className=" text-3xl mb-5">Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {content &&
            content.map((s) => {
              return <BlogCard key={s.id} {...s} isDark={isDark} />;
            })}
        </div>
      </div>
    </main>
  );
};
