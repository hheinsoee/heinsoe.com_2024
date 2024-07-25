"use client";
import ContentMenus from "@/components/contentMenu";
import { Divider, Flex, Image } from "antd";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import ActionBar from "@/components/ActionBar";
import Cell, { TechTag } from "@/components/Cell";
import { noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
import { Project, Tag, Tech } from "@interface";
import { JSONTree } from "react-json-tree";
import { useRepo } from "@/context/repo";
import Header from "@/components/Header";
export default function ProjectDetails({ data }: { data: Project }) {
  const { repo } = useRepo();
  const techIds = data?.techs?.map((t) => t.TechId);
  // const techs: Tech[] = repo?.techs?.data.filter((t: any) =>
  //   techIds?.includes(t.id)
  // );

  const tagIds = data?.tags?.map((t) => t.TagId);
  const tags: Tag[] = repo?.tags?.data.filter((t: any) =>
    tagIds?.includes(t.id)
  );
  return (
    <main>
      {/* <JSONTree data={data}/> */}
      <ContentMenus>
        <Header
          title={<h3 className="font-bold m-0">{data?.title}</h3>}
          extra={
            <ActionBar
              title={data.title}
              text={noMarkdown(data.description)}
              url={myLink.project(data.id)}
            />
          }
        />
        {/* <Flex justify="space-between" className="mt-8">
          <h3 className="text-lg">{data?.title}</h3>{" "}
          <ActionBar
            title={data.title}
            text={noMarkdown(data.description)}
            url={myLink.note(data.id)}
          />
        </Flex> */}
        {/* <Divider className="mt-0"/> */}
        <div className="mx-4">
          {/* <h3 className="text-lg m-0">{data?.title}</h3> */}
          {data.image && (
            <Image
              src={myLink.image(data.image?.fileName, "s")}
              alt={data.title}
              title={data.title}
              preview={{ src: myLink.image(data.image?.fileName, "xl") }}
            />
          )}
          <MarkDownView text={data?.description} />
          <Divider />
          <section className="my-8">
            <div className="opacity-30">techs</div>

            <div className="flex flex-wrap items-center gap-2">
              {techIds?.map((t) => (
                <TechTag key={t} id={t} label />
              ))}
            </div>
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
