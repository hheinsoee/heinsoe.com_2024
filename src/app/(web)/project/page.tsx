import { notFound } from "next/navigation";
import ProjectTable from "./_components/ProjectTable";
import { getProject } from "@/service/project.service";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
import { og } from "./layout";
import Head from "next/head";
import myLink from "@/link";
import conf from "@config";
export default async function Page() {
  return await getProject({
    include: {
      tags: {
        include: {
          Tag: true,
        },
      },
      techs: {
        include: {
          Tech: {
            include: {
              image: true,
            },
          },
        },
      },
    },
  })
    .then(({ data }) => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "My Projects",
        itemListElement: data.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.description,
            url: `${conf.baseUrl}${myLink.project(p.id)}`,
          },
        })),
      };
      return (
        <>
          {/* <Head> */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
              }}
            />
          {/* </Head> */}
          <Header
            title={og.title}
            extra={
              <ActionBar title={og.title} text={og.description} url={og.url} />
            }
          />
          <ProjectTable data={data} />
        </>
      );
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}
