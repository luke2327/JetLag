'use client';

import { Button, Form, Input, message, Typography } from 'antd';
import { setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import IntlLink from 'next-intl/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { toDayJs } from '@/lib/helper';
import logger from '@/lib/logger';
import useAxios, { NetworkError } from '@/hooks/axios';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

import { authState } from '@/store/auth';

import { Credential, LoginParams } from '@/interface/auth';

const { Text, Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function LoginPage() {
  const t = useTranslations('login');
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [blockingLoading, setBlockLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  // logged user blocking
  useEffect(() => {
    if (auth.status === 'login') {
      route.push('/');
    } else {
      setBlockLoading(false);
    }
  }, []);

  const onFinish = async (values: LoginParams) => {
    setLoginLoading(true);

    const res = await POST<Credential>('/auth/login', values);

    if (res.success) {
      const dayJsInstance = toDayJs((res as Credential).user);

      localStorage.setItem('jl', (res as Credential).authorization);

      setCookie('Authorization', (res as Credential).authorization);
      setLoginLoading(false);
      setAuth({
        ...auth,
        user: { ...(res as Credential).user, ...dayJsInstance },
        status: 'login',
      });

      messageApi.open({
        type: 'success',
        content: 'Welcome to Jetlag',
      });

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 800));

      route.push('/');
    } else {
      setLoginLoading(false);

      messageApi.open({
        type: 'error',
        content: (res as NetworkError).message || 'Login error',
      });
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    logger('Failed:', errorInfo);
  };

  return (
    <main className='layout relative flex w-full justify-center p-2 sm:p-0 sm:pt-4'>
      {contextHolder}
      {!blockingLoading && (
        <EaseOut className='flex w-full max-w-[400px] flex-col justify-center'>
          <TransparentLayer>
            <Title
              level={3}
              className='auth-title text-reverse-color !mb-10 text-center'
            >
              {t('login')}
            </Title>
            <Form
              name='authenticate'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              className='!flex !w-full !flex-col rounded-md'
            >
              <div>
                <Form.Item<FieldType>
                  label={t('email')}
                  name='email'
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  className='text-white'
                  label={t('password')}
                  name='password'
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>

              <div className='flex items-center justify-center'>
                <Button
                  loading={loginLoading}
                  type='primary'
                  htmlType='submit'
                  style={{
                    color: 'var(--textPrimary)',
                    backgroundColor: 'rgb(255, 253, 243)',
                    border: '1px solid #c0c0c0',
                  }}
                  className='w-full whitespace-nowrap rounded-md'
                >
                  {t('login')}
                </Button>
              </div>
              <div className='mt-4 flex items-center justify-center'>
                <Text className='text-reverse-color'>
                  {t('notAMember')}{' '}
                  <IntlLink href='/signup'>
                    {t('signupNow')}
                  </IntlLink>
                </Text>
              </div>
            </Form>
          </TransparentLayer>
        </EaseOut>
      )}
    </main>
  );
}
