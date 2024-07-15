"use client";
import ContentMenus from "@/components/contentMenu";
import { Divider, Flex, Image } from "antd";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import ActionBar from "@/components/ActionBar";
import Cell from "@/components/Cell";
import { noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
import { Project, Tag, Tech } from "@interface";
import { JSONTree } from "react-json-tree";
import { useRepo } from "@/context/repo";
export default function ProjectDetails({ data }: { data: Project }) {
  const { repo } = useRepo();
  const techIds = data?.techs?.map((t) => t.TechId);
  const techs: Tech[] = repo?.techs?.data.filter((t: any) =>
    techIds?.includes(t.id)
  );

  const tagIds = data?.tags?.map((t) => t.TagId);
  const tags: Tag[] = repo?.tags?.data.filter((t: any) =>
    tagIds?.includes(t.id)
  );
  return (
    <main>
      <ContentMenus>
        <div className="mx-4">
          {data.image && (
            <Image
              src={myLink.image(data.image?.fileName, "xl")}
              alt={data.title}
              title={data.title}
            />
          )}
          <Flex justify="space-between" className="mt-8">
            <h3 className="text-lg">{data?.title}</h3>{" "}
            <ActionBar
              title={data.title}
              text={noMarkdown(data.description)}
              url={myLink.blog(data.id)}
            />
          </Flex>
          <MarkDownView text={data?.description} />
          <Divider />
          <section className="my-8">
            <div className="opacity-60">Project Info</div>
            {techs?.map((t) => (
              <Cell
                key={t.id}
                type="technology"
                value={t.name}
                className="mr-2 my-1"
              />
            ))}
            <Divider className="my-2" />
            <div className="opacity-50">
              {tags?.map((t) => `#${t.name}`).join(", ")}
            </div>
          </section>
          {/* <JSONTree data={{ techs }} /> */}

          <Divider />

          <MarkDownView text={data?.body || ""} />

          <div className="dotBg h-40" />
        </div>
      </ContentMenus>
    </main>
  );
}
