import ContentMenus from "@/components/contentMenu";
import { Flex, Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { getBlog } from "@service/blog.service";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import ActionBar from "@/components/ActionBar";
import { noHtml, noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
import { Blog } from "@interface";
import conf from "@config";

export default async function BlogDetails({
  params,
}: {
  params: { id: string };
}) {
  return await getBlog({
    where: {
      id: parseInt(params.id),
    },
  })
    .then(({ data }) => {
      return <BlogDetailsView blog={data[0]} />;
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}

function BlogDetailsView({ blog }: { blog: Blog }) {
  return (
    <>
    <h2 className="hidden">Blogs</h2>
    <ContentMenus>
      {blog.image && (
        <Image
          src={myLink.image(blog.image.fileName, "xl")}
          alt={blog.title}
          title={blog.title}
        />
      )}
      <div className="p-4 lg:p-0">
        <Flex justify="space-between">
          <h3 className="text-lg">{blog.title}</h3>
          <ActionBar
            title={blog.title}
            text={noMarkdown(blog.description)}
            url={myLink.blog(blog.id)}
          />
        </Flex>
        <div className="text-sm flex gap-2 opacity-70 mb-4">
          <CalendarOutlined />{" "}
          {dayjs(blog.createdDt).format(conf.dateTimeFormat)}
        </div>
        <MarkDownView text={blog.body} />
      </div>
    </ContentMenus>
    </>
  );
}
