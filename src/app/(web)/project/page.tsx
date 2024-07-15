import { notFound } from "next/navigation";
import ProjectTable from "./_components/ProjectTable";
import { getProject } from "@/service/project.service";
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
          Tech: true,
        },
      },
    },
  })
    .then(({ data }) => {
      return <ProjectTable data={data} />;
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}
