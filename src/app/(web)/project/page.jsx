
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import ProjectTable from './_components/ProjectTable';
import { getContentStructure } from "@/app/(admin)/admin/_private/service/t_content";
export default async function Page() {
    const ls_content_type = await getContentStructure();
    const content_type = ls_content_type.find(t => t.name == 'project')

    return await getContent({
        where: {
            t_content_id: content_type.id,
        }
    })
        .then((data) => {
            return (
                <ProjectTable data={data} />
            );
        })
        .catch((error) => {
            console.log(error);
            notFound();
        });
}
