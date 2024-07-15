"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Image, Input, message } from "antd";

import { BiLock, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { login } from "@/auth";
import conf from "../../../../app.config";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await login({ username, password })
      .then((data) => {
        setSuccess(true);
        // console.log("Signin Success");
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen signinPage dotBg">
      <div className="px-10 py-8 bg-white dark:bg-black/40 rounded-md ring-4 ring-white dark:ring-white/10 shadow-2xl">
        {success ? (
          "Sucess Sign In"
        ) : (
          <>
            <Image
              preview={false}
              src={conf.logo.main}
              style={{ height: 60 }}
              alt={conf.title}
              title={conf.title}
              className="mb-6"
            />
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
              autoCorrect="off"
              autoFocus
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input prefix={<BiUser />} placeholder="username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password prefix={<BiLock />} placeholder="password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="block ml-auto">
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
export default Page;
