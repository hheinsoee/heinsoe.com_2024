'use client'
import { Button, Timeline } from 'antd';
import React from 'react';

import { useRepo } from "@/app/(admin)/admin/_private/context/repo";
import { MarkDownView } from '@/app/(admin)/admin/_private/components/Inputs';
import Cell from "@/components/Cell";
import dayjs from 'dayjs';
import { setting } from '../constant';

function ExperienceTimeLine({ experience }) {
  const orderedExperience = experience;

  const { ls_content_type, ls_taxonomy_type } = useRepo()
  const content_type = ls_content_type.find(t => t.name == 'project')
  return (
    <Timeline
      items={
        orderedExperience.map((e, i) => (
          {
            color: i == 0 ? 'green' : dayjs().isAfter(dayjs(e?.fields?.end_date)) ? 'gray' : 'blue',
            children: <div>
              <div className='opacity-50'>{dayjs(e?.fields?.start_date).format("YYYY MMM")}  - {e?.fields?.end_date ? dayjs(e?.fields?.end_date).format(setting.dateFormat) : 'Current'}</div>
              <div>
                <h3 className='m-0 inline'>{e.title}</h3>
                <span className='my-2 opacity-50'> at {e.fields?.organization}</span>
              </div>
              <MarkDownView text={e.description} />
              {/* <div className='flex gap-1 my-2'>
                {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
                  {technology?.[l]?.Icon()} {l}
                </div>))}
              </div> */}
              <div className='my-2'>
                <span className='opacity-50 text-xs'>I use</span>
                {content_type?.t_taxonomy?.map((f) => (
                  <div className="flex flex-wrap gap-2" key={f.name}>{
                    ls_taxonomy_type
                      .find((t_l) => t_l.name == f.name).r_taxonomy
                      .filter(taxo => e.t_taxonomy[f.name].includes(taxo.id))
                      ?.map(taxonomy => (
                        <Cell className="text-xs" type={f.name} value={taxonomy.name} />
                      )
                      )}</div>
                ))}
              </div>
            </div>
          }
        ))
      }
    />
  );
}

export default ExperienceTimeLine;