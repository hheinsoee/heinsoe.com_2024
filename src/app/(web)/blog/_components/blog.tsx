"use client";
import myLink from "@/link";
import { CalendarOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Divider, Image, List, Space, Typography } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import ActionBar from "@/components/ActionBar";
import { noMarkdown } from "@hheinsoee/utility";

import { MarkDownView } from "../../../(admin)/_components/Inputs";
import { Blog } from "@interface";

export const BlogThumbnail = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex justify-between flex-1 gap-4">
      <div className="flex-1">
        <div className="opacity-70 dark:opacity-50 text-xs">
          <CalendarOutlined /> {dayjs(blog.createdDt).format("DD MMM YYYY")}
        </div>
        <h3>
          <Link
            className="text-lg"
            href={myLink.blog(blog.id)}
            title={blog.title}
          >
            {blog.title}
          </Link>
        </h3>
        <MarkDownView
          text={`${blog.description.substring(0, 200)} ${
            blog.description.length > 200 ? " ..." : ""
          }`}
        />
        <ActionBar
          title={blog.title}
          text={noMarkdown(blog.description)}
          url={myLink.blog(blog.id)}
        />
      </div>
      {blog.image && (
        <div className="opacity-30 hover:opacity-80 saturate-0 hover:saturate-100 brightness-30 contrast-60 hover:contrast-100 hover:brightness-100  mix-blend-luminosity hover:mix-blend-normal">
          <Image
            src={myLink.image(blog.image.fileName, "m")}
            style={{ objectFit: "cover" }}
            width={100}
            height={100}
            alt={blog.title}
            title={blog.title}
            preview={{ src: myLink.image(blog.image.fileName, "xl") }}
          />
        </div>
      )}
    </div>
  );
};

export const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <List>
      {blogs.map((b) => (
        <List.Item key={b.id}>
          <BlogThumbnail blog={b} />
        </List.Item>
      ))}
    </List>
  );
};
