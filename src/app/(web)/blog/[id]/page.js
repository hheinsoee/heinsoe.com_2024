import ContentMenus from "@/components/contentMenu";
import { Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";

export default async function BlogDetails({ params }) {
  //for product detail
  return await getContent({
    where: {
      id: parseInt(params.id),
    },
  })
    .then(([blog]) => {
      return (
        <main className="px-8 max-w-5xl mx-auto ">
          <ContentMenus>
            {blog.img_url && <Image src={blog.img_url} />}
            <h2>{blog.title}</h2>
            <div className="text-sm flex gap-2 opacity-70 mb-4">
              <CalendarOutlined />{" "}
              {dayjs(blog.created_time).format("DD MMM YYYY")}
            </div>
            <MarkDownView text={blog.body} />
          </ContentMenus>
        </main>
      );
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}
