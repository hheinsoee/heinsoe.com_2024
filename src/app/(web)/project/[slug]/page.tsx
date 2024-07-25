import { notFound } from "next/navigation";
import ProjectDetails from "../_components/ProjectDetail";
import { getProject } from "@/service/project.service";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
import { noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";

export default async function Details({
  params,
}: {
  params: { slug: string };
}) {
  return await getProject({
    where: {
      id: parseInt(params.slug),
    },
  })
    .then(({ data }) => {
      return (
        <>
          <h2 className="hidden">Project</h2>
          <ProjectDetails data={data[0]} />
        </>
      );
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}
