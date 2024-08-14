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
      // const structuredData = {
      //   "@context": "http://schema.org",
      //   "@type": "WebPage",
      //   name: `Creative Works by ${conf.title}`,
      //   url: myLink.project(),
      //   mainEntity: {
      //     "@type": "ItemList",
      //     itemListElement: data.map((p, i) => ({
      //       "@type": "CreativeWork",
      //       name: p.title,
      //       description: p.description,
      //       url: p.url,
      //     })),
      //   },
      // };
      return (
        <>
          {/* <Head> */}
          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          /> */}
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
