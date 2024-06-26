'use client';

import { Button, Form, Input, message, Result, Typography } from 'antd';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import IntlLink from 'next-intl/link';
import { useState } from 'react';

import logger from '@/lib/logger';
import useAxios, { NetworkError } from '@/hooks/axios';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

import { siteConfig } from '@/constant/config';
import { Credential, LoginParams } from '@/interface/auth';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

export default function SignupPage() {
  const t = useTranslations('login');
  const route = useRouter();
  const { POST } = useAxios();
  const [level, setLevel] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [signupLoading, setSignupLoading] = useState(false);
  const onFinish = async (values: LoginParams) => {
    setSignupLoading(true);

    const res = await POST<Credential>('/auth/signup', values);

    if (res.success) {
      setLevel(2);
    } else {
      setSignupLoading(false);

      messageApi.open({
        type: 'error',
        content: (res as NetworkError).message || 'Signup error',
      });
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    logger('Failed:', errorInfo);
  };

  return (
    <main className='layout relative flex w-full justify-center p-2 sm:pt-4'>
      {contextHolder}
      <EaseOut className='flex w-full max-w-[400px] flex-col justify-center'>
        <TransparentLayer>
          {level === 1 && (
            <Title level={3} className='auth-title text-reverse-color text-center !mb-10'>
              {t('signup')}
            </Title>
          )}
          {level === 1 && (
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
                  loading={signupLoading}
                  type='primary'
                  htmlType='submit'
                  style={{
                    color: 'var(--textPrimary)',
                    backgroundColor: 'rgb(255, 253, 243)',
                  }}
                  className='w-full whitespace-nowrap rounded-md'
                >
                  {t('signup')}
                </Button>
              </div>
              <div className='mt-4 flex items-center justify-center'>
                <Text className='text-reverse-color'>
                  {t('alreadyMember')}{' '}
                  <IntlLink
                    href='/login'
                  >
                    {t('loginNow')}
                  </IntlLink>
                </Text>
              </div>
            </Form>
          )}
          {level === 2 && (
            <Result
              status='success'
              title='successfully signed up.'
              icon={
                <Check
                  strokeWidth={siteConfig.lucideStrokeWidth}
                  color='var(--primary)'
                  size={72}
                />
              }
              extra={[
                <Button
                  type='primary'
                  key='console'
                  style={{
                    color: 'var(--textPrimary)',
                    backgroundColor: 'rgb(255, 253, 243)',
                    border: '1px solid #c0c0c0',
                  }}
                  className='w-full whitespace-nowrap rounded-md'
                  onClick={() => {
                    setLevel(1);
                    route.push('/login');
                  }}
                >
                  {t('goLogin')}
                </Button>,
              ]}
            />
          )}
        </TransparentLayer>
      </EaseOut>
    </main>
  );
}
