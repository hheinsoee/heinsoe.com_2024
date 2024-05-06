'use client'
import React, { useEffect, useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { createContent, getTaxonomy, updateContent } from '../../../_private/service/content';
import { Button, Col, Divider, Flex, Form, Input, Row, Select, message } from 'antd';

function ContentForm({ type, selected, setSelected, setFreshData }) {
    const [taxonomy, setTaxonomy] = useState();
    const [loading, setLoading] = useState();


    const [form] = Form.useForm();
    const loadTaxonomy = async (type_id) => {
        try {
            setTaxonomy(await getTaxonomy({ type_id }));
        } catch (error) {
            message.error(error?.message || "sth wrong");
        }
    };

    useEffect(() => {
        loadTaxonomy(type.id);
    }, [type]);
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(selected)
    }, [selected])
    const handleClear = () => {
        form.resetFields()
        setSelected(null)
    }
    const handleReset = () => {
        form.setFieldsValue(selected)
    }
    const handleSubmit = (value) => {
        // return;

        if (selected?.id) {
            setLoading(true)
            updateContent({
                where: {
                    id: selected.id
                },
                data: {
                    ...value,
                }
            }).then((result) => {
                message.success('updated');
                setFreshData(result)
            }).catch((error) => {
                message.error(error?.message || "sth wrong");
            }).finally(() => {
                setLoading(false)
            });
        } else {
            setLoading(true)
            createContent({
                data: {
                    ...value,
                    t_content_id: type.id
                }
            }).then((result) => {
                message.success('created');
                setFreshData(result)
            }).catch((error) => {
                message.error(error?.message || "sth wrong");
            }).finally(() => {
                setLoading(false)
            });
        }

    }

    return (
        <div>
            <div className='flex items-center gap-4'>
                <h2 className='flex-1'>{selected?.id ? "Update" : "Create"} {type.name}</h2>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button type='primary' onClick={form.submit}>{selected?.id ? "Update" : "Create"}</Button>
            </div>
            <JSONTree data={{ selected, type }} />
            <Form
                onFinish={handleSubmit}
                form={form}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                className='max-w-5xl mx-auto'
                initialValues={{
                    remember: true,
                }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Row gutter={[16]}>
                    <Col span={16}>
                        <Form.Item
                            name={'title'}
                            label={"Title"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Title!',
                                },
                            ]}
                        ><Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                            name={'description'}
                            label={"Description"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Description!',
                                },
                            ]}
                        ><Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name={'body'}
                            label={"body"}
                        ><Input placeholder="body" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>

                        {taxonomy?.length > 0 && <>
                            <div className='opacity-50 text-sm'>taxonomy</div>
                            {taxonomy?.map(t => (
                                <Form.Item
                                    key={t.id}
                                    name={['taxonomy']}
                                    label={t.name}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        options={
                                            t.r_taxonomy.map((taxo => ({ ...taxo, value: taxo.id, label: taxo.name })))
                                        }
                                        placeholder={t.name} />
                                </Form.Item>
                            ))}
                        </>
                        }
                        {type?.t_field?.length > 0 && (
                            <><Divider />
                                <div className='opacity-50 text-sm'>Fields</div>
                                <Form.List name={['fields']}>
                                    {() => (
                                        <>
                                            {type.t_field.map(f => (
                                                <Form.Item key={f.id} name={[f.name]} label={f.name}>
                                                    <Input placeholder={f.name} />
                                                    {/* <Fields ls_field={type?.ls_field} /> */}
                                                </Form.Item>
                                            ))}
                                        </>
                                    )}
                                </Form.List>
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ContentForm;


// function Fields({ ls_field, onChange, value }) {

//     const [form] = Form.useForm();

//     const handleChange = () => {
//         onChange(Object.entries(form.getFieldsValue()).map(([key, val]) => ({ name: key, value: val })))
//     }
//     return <Form form={form} onChange={handleChange}>
//         {ls_field?.map(f => (
//             <Form.Item
//                 key={f.id}
//                 name={f.name}
//                 label={f.name}
//             >
//                 <Input placeholder={f.name} />
//             </Form.Item>
//         ))}
//     </Form>
// }

// function Fields({ ls_field, onChange, value }) {
//     const [data, setData] = useState({})
//     useEffect(() => {
//         onChange(Object.entries(data).map(([key, val]) => ({ name: key, value: val })))
//     }, [data])
//     const handleChange = (key, val) => {
//         setData(old => ({
//             ...old,
//             [key]: val
//         }))
//     }
//     return <>{ls_field?.map(f => (
//         <Input key={f.id} placeholder={f.name} onChange={(e) => handleChange(f.name, e.target.value)} />
//     ))}
//     </>
// }