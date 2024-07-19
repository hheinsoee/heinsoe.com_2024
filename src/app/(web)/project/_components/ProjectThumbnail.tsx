"use client";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import Cell from "@/components/Cell";
import React from "react";
import { Project, Tag, Tech } from "@interface";
import { Image } from "antd";
import Link from "next/link";
import myLink from "@/link";
import { useRepo } from "@/context/repo";

function ProjectThumbnail({ project }: { project: Project }) {
  const { repo } = useRepo();
  const techIds = project?.techs?.map((t) => t.TechId);
  const techs: Tech[] = repo?.techs?.data.filter((t: any) =>
    techIds?.includes(t.id)
  );

  const tagIds = project?.tags?.map((t) => t.TagId);
  const tags: Tag[] = repo?.tags?.data.filter((t: any) =>
    tagIds?.includes(t.id)
  );
  return (
    <div className="my-10 flex gap-4 imgHover">
      {project.image && (
        // myLink.image(project.image.fileName, "m")
        <div >
          <Image
            src={myLink.image(project.image.fileName, "m")}
            width={100}
            height={100}
            style={{ objectFit: "contain", objectPosition: "top" }}
            title={project.title}
            alt={project.title}
            preview={false}
            // preview={{
            //   src: myLink.image(project.image.fileName, "xl"),
            // }}
          />
        </div>
      )}

      <div>
        <Link href={myLink.project(project.id)} title={project.title}>
          <h3 className="m-0">{project.title}</h3>

          <MarkDownView text={project.description} />
          <div className="my-2">
            {techs?.map((t) => (
              <Cell
                key={t.id}
                type="technology"
                value={t.name}
                className="mr-2 my-1 text-sm font-light"
              />
            ))}
            {/* {content_type?.t_field?.map((f) => (
                        <div key={f.name}>
                            <Cell type={f.data_type} value={project?.fields[f.name]} />
                        </div>
                    ))} */}
            {/* {content_type?.t_taxonomy?.map((f) => (
                        <div className="flex gap-2" key={f.name}>{
                            taxonomyTypes
                                .find((t_l) => t_l.name == f.name).r_taxonomy
                                .filter(taxo => project.t_taxonomy[f.name].includes(taxo.id))
                                ?.map(taxonomy => (
                                    <Cell key={taxonomy.id} type={f.name} value={taxonomy.name} />
                                )
                                )}</div>
                    ))} */}
          </div>
          {/* <div className='flex gap-1 my-2'>
          {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
            {technology?.[l]?.Icon()} {l}
          </div>))}
        </div> */}
        </Link>
      </div>
    </div>
  );
}

export default ProjectThumbnail;
