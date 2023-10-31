'use client';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  TimePicker,
  Typography,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import useAxios from '@/hooks/axios';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

import { Auth, authState, CompactAuth } from '@/store/auth';

const { Title } = Typography;

export default function MyPage() {
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [blockingLoading, setBlockLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState) as [
    CompactAuth,
    SetterOrUpdater<Auth>
  ];

  const onFinish = async (values: Partial<CompactAuth['user']>) => {
    const params = { ...values };

    if (values.birthday) {
      const birthday = values.birthday as any;
      const day = birthday.$D;
      const month = birthday.$M + 1;
      const year = birthday.$y;

      params.birthday = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day}`;
    }
    if (values.sleepTime) {
      const sleepTime = values.sleepTime as any;
      const hour = sleepTime.$H;
      const minute = sleepTime.$m;

      params.sleepTime = `${hour < 10 ? '0' : ''}${hour}:${
        minute < 10 ? '0' : ''
      }${minute}`;
    }
    if (values.wakeupTime) {
      const wakeupTime = values.wakeupTime as any;
      const hour = wakeupTime.$H;
      const minute = wakeupTime.$m;

      params.wakeupTime = `${hour < 10 ? '0' : ''}${hour}:${
        minute < 10 ? '0' : ''
      }${minute}`;
    }

    await POST<{ success: boolean }>('/auth/updateUser', params, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('jl'),
      },
    });

    setAuth({ ...auth });

    messageApi.open({
      type: 'success',
      content: 'Update success',
    });
  };

  const onFinishFailed = () => {
    console.log('this works!');
  };

  useEffect(() => {
    if ((auth.status as Auth['status']) === 'none') {
      route.push('/jetlag/login');
    } else {
      setBlockLoading(false);
    }
  }, []);

  return (
    <main
      id='myPage'
      className='layout relative flex w-full justify-center p-2 sm:p-0 sm:pt-4'
    >
      {contextHolder}
      {!blockingLoading && (
        <EaseOut className='flex w-full max-w-[600px] flex-col justify-center'>
          <TransparentLayer>
            <Title level={3} className='!mb-0 text-center !text-white'>
              My Page
            </Title>
            <Form
              name='myPage'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              initialValues={auth.user}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              className='!sm:pr-10 !flex !w-full !flex-col rounded-md !pt-10'
              colon={false}
            >
              <div>
                <Form.Item<Auth['user']> label='Email' name='email'>
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item<Auth['user']> label='Age' name='age'>
                  <InputNumber maxLength={3} />
                </Form.Item>
                <Form.Item<Auth['user']> label='Phone' name='phone'>
                  <Input maxLength={20} />
                </Form.Item>
                <Form.Item<Auth['user']> label='Birthday' name='birthday'>
                  <DatePicker placeholder='Birthday' format='YYYY-MM-DD' />
                </Form.Item>
                <Form.Item<Auth['user']> label='SleepTime' name='sleepTime'>
                  <TimePicker
                    showNow={false}
                    minuteStep={30}
                    showSecond={false}
                    placeholder='Sleep time'
                    format='HH:mm'
                  />
                </Form.Item>
                <Form.Item<Auth['user']> label='WakeupTime' name='wakeupTime'>
                  <TimePicker
                    showNow={false}
                    minuteStep={30}
                    showSecond={false}
                    placeholder='Wakeup time'
                    format='HH:mm'
                  />
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
        </EaseOut>
      )}
    </main>
  );
}
