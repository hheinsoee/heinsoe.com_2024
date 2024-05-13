"use client";
import React from "react";
import { useRepo } from "@/app/(admin)/admin/_private/context/repo";
import { Table, Tag } from "antd";
import Cell from '@components/Cell'
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import { BsViewList } from "react-icons/bs";
import Link from "next/link";
import myLink from "@/link";


export default function ProjectTable({ data }) {
    const { ls_content_type, ls_taxonomy_type } = useRepo()
    const content_type = ls_content_type.find(t => t.name == 'project')

    return <div className="px-8 max-w-6xl mx-auto" >
        {/* <JSONTree data={data} /> */}
        {/* {openId} */}
        <Table
            style={{ background: "transparent" }}
            size="small"
            pagination={false}
            columns={[
                {
                    key: "title",
                    dataIndex: "title",
                    title: "Title",
                    sorter: (a, b) => a.title - b.title,
                },
                {
                    key: "description",
                    dataIndex: "description",
                    title: "Description",
                    // ellipsis: true,
                    width:"500px",
                    render: (_) => <MarkDownView text={_} />
                },
                ...content_type?.t_field?.map((f) => (
                    {
                        key: f.id,
                        dataIndex: f.name,
                        title: f.name,
                        sorter: (a, b) => a.fields[f.name] - b.fields[f.name],
                        render: (_, a) => <Cell type={f.name} value={a.fields[f.name]} />
                    }
                )),
                ...content_type?.t_taxonomy?.map((t_t, i) => (
                    {
                        key: t_t.id,
                        dataIndex: t_t.name,
                        title: t_t.name,
                        render: (_, a) => <div className="flex gap-2">{ls_taxonomy_type.find((t_l) => t_l.name == t_t.name).r_taxonomy.filter(taxo => a.t_taxonomy[t_t.name].includes(taxo.id))?.map(taxonomy => (
                            <Cell key={a.id} type={t_t.name} value={taxonomy.name} />
                        ))}</div>
                    }
                )),
                {
                    key: "view",
                    dataIndex: "view",
                    title: "",
                    width:"30px",
                    render: (_, r) => <Link href={myLink.project(r.id)} title={r.title}><BsViewList /></Link>
                },
            ]}
            dataSource={data || []}
            rowKey={'id'}
        // expandedRowKeys={[`${openId}`]}
        // expandable={{
        //     expandedRowRender: (record) => <MarkDownView text={record.description} />,
        //     // rowExpandable: (record) => record.name !== 'Not Expandable',
        //     // expandIcon: () => <></>,
        //     onExpand: (expanded, record) => (console.log({ expanded, record }))
        // }}

        />

    </div>;
}
