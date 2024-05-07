'use client'
import React, { useEffect, useState } from 'react';
import { getTaxonomyTypes, deleteTaxonomyType } from '@adminService/t_taxonomy'
import { Button, Col, List, Popconfirm, Row, Space, message } from 'antd';
import { JSONTree } from 'react-json-tree';
import { Loading } from '@/components/loading';
import { makeFresh } from "@hheinsoee/utility";
import { FaEdit, FaTrash } from 'react-icons/fa';

function TaxonomyArchive({ selected, setSelected, freshData }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);


    const loadTaxonomyTypes = () => {
        setLoading(true);
        getTaxonomyTypes({ r_taxonomy: true })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                message.error(error?.message || "sth wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadTaxonomyTypes();
    }, []);
    useEffect(() => {
        if (freshData) {
            setData(makeFresh({ old: data, fresh: freshData }))
        }
    }, [freshData])
    const handleDelete = (id) => {
        setDeletingId(id);
        deleteTaxonomyType({
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
            // : <JSONTree data={data} />
            : <List>{data.map((tc) => (
                <List.Item key={tc.id} className='thumbnail'>
                    <p><b className='text-lg'>{tc.name}</b> <span className='opacity-50'>{tc.description}</span></p>
                    <Space.Compact className='action'>
                        <Button type='link' onClick={() => setSelected(tc)} icon={<FaEdit />} />
                        <Popconfirm
                            title={`Delete this ${tc.name}`}
                            description={`Are you sure to delete this ${tc.name}?`}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDelete(tc.id)}
                        >
                            <Button type='link' icon={<FaTrash />} danger loading={deletingId == tc.id} />
                        </Popconfirm>
                    </Space.Compact>
                </List.Item>
            ))}
            </List>

    );
}

export default TaxonomyArchive;