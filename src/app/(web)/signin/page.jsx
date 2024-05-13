'use client'
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';

import { setting } from "@constant";
import { BiLock, BiUser } from 'react-icons/bi';
import { login } from '@/auth';

const Page = () => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const onFinish = async (values) => {
        await login(values)
            .then((data) => {
                setSuccess(true)
                console.log("Signin Success")
            })
            .catch((error) => {
                message.error(error.message)
            })
            .finally(() => {
                setLoading(false);
            });

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex justify-center items-center signinPage'>
            <div className='fixed bottom-16 right-16 text-[12vmin] text-[#012F6D] font-black max-w-4xl'>
                {setting.moto}
            </div>
            <div className='px-10 py-8 bg-gray-900/40 backdrop-blur-md rounded-lg '>
                {success ? "Sucess Sign In" : <><h2 className='text-2xl capitalize'>{setting.title} EDI Dashboard</h2>
                    <Form
                        // layout='vertical'\
                        name="basic"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<BiUser />} placeholder='username' />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<BiLock />} placeholder='password' />
                        </Form.Item>



                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Log In
                            </Button>
                        </Form.Item>
                    </Form></>}
            </div>
        </div >
    )
};
export default Page;