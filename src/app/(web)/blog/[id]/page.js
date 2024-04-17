import ContentMenus from "@/components/contentMenu";
import { Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getBlogDetail } from "../action";
import { notFound } from "next/navigation";

export default async function BlogDetails({ params }) {
  //for product detail
  return await getBlogDetail(params.id).then((blog) => {
    return (
      <main className="max-w-5xl mx-auto pt-20">
        <ContentMenus>
          {blog.img_url && <Image src={blog.img_url} />}
          <h2>{blog.title}</h2>
          <div className="text-sm flex gap-2 opacity-70 mb-4">
            <CalendarOutlined />{" "}
            {dayjs(blog.created_time).format("DD MMM YYYY")}
          </div>
          <div
            className="noBase max-w-xl"
            dangerouslySetInnerHTML={{ __html: blog.body || "" }}
          />
        </ContentMenus>
      </main>
    );
  }).catch((error)=>{
    console.log(error)
    notFound()
  })
}
