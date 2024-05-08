
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import ProjectDetails from "./../_components/ProjectDetail";
export default async function Details({ params }) {
    //for product detail
    return await getContent({
        where: {
            id: parseInt(params.slug),
        },
    })
        .then(([data]) => {
            return (
                <ProjectDetails data={data} />
            );
        })
        .catch((error) => {
            console.log(error);
            notFound();
        });
}
