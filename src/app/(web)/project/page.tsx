import { notFound } from "next/navigation";
import { getContent, getContentType, getContentTypes } from "@service";
import ProjectTable from "./_components/ProjectTable";
export default async function Page() {
  const [content_type] = await getContentTypes({
    where: {
      name: "project",
    },
  });
  if (content_type) {
    return await getContent({
      where: {
        contentTypeId: content_type?.id,
      },
    })
      .then((data) => {
        return <ProjectTable data={data} />;
      })
      .catch((error) => {
        console.log(error);
        notFound();
      });
  } else {
    notFound;
  }
}
