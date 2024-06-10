"use client";
import { Button, Timeline } from "antd";
import React from "react";

import { useRepo } from "@/app/(admin)/admin/_private/context/repo";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import Cell from "@/components/Cell";
import dayjs from "dayjs";
import { setting } from "@constant";
import { Content, ContentType, Taxonomy, TaxonomyType } from "@schema";

function ExperienceTimeLine({ experience }: { experience: Content[] }) {
  const orderedExperience = experience;
  const { repo } = useRepo();
  const contentTypes = repo.contentTypes;
  const taxonomyTypes = repo.taxonomyTypes || [];

  const content_type: ContentType = contentTypes.find(
    (t: ContentType) => t.name == "experience"
  );
  return (
    <Timeline
      items={orderedExperience.map((e, i) => {
        const end_date = dayjs(e?.fields?.find((a) => a.name == "end_date")?.value)
        const start_date = dayjs(e?.fields?.find((a) => a.name == "start_date")?.value)
        const organization = e?.fields?.find((a) => a.name == "organization")?.value
        return {
          color:
            i == 0
              ? "green"
              : dayjs().isAfter(end_date)
              ? "gray"
              : "blue",
          children: (
            <div>
              <div className="opacity-50">
                {dayjs(start_date).format("YYYY MMM")}{" "}
                -{" "}
                {end_date
                  ? dayjs(end_date).format(setting.dateFormat)
                  : "Current"}
              </div>
              <div>
                <h3 className="m-0 inline">{e.title}</h3>
                <span className="my-2 opacity-50">
                  {" "}
                  at {organization}
                </span>
              </div>
              <MarkDownView text={e.description} />
              {/* <div className='flex gap-1 my-2'>
                {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
                  {technology?.[l]?.Icon()} {l}
                </div>))}
              </div> */}
              <div className="my-2">
                <span className="opacity-50 text-xs">I use</span>
                {content_type?.taxonomyTypes?.map((f) => (
                  <div className="flex flex-wrap gap-2" key={f.name}>
                    {/* {taxonomyTypes
                      .find((t_l:TaxonomyType) => t_l.name == f.name)
                      . taxonomies.filter((taxo:Taxonomy) =>
                        e.t_taxonomy[f.name].includes(taxo.id)
                      )
                      ?.map((taxonomy) => (
                        <Cell
                          key={taxonomy.id}
                          className="text-xs"
                          type={f.name}
                          value={taxonomy.name}
                        />
                      ))} */}
                  </div>
                ))}
              </div>
            </div>
          ),
        };
      })}
    />
  );
}

export default ExperienceTimeLine;
