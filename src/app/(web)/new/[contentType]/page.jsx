'use client'
import React, { useState } from 'react';
import { MdCatalog, MdEditor, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { Button, DatePicker, Drawer, Form, Input, Modal, Select, Space } from 'antd';
import { JSONTree } from 'react-json-tree';
import { FaEdit } from 'react-icons/fa';
import { technology } from '../../../../constant';


const MarkDownEditor = ({ onChange, value, onError }) => {
    const [open, setOpen] = useState(false);
    const [id] = useState('preview-only');

    return (
        <div>
            <div className={onError ? 'ring ring-red-500' : ""}>
                <Button type='text' icon={<FaEdit />} onClick={() => setOpen(true)}>Edit</Button>
                <MdPreview
                    language="en-US" editorId={id} modelValue={value} style={{ background: 'transparent' }} className='[&>*]:p-0' />
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} width={'100%'}>
                <MdEditor
                    language="en-US"
                    theme="dark"
                    modelValue={value || ''}
                    onChange={onChange} />
            </Drawer>
        </div>)
}
const SelectTechnology = (props) => <Select
    {...props}
    mode="multiple"
    allowClear
    style={{
        width: '100%',
    }}
    placeholder="Select technology"
    options={Object.entries(technology).map(([key, { label, Icon }]) => (
        {
            value: key,
            label: <div><Icon /> {label}</div>,
        }
    ))}
/>
export default function Page({ params }) {
    const { contentType } = params;
    const theContent = contentTypes?.[contentType] || null

    const [form] = Form.useForm();
    const handleSubmit = (value) => {
        Modal.success({
            title: "data",
            content: <JSONTree data={value} />
        })
    }
    return (
        <div className='p-8 bg-white/70 dark:bg-[#222222]/80 rounded-md max-w-4xl mx-auto'>
            {theContent.title}
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{}}
                // onValuesChange={}
                onFinish={handleSubmit}
            >
                {
                    theContent.fields.map((field) => (
                        <Form.Item {...field} />
                    ))
                }
                <Form.Item>
                    <Button htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>

        </div>
    )
};

const contentTypes = {
    project: {
        title: "Project",
        fields: [
            {
                name: 'title',
                label: 'Title',
                rules:
                    [
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ],
                children: <Input placeholder='Title' />
            }, {
                name: 'date',
                label: 'Date',
                rules:
                    [
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ],
                children: <DatePicker />
            }, {
                name: 'description',
                label: 'Description',
                rules:
                    [
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ],
                children: <Input.TextArea />
            },
            {
                name: 'body',
                label: 'Body',
                rules:
                    [
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ],
                children: <MarkDownEditor />
            },
            {
                name: 'image',
                label: 'Image',
                rules:
                    [

                    ],
                children: <Input placeholder='Image' />
            },
            {
                name: 'teach',
                label: 'Teachnology',
                rules:
                    [
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ],
                children: [<SelectTechnology />]
            }
        ]
    },
    blog: {
        label: "Blog"
    }
}


