"use client";
import { Button, Timeline } from "antd";
import React from "react";

import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import Cell, { TechTag } from "@/components/Cell";
import dayjs from "dayjs";
import { Experience, Tech } from "@interface";
import { useRepo } from "@/context/repo";
import conf from "@config";
import myLink from "@/link";

function ExperienceTimeLine({ experience }: { experience: Experience[] }) {
  const orderedExperience = experience;
  const { repo } = useRepo();
  return (
    <Timeline
      items={orderedExperience.map((e, i) => {
        const end_date = e.endDate ? dayjs(e.endDate) || null : null;
        const start_date = dayjs(e.startDate);
        const organization = e.organization;
        const techIds = e?.techs?.map((t) => t.TechId);
        // const techs: Tech[] = repo?.techs?.data.filter((t: any) =>
        //   techIds?.includes(t.id)
        // );
        return {
          color: i == 0 ? "green" : dayjs().isAfter(end_date) ? "gray" : "blue",
          children: (
            <div className="mb-16">
              <div className="opacity-50">
                {dayjs(start_date).format("YYYY MMM")} -{" "}
                {end_date ? dayjs(end_date).format(conf.dateFormat) : "Current"}
              </div>
              <div>
                <h3 className="m-0 inline">{e.position}</h3>
                <span className="my-2 opacity-50"> at {organization}</span>
              </div>
              <MarkDownView text={e.description} />
              <div className="my-2 flex flex-wrap items-center gap-2">
                {/* <span className="opacity-50 text-sm">I use : </span> */}
                {techIds?.map((t) => (
                  <TechTag key={t} id={t} />
                ))}
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
              </div>
            </div>
          ),
        };
      })}
    />
  );
}

export default ExperienceTimeLine;
