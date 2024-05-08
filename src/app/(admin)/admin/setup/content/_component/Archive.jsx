'use client'
import React, { useEffect, useState } from 'react';
import { deleteContentType, getContentStructure } from '@adminService/t_content'
import { Button, Col, Flex, List, Popconfirm, Row, Space, Tag, message } from 'antd';
import { JSONTree } from 'react-json-tree';
import { Loading } from '@/components/loading';
import { makeFresh } from "@hheinsoee/utility";
import { FaEdit, FaTrash } from 'react-icons/fa';

function ContentTypeArchive({ selected, setSelected, freshData }) {
    const [t_content, setT_content] = useState([])
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);


    const loadContentTypeList = () => {
        setLoading(true);
        getContentStructure()
            .then((data) => {
                setT_content(data);
            })
            .catch((error) => {
                message.error(error?.message || "sth wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadContentTypeList();
    }, []);
    useEffect(() => {
        if (freshData) {
            setT_content(makeFresh({ old: t_content, fresh: freshData }))
        }
    }, [freshData])
    const handleDelete = (id) => {
        setDeletingId(id);
        deleteContentType({
            where: {
                id
            }
        })
            .then((data) => {
                message.success("Deleted")
                setT_content(data => data.filter((c => c.id !== id)));
            })
            .catch((error) => {
                message.error(error?.message || "sth wrong");
            })
            .finally(() => {
                setDeletingId(null);
            });
    }
    return (
        loading ? <Loading />
            : <List>{t_content.map((tc) => (
                <List.Item key={tc.id} >
                    <div className='flex-1 thumbnail'>
                        {/* <JSONTree data={tc} /> */}
                        <Flex justify='space-between'>
                            <b className='text-lg'>{tc.name}</b>
                            <Space.Compact className='action'>
                                <Button type='link' onClick={() => setSelected(tc)} icon={<FaEdit />} />
                                <Popconfirm
                                    title={`Delete this ${tc.name}`}
                                    description={`Are you sure to delete this ${tc.name}?`}
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleDelete(tc.id)}
                                >
                                    <Button loading={deletingId == tc.id} type='link' icon={<FaTrash />} danger />
                                </Popconfirm>
                            </Space.Compact>
                        </Flex>
                        <p className='opacity-60'>{tc.description}</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>taxonomy</td>
                                    <td>
                                        {
                                            tc.t_taxonomy.map((t) => (
                                                <Tag key={t.id} color="cyan" bordered={false}>{t.name}</Tag>
                                            ))
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>fields</td>
                                    <td>
                                        {
                                            tc.t_field.map((field) => (
                                                <Tag key={field.id}>
                                                    {field.name} [{field.data_type}]
                                                </Tag>
                                            ))
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </List.Item>
            ))}
            </List>

    );
}

export default ContentTypeArchive;