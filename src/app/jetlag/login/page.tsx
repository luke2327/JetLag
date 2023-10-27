'use client';

import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import TransparentLayer from '@/components/TransparentLayer';

import { Auth, authState } from '@/store/auth';

import { siteConfig } from '@/constant/config';

const { Text, Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

type Credential = {
  user: Auth['user'];
  authorization: string;
  success: boolean;
};

export default function LoginPage() {
  const route = useRouter();
  const [blockingLoading, setBlockLoading] = useState(true);
  const [isLoginDone, setIsLoginDone] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  // logged user blocking
  useEffect(() => {
    if (auth.status === 'login') {
      route.push('/jetlag');
    } else {
      setBlockLoading(false);
    }
  }, []);

  const onFinish = async (values: any) => {
    setLoginLoading(true);

    const result = await axios
      .post<Credential>(`${siteConfig.apiScheme}/auth/login`, values)
      .then((response) => response.data);

    setCookie('Authorization', result.authorization);
    setLoginLoading(false);
    setIsLoginDone(true);
    setAuth({ ...auth, user: result.user, status: 'login' });

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

    route.push('/jetlag');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className='layout relative flex w-full justify-center sm:pt-4'>
      {!blockingLoading && (
        <TransparentLayer className='flex w-full max-w-[600px] flex-col justify-center'>
          <Title level={3} className='!mb-0 text-center !text-white'>
            Login Jetlag
          </Title>
          <Form
            name='authenticate'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='!w-full rounded-md !pr-10 !pt-10'
          >
            <Form.Item<FieldType>
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              className='text-white'
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <div className='flex items-center'>
                <Button
                  loading={loginLoading}
                  type='primary'
                  htmlType='submit'
                  style={{
                    color: 'var(--textbrown)',
                    backgroundColor: 'rgb(255, 253, 243)',
                  }}
                  className='whitespace-nowrap rounded-md'
                >
                  Login
                </Button>
                {isLoginDone && (
                  <Text className='pl-2 !text-white'>Login was successful</Text>
                )}
              </div>
            </Form.Item>
          </Form>
        </TransparentLayer>
      )}
    </main>
  );
}
