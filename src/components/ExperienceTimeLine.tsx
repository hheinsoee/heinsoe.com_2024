"use client";
import { Button, Timeline } from "antd";
import React from "react";

import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import Cell from "@/components/Cell";
import dayjs from "dayjs";
import { setting } from "@constant";
import { Experience, Tech } from "@interface";
import { useRepo } from "@/context/repo";

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
        const techs: Tech[] = repo?.techs?.data.filter((t: any) =>
          techIds?.includes(t.id)
        );
        return {
          color: i == 0 ? "green" : dayjs().isAfter(end_date) ? "gray" : "blue",
          children: (
            <div className="mb-16">
              <div className="opacity-50">
                {dayjs(start_date).format("YYYY MMM")} -{" "}
                {end_date
                  ? dayjs(end_date).format(setting.dateFormat)
                  : "Current"}
              </div>
              <div>
                <h3 className="m-0 inline">{e.position}</h3>
                <span className="my-2 opacity-50"> at {organization}</span>
              </div>
              <MarkDownView text={e.description} />
              <div className="my-2">
                {/* <span className="opacity-50 text-sm">I use : </span> */}
                {techs?.map((t) => (
                  <Cell
                    key={t.id}
                    type="technology"
                    value={t.name}
                    className="mr-1 my-1 text-sm"
                  />
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
