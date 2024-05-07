'use client'
import React, { useEffect, useState } from 'react';
import { JSONTree } from 'react-json-tree';

import { createContentType, updateContentType } from '@adminService/t_content';
import { Button, Col, Divider, Flex, Form, Input, Row, Select, Space, message } from 'antd';
import { useRepo } from '../../../_private/context/repo';

function ContentTypeForm({ selected, setSelected, setFreshData }) {
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState();
    const [form] = Form.useForm();
    const [{ ls_taxonomy_type }] = useRepo();


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
    const current_t_field = Form.useWatch('t_field', form);
    const [current_t_field_length, set_current_t_field_length] = useState(1);
    useEffect(() => {
        set_current_t_field_length((current_t_field?.length || 0) + 1)
    }, [current_t_field])
    useEffect(() => {
        selected?.t_field && set_current_t_field_length((selected?.t_field.length || 0) + 1)
    }, [selected])
    const handleSubmit = (value) => {
        const safeValue = {
            ...value,
            t_field: value.t_field.filter(t => t.name)
        };
        setFormData(safeValue)
        // return;

        if (selected?.id) {
            setLoading(true)
            updateContentType({
                where: {
                    id: selected.id
                },
                data: {
                    ...safeValue,
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
            createContentType({
                data: {
                    ...safeValue,
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
    const validateSnakeCase = (_, value) => {
        if (!value || /^[a-z0-9_]+$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Please enter only snake_case'));
    };
    return (
        <div>
            <div className='flex items-center gap-4'>
                <h2 className='flex-1'>{selected?.id ? "Update" : "Create"} Content Type</h2>
                <Button disabled={loading} onClick={handleClear}>Clear</Button>
                <Button disabled={loading} onClick={handleReset}>Reset</Button>
                <Button loading={loading} type='primary' onClick={form.submit}>{selected?.id ? "Update" : "Create"}</Button>
            </div>
            {/* <JSONTree data={{ formData }} /> */}
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
                            name={'name'}
                            label={"Name"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Name!',
                                },
                                { validator: validateSnakeCase }
                            ]}
                        ><Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name={'description'}
                            label={"Description"}
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input Description!',
                                },
                            ]}
                        ><Input placeholder="Description" />
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        fields
                        <Form.List name={['t_field']}>
                            {() => (
                                new Array(current_t_field_length).fill('').map((f, i) => (
                                    <Space.Compact block>
                                        <Form.Item
                                            name={[i, 'name']}
                                            rules={[
                                                { validator: validateSnakeCase }
                                            ]}
                                        >
                                            <Input
                                                style={{ width: '100%' }}
                                                placeholder={'name'} />
                                        </Form.Item>
                                        <Form.Item
                                            name={[i, 'data_type']}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                options={[
                                                    { value: 'number' },
                                                    { value: 'text' },
                                                    { value: 'md' },
                                                    { value: 'date' },
                                                    { value: 'color' }
                                                ]}
                                                placeholder={'data type'} />
                                        </Form.Item>
                                    </Space.Compact >
                                )))
                            }
                        </Form.List>
                        <Form.Item
                            name={'t_taxonomy_ids'}
                            label={'taxonomy type'}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                options={ls_taxonomy_type.map((t) => ({
                                    label: t.name,
                                    value: t.id
                                }))}
                                placeholder={'taxonomy'} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ContentTypeForm;