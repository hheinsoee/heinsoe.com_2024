import ContentMenus from "@/components/contentMenu";
import { Flex, Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import ActionBar from "@/components/ActionBar";
export default async function BlogDetails({ params }) {
  //for product detail
  return await getContent({
    where: {
      id: parseInt(params.id),
    },
  })
    .then(([blog]) => {
      return (
        <main className="px-8 mx-auto ">
          <ContentMenus>
            {blog.img_url && <Image src={blog.img_url} />}
            <Flex justify="space-between">
              <strong className="text-lg">{blog.title}</strong>
              <ActionBar />
            </Flex>
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
