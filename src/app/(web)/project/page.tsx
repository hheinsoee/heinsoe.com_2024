import { notFound } from "next/navigation";
import ProjectTable from "./_components/ProjectTable";
import { getProject } from "@/service/project.service";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
import { og } from "./layout";
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
      return (
        <>
          <Header
            title={og.title}
            extra={
              <ActionBar
                title={og.title}
                text={og.description}
                url={og.url}
              />
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
