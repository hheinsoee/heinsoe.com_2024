'use client'
import React, { useEffect, useState } from 'react';
import { JSONTree } from 'react-json-tree';

import { updateTaxonomy, createTaxonomy } from '@adminService/t_taxonomy';
import { Button, Col, Divider, Flex, Form, Input, Row, Select, Space, Tag, message } from 'antd';
import { useRepo } from '../../../_private/context/repo';

function TaxonomyForm({ selected, setSelected, setFreshData }) {
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState();
    const [form] = Form.useForm();


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
        const safeValue = {
            ...value,

        };
        setFormData(safeValue)
        // return;

        if (selected?.id) {
            setLoading(true)
            updateTaxonomy({
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
            createTaxonomy({
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

    return (
        <div>
            <div className='flex items-center gap-4'>
                <h2 className='flex-1'>{selected?.id ? "Update" : "Create"} Content Type</h2>
                <Button disabled={loading} onClick={handleClear}>Clear</Button>
                <Button disabled={loading} onClick={handleReset}>Reset</Button>
                <Button loading={loading} type='primary' onClick={form.submit}>{selected?.id ? "Update" : "Create"}</Button>
            </div>
            {/* <JSONTree data={{ selected, formData }} /> */}
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
                <Form.Item
                    name={'name'}
                    label={"Name"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input Name!',
                        },
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
                <Form.Item
                    label="Words"
                    name="r_taxonomy"
                    help="type word and press Enter"
                    rules={[
                        { required: true, message: 'Please input words and Enter' }
                    ]}
                >
                    <InputWords />
                </Form.Item>
            </Form>
        </div>
    );
}

export default TaxonomyForm;


const InputWords = ({ placeholder, onChange, value }) => {
    const [words, setWords] = useState(value);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEnterPress = () => {
        if (!words) {
            setWords([{ name: inputValue }])
        }
        else {
            const exists = words.some(word => word.name === inputValue.trim());
            if (!exists && inputValue.trim() !== '') {
                setWords(old => [...old, { name: inputValue.trim() }]);
            }
        }
        setInputValue('');
    };

    const removeByIndex = (index) => {
        setWords(old => old.filter((_, i) => i !== index));
    };
    useEffect(() => {
        if (words) {
            if (words.length > 0) {
                onChange(words)
            } else {
                onChange(undefined)
            }
        }
    }, [words])
    useEffect(() => {
        if (value) { setWords(value) }
    }, [value])
    return (
        <div>
            {words?.map((w, i) => (
                <Tag key={w.name} bordered={false} closable onClose={() => removeByIndex(i)}>
                    {w.name}
                </Tag>
            ))}
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleEnterPress}
                placeholder={placeholder || "Enter words"}
            />
        </div>
    )
}