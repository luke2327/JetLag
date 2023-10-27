'use client';

import { Button, DatePicker, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import TransparentLayer from '@/components/TransparentLayer';

import { Auth, authState, CompactAuth } from '@/store/auth';

const { Title } = Typography;

export default function MyPage() {
  const route = useRouter();
  const [blockingLoading, setBlockLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState) as [
    CompactAuth,
    SetterOrUpdater<Auth>
  ];

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    if ((auth.status as Auth['status']) === 'none') {
      route.push('/jetlag');
    } else {
      setBlockLoading(false);
    }
  }, []);

  const onFinishFailed = () => {};

  console.log(auth.user, auth);
  return (
    <main className='layout relative flex w-full justify-center sm:pt-4'>
      {!blockingLoading && (
        <TransparentLayer className='flex w-full max-w-[600px] flex-col justify-center'>
          <Title level={3} className='!mb-0 text-center !text-white'>
            My Page
          </Title>
          <Form
            name='myPage'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={auth.user}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            className='!flex !w-full !flex-col rounded-md !pr-10 !pt-10'
          >
            <div>
              <Form.Item<Auth['user']> label='Email' name='email'>
                <Input disabled={true} />
              </Form.Item>
              <Form.Item<Auth['user']> label='Age' name='age'>
                <Input />
              </Form.Item>
              <Form.Item<Auth['user']> label='Phone' name='phone'>
                <Input />
              </Form.Item>
              <Form.Item<Auth['user']> label='Birthday' name='birthday'>
                <DatePicker />
              </Form.Item>
              <Form.Item<Auth['user']> label='SleepTime' name='sleepTime'>
                <Input />
              </Form.Item>
              <Form.Item<Auth['user']> label='WakeupTime' name='wakeupTime'>
                <Input />
              </Form.Item>
            </div>
            <div className='flex justify-end'>
              <Button
                type='primary'
                htmlType='submit'
                style={{
                  color: 'var(--textbrown)',
                  backgroundColor: 'rgb(255, 253, 243)',
                }}
                className='max-w-[100px] whitespace-nowrap rounded-md'
              >
                Update
              </Button>
            </div>
          </Form>
        </TransparentLayer>
      )}
    </main>
  );
}
