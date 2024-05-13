"use client";
import myLink from "@/link";
import { CalendarOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, List, Space } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import ActionBar from "@/components/ActionBar";
import { noMarkdown } from "@hheinsoee/utility";

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
        <ActionBar
          title={title}
          text={noMarkdown(description)}
          url={myLink.blog(id)}
        />
      </div>
      {img_url && <Image src={img_url} width={100} height={100} />}
    </div>
  );
};
export const BlogCard = ({ id, title, img_url, description, created_time }) => {
  return (
    <div className="my-10 flex gap-4">
      <Image
        src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
        width={100}
        height={100}
      />
      <div>
        <h3 className="m-0">Project A</h3>
        <h4 className="my-2 opacity-50">cms, Social</h4>
        <div className="dark:opacity-70 ">This is about project.</div>
        {/* <div className='flex gap-1 my-2'>
              {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
                {technology?.[l]?.Icon()} {l}
              </div>))}
            </div> */}
      </div>
    </div>
  );
};

export const BlogList = ({ blogs }) => {
  return (
    <List>
      {blogs.map((b) => (
        <List.Item key={b.id}>
          <BlogThumbnail {...b} />
        </List.Item>
      ))}
    </List>
  );
};
