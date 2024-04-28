'use client'
import React, { useEffect, useState } from 'react';
import { JSONTree } from 'react-json-tree';
import { useRepo } from '../../_private/context/repo';
import { createContent, getTaxonomy, updateContent } from '../../_private/service/content';
import { Button, Col, Divider, Flex, Form, Input, Row, Select, message } from 'antd';

function ContentForm({ type, selected, setSelected, setFreshData }) {
    const [taxonomy, setTaxonomy] = useState();


    const [form] = Form.useForm();
    const loadTaconomy = async (type_id) => {
        try {
            setTaxonomy(await getTaxonomy({ type_id }));
        } catch (error) {
            message.error(error?.message || "sth wrong");
        }
    };

    useEffect(() => {
        loadTaconomy(type.id);
    }, [type]);
    useEffect(() => {
        form.setFieldsValue(selected)
    }, [selected])
    const handleClear = () => {
        form.resetFields()
        setSelected(null)
    }
    const handleReset = () => {
        form.setFieldsValue(selected)
    }
    const handleSubmit = async (value) => {
        console.log(value)
        return;
        try {
            if (selected?.id) {
                const result = await updateContent({
                    where: {
                        id: selected.id
                    },
                    data: {
                        ...value,
                        type_id: type.id
                    }
                });
                setFreshData(result)
            } else {

                const result = await createContent({
                    data: {
                        ...value,
                        type_id: type.id
                    }
                });
                setFreshData(result)
            }
            handleClear()
        } catch (error) {
            message.error(error?.message || "sth wrong");
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
            <JSONTree data={selected} />
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
                        {type?.ls_field?.length > 0 && (
                            <div>
                                <div className='opacity-50 text-sm'>fields</div>
                                <Form.List name={['fields']} label="Fields">
                                    {() => (
                                        <>
                                            {type.ls_field.map((f, i) => {
                                                return (
                                                    <React.Fragment key={f.id}>
                                                        <Form.Item hidden name={[[i], 'name']}>
                                                            <Input placeholder={'name'} />
                                                        </Form.Item>
                                                        <Form.Item name={[[i], 'value']} label={f.name}>
                                                            <Input placeholder={f.name} onChange={() => form.setFieldValue(['fields', i, 'name'], f.name)} />
                                                        </Form.Item>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </>
                                    )}
                                </Form.List>
                            </div>
                        )}
                        {taxonomy?.length > 0 && <><Divider />
                            <div className='opacity-50 text-sm'>taxonomy</div>
                            {taxonomy?.map(t => (
                                <Form.Item
                                    key={t.id}
                                    name={t.name}
                                    label={t.name}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        options={
                                            t.rec_taxonomy.map((taxo => ({ ...taxo, value: taxo.id, label: taxo.name })))
                                        }
                                        placeholder={t.name} />
                                </Form.Item>
                            ))}
                        </>
                        }
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