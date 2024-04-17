'use client'
import { APP } from "@/constant";
import { Input, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff, LuLock, LuUser } from "react-icons/lu";
import Cookies from 'js-cookie';
import axios from "axios";


export default function SignIn() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("admin@gmail.com")
    const [password, setPassword] = useState("admin12345")
    const nav = useRouter()

    const handleSignIn = async () => {
        setLoading(true)
        axios({
            method: "post",
            url: APP.API.Login,
            data: {
                email,
                password
            },
        })
            .then(function (data) {
                const { token } = data
                console.log(token)
                Cookies.set('auth', token);
                nav.push('/admin')
            })
            .catch(function (error) {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: error.response?.data?.message || error.message,
                });
            })
            .finally(function () {
                setLoading(false)
            });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-orange-300">
            {contextHolder}
            <div>
                <h1 className="my-4 text-2xl text-white font-bold">Sign In</h1>
                <section className="max-w-xs shadow-lg border rounded-md p-8 [&>*]:my-2 bg-slate-50/80">
                    <Input
                        placeholder="username"
                        prefix={<LuUser />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete={false}
                    />
                    <Input.Password
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        prefix={<LuLock />}
                        iconRender={(visible) => (visible ? <LuEye /> : <LuEyeOff />)}
                    />
                    <Button className="bg-white" loading={loading} onClick={handleSignIn}>Sign In</Button>
                </section>
            </div>
        </div>
    );
}
