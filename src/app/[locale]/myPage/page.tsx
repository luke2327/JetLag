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
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import '@/lib/firebase';

import { getToken } from '@/lib/firebase';
import useAxios from '@/hooks/axios';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

import { Auth, authState, CompactAuth } from '@/store/auth';

const { Title } = Typography;

export default function MyPage() {
  const t = useTranslations('myPage');
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [blockingLoading, setBlockLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState) as [
    CompactAuth,
    SetterOrUpdater<Auth>
  ];

  const onFinish = async (values: Partial<CompactAuth['user']>, noti = true) => {
    const params = { ...values };
    const authUpdateParams = { ...values } as CompactAuth['user'];

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

    if (params.messageToken) {
      params.messageToken = JSON.stringify(params.messageToken) as any;
    }

    await POST<{ success: boolean }>('/auth/updateUser', params, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('jl'),
      },
    });

    setAuth({ ...auth, user: authUpdateParams });

    if (noti) {
      messageApi.open({
        type: 'success',
        content: 'Update success',
      });
    }
  };

  useEffect(() => {
    if ((auth.status as Auth['status']) === 'none') {
      route.push('/login');
    } else {
      setBlockLoading(false);
    }

    Notification.requestPermission().then(async (permission) => {
      if (permission !== 'granted') {
        // 푸시 거부됐을 때 처리할 내용
        console.log('notification denied');
      } else {
        // 푸시 승인됐을 때 처리할 내용
        const token = await getToken() as string;

        setAuth({ ...auth, user: { ...auth.user, messageToken: [...auth.user.messageToken, token] }});

        await onFinish({ ...auth.user, messageToken: [...auth.user.messageToken, token] }, false);
      }
    });
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
            <Title level={3} className='text-reverse-color !mb-0 text-center'>
              {t('title')}
            </Title>
            <Form
              name='myPage'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              style={{ maxWidth: 600 }}
              initialValues={auth.user}
              onFinish={onFinish}
              autoComplete='off'
              className='!sm:pr-10 !flex !w-full !flex-col rounded-md !pt-10'
              colon={false}
            >
              <div>
                <Form.Item<Auth['user']> label={t('email')} name='email'>
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item<Auth['user']> label={t('age')} name='age'>
                  <InputNumber maxLength={3} />
                </Form.Item>
                <Form.Item<Auth['user']> label={t('phone')} name='phone'>
                  <Input maxLength={20} />
                </Form.Item>
                <Form.Item<Auth['user']> label={t('birthday')} name='birthday'>
                  <DatePicker placeholder='Birthday' format='YYYY-MM-DD' />
                </Form.Item>
                <Form.Item<Auth['user']>
                  label={t('sleepTime')}
                  name='sleepTime'
                >
                  <TimePicker
                    showNow={false}
                    minuteStep={30}
                    showSecond={false}
                    placeholder={t('sleepTime')}
                    format='HH:mm'
                  />
                </Form.Item>
                <Form.Item<Auth['user']>
                  label={t('wakeupTime')}
                  name='wakeupTime'
                >
                  <TimePicker
                    showNow={false}
                    minuteStep={30}
                    showSecond={false}
                    placeholder={t('wakeupTime')}
                    format='HH:mm'
                  />
                </Form.Item>
              </div>
              <div className='flex justify-end'>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{
                    color: 'var(--textPrimary)',
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
