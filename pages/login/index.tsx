import { Button, Form, Input } from "antd";
import { FieldNamesType } from "antd/es/cascader";
import { FormProps } from "antd/lib";
import Link from "next/link";
import { useState } from "react";

export default function Login() {

    const [loginType, setLoginType] = useState('signIn')

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-indigo-300">
            {loginType === 'signIn' ? <div className="w-[500px] h-[400px] bg-[#fff] border-solid border-indigo-200 border-2 rounded-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] drop-shadow-md flex flex-col items-center justify-between">
                <div className="text-3xl font-medium text-indigo-400 tracking-widest text-center mt-[20px]">登陆</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="flex flex-col items-center gap-[30px] w-100%"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item className="w-[50px]">
                        <a onClick={() => { setLoginType('signUp') }}>注册</a>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100px' }} >
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div> : <div className="w-[500px] h-[400px] bg-[#fff] border-solid border-indigo-200 border-2 rounded-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] drop-shadow-md flex flex-col items-center justify-between">
                <div className="text-3xl font-medium text-indigo-400 tracking-widest text-center mt-[20px]">注册</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="flex flex-col items-center gap-[30px] w-100%"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ width: '250px' }} />
                    </Form.Item>

                    <Form.Item className="w-[50px]">
                        <a onClick={() => { setLoginType('signIn') }}>登陆</a>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100px' }} >
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </div>
    )
}