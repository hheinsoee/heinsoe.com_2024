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
  if (isNaN(parseInt(params.slug))) {
    return notFound();
  } else {
    return await getProject({
      where: {
        id: parseInt(params.slug),
      },
    })
      .then(({ data }) => {
        if (data.length > 0) {
          return (
            <>
              <h2 className="hidden">Project</h2>
              <ProjectDetails data={data[0]} />
            </>
          );
        } else {
          notFound();
          // throw new Error("not Found");
        }
      })
      .catch((error) => {
        console.log(error);
        notFound();
      });
  }
}
