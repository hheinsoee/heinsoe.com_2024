"use client";
import React from "react";
import { Table, Tag } from "antd";
import Cell, { TechTag } from "@components/Cell";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import { BsViewList } from "react-icons/bs";
import Link from "next/link";
import myLink from "@/link";
import { Note, Project, Tech } from "@interface";
import { JSONTree } from "react-json-tree";
import dayjs from "dayjs";
import { useWindowSize } from "@/hook/useWindowSize";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";

export default function ProjectTable({ data }: { data: Project[] }) {
  const { width } = useWindowSize();
  return (
    <div className="md:px-8 max-w-6xl mx-auto mt-8">
      {/* <JSONTree data={data} /> */}
      {/* {openId} */}
      <Table
        title={() => <h2>Projects</h2>}
        style={{ background: "transparent" }}
        size="small"
        pagination={false}
        columns={[
          {
            key: "year",
            dataIndex: "date",
            title: "Year",
            width: "80px",
            sorter: (a: any, b: any) => a.date - b.date,
            render: (_) => dayjs(_).format("YYYY"),
          },
          {
            key: "title",
            dataIndex: "title",
            title: "Title",
            width: "300px",
            // sorter: (a, b) => a.title - b.title,
          },
          ...(width > 600
            ? [
                {
                  key: "description",
                  dataIndex: "description",
                  title: "Description",
                  // ellipsis: true,
                  width: "500px",
                  render: (_: string) => <MarkDownView text={_} />,
                },
              ]
            : []),

          ...(width > 800
            ? [
                {
                  key: "techs",
                  dataIndex: "techs",
                  title: "Techs",
                  // ellipsis: true,
                  width: "500px",
                  render: (_: any) => (
                    <div className="flex flex-wrap items-center gap-2">
                      {_.map((t: any) => (
                        <TechTag
                          key={t.id}
                          id={t.TechId}
                          className="mr-2 my-1"
                        />
                      ))}
                    </div>
                  ),
                },
              ]
            : []),
          ...(width > 1000
            ? [
                {
                  key: "tags",
                  dataIndex: "tags",
                  title: "Tags",
                  // ellipsis: true,
                  width: "500px",
                  render: (_: any) =>
                    _.map((t: any) => t?.Tag?.name).join(", "),
                },
              ]
            : []),
          {
            key: "view",
            dataIndex: "view",
            title: "",
            width: "30px",
            render: (_, r) => (
              <Link href={myLink.project(r.id)} title={r.title}>
                <BsViewList />
              </Link>
            ),
          },
        ]}
        dataSource={data || []}
        rowKey={"id"}
        // expandedRowKeys={[`${openId}`]}
        // expandable={{
        //     expandedRowRender: (record) => <MarkDownView text={record.description} />,
        //     // rowExpandable: (record) => record.name !== 'Not Expandable',
        //     // expandIcon: () => <></>,
        //     onExpand: (expanded, record) => (console.log({ expanded, record }))
        // }}
      />
    </div>
  );
}
