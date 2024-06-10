import { notFound } from "next/navigation";
import { getContent, prettyContent } from "@service";
import ProjectDetails from "../_components/ProjectDetail";
export default async function Details({
  params,
}: {
  params: { slug: string };
}) {
  return await getContent({
    where: {
      id: parseInt(params.slug),
    },
  })
    .then((data) => {
      return <ProjectDetails data={prettyContent(data)} />;
    })
    .catch((error) => {
      console.log(error);
      notFound();
    });
}
