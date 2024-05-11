'use client'
import { MarkDownView } from '@/app/(admin)/admin/_private/components/Inputs';
import { useRepo } from '@/app/(admin)/admin/_private/context/repo';
import Cell from '@/components/Cell';
import Image from 'next/image';
import React from 'react';

function ProjectThumbnail(props) {

    const { ls_content_type, ls_taxonomy_type } = useRepo()
    const content_type = ls_content_type.find(t => t.name == 'project')
    return (
        <div className='my-10 flex gap-4'>
            {props?.fields?.featured_image && <Image src={props?.fields?.featured_image} width={100} height={100} />}
            <div>
                <h3 className='m-0'>{props.title}</h3>

                <MarkDownView text={props.description} />
                <div className='my-2'>
                    {/* {content_type?.t_field?.map((f) => (
                        <div key={f.name}>
                            <Cell type={f.data_type} value={props?.fields[f.name]} />
                        </div>
                    ))} */}
                    {content_type?.t_taxonomy?.map((f) => (
                        <div className="flex gap-2" key={f.name}>{
                            ls_taxonomy_type
                                .find((t_l) => t_l.name == f.name).r_taxonomy
                                .filter(taxo => props.t_taxonomy[f.name].includes(taxo.id))
                                ?.map(taxonomy => (
                                    <Cell key={taxonomy.id} type={f.name} value={taxonomy.name} />
                                )
                                )}</div>
                    ))}
                </div>
                {/* <div className='flex gap-1 my-2'>
          {['js', 'node', 'reactjs'].map((l) => (<div key={l} className='flex items-center gap-2 px-2 rounded-md ' style={{ background: theme.token.colorPrimary_(80, 10) }}>
            {technology?.[l]?.Icon()} {l}
          </div>))}
        </div> */}
            </div>
        </div>
    );
}

export default ProjectThumbnail;