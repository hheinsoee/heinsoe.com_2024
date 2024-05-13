'use client'
import ContentMenus from "@/components/contentMenu";
import { Divider, Flex, Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { getContent } from "@adminService/r_content";
import { MarkDownView } from "@/app/(admin)/admin/_private/components/Inputs";
import ActionBar from "@/components/ActionBar";
import Cell from "@/components/Cell";
import { useRepo } from "@/app/(admin)/admin/_private/context/repo";
import { noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
export default function ProjectDetails({ data }) {

    const { ls_content_type, ls_taxonomy_type } = useRepo()
    const content_type = ls_content_type.find(t => t.name == 'project')
    return (
        <main>

            <ContentMenus>
                <div className="mx-4">
                    {<Image src={data?.img_url} />}
                    <Flex justify="space-between">
                        <strong className="text-lg">{data?.title}</strong> <ActionBar
                            title={data.title}
                            text={noMarkdown(data.description)}
                            url={myLink.blog(data.id)}
                        />
                    </Flex>
                    <MarkDownView text={data?.description} />
                    <Divider />
                    <section className="my-8">
                        <div className="opacity-60">Project Info</div>
                        <table>
                            <tbody>
                                {content_type?.t_field?.map((f) => (
                                    <tr key={f.name}>
                                        <td>{f.name}</td>
                                        <td><Cell type={f.data_type} value={data?.fields[f.name]} /></td>
                                    </tr>
                                ))}
                                {content_type?.t_taxonomy?.map((f) => (
                                    <tr key={f.name}>
                                        <td>{f.name}</td>
                                        <td>
                                            <div className="flex gap-2">{
                                                ls_taxonomy_type
                                                    .find((t_l) => t_l.name == f.name).r_taxonomy
                                                    .filter(taxo => data.t_taxonomy[f.name].includes(taxo.id))
                                                    ?.map(taxonomy => (
                                                        <Cell key={taxonomy.id} type={f.name} value={taxonomy.name} />
                                                    )
                                                    )}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <Divider />
                    {/* {[
                    ...,
                    ...content_type?.t_taxonomy?.map((t_t, i) => (
                        {
                            key: t_t.id,
                            dataIndex: t_t.name,
                            title: t_t.name,
                            render: (_, a) => <div className="flex gap-2">{ls_taxonomy_type.find((t_l) => t_l.name == t_t.name).r_taxonomy.filter(taxo => a.t_taxonomy[t_t.name].includes(taxo.id))?.map(taxonomy => (
                                <Cell type={t_t.name} value={taxonomy.name} />
                            ))}</div>
                        }
                    )),
                ]} */}
                    <MarkDownView text={data?.body} />

                    <div className="dotBg h-40" />
                </div>
            </ContentMenus>
        </main>
    );
}
