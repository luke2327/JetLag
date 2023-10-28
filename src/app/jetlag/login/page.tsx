'use client';

import { Button, Form, Input, message, Typography } from 'antd';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { toDayJs } from '@/lib/helper';
import useAxios from '@/hooks/axios';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

import { authState } from '@/store/auth';

import { Credential } from '@/interface/auth';

const { Text, Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function LoginPage() {
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [blockingLoading, setBlockLoading] = useState(true);
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

    await POST<Credential>('/auth/login', values).then((res) => {
      if (res) {
        const dayJsInstance = toDayJs(res.user);

        console.log(dayJsInstance);

        setCookie('Authorization', res.authorization);
        setLoginLoading(false);
        setAuth({
          ...auth,
          user: { ...res.user, ...dayJsInstance },
          status: 'login',
        });
      }
    });

    messageApi.open({
      type: 'success',
      content: 'Login success',
    });

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));

    route.push('/jetlag');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className='layout relative flex w-full justify-center p-2 sm:p-0 sm:pt-4'>
      {contextHolder}
      {!blockingLoading && (
        <EaseOut className='flex w-full max-w-[600px] flex-col justify-center'>
          <TransparentLayer>
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
              className='!flex !w-full !flex-col rounded-md !pr-10 !pt-10'
            >
              <div>
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
              </div>

              <div className='flex items-center justify-end'>
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
              </div>
            </Form>
          </TransparentLayer>
        </EaseOut>
      )}
    </main>
  );
}
