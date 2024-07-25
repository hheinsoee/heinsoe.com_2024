"use client";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import Cell, { TechTag } from "@/components/Cell";
import React from "react";
import { Project, Tag, Tech } from "@interface";
import { Avatar, Image } from "antd";
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
    <Link href={myLink.project(project.id)} title={project.title}>
      <div className="my-10 flex gap-4 imgHover">
        {project.image && (
          // myLink.image(project.image.fileName, "m")
          <div>
            <Image
              className="img"
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
          <h3 className="m-0">{project.title}</h3>

          <MarkDownView text={project.description} />

          <div className="my-2 flex flex-wrap items-center gap-2">
            {/* {techs?.map(
              (t) =>
                t.image && (
                  <img
                    alt={t.name}
                    src={myLink.image(t.image?.fileName, "s")}
                    className="h-6"
                  />
                )
            )} */}
            {techs?.map((t) => (
              <TechTag key={t.id} id={t.id} className="text-sm" label />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectThumbnail;
