'use client';

// default page

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { toDayJs } from '@/lib/helper';
import useAxios, { NetworkError } from '@/hooks/axios';

import { authState } from '@/store/auth';

import { Credential } from '@/interface/auth';

export default function AppLayout({ children }: React.PropsWithChildren) {
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);

  const getUserInfo = async () => {
    const payload = [
      '/auth/userInfo',
      {},
      {
        headers: {
          Authorization: localStorage.getItem('jl'),
        },
        withCredentials: true,
      },
    ] as const;
    const res = await POST<Credential>(...payload);

    if (res.success) {
      const dayJsInstance = toDayJs((res as Credential).user);

      setAuth({
        ...auth,
        status: 'login',
        user: { ...(res as Credential).user, ...dayJsInstance },
      });
    } else {
      messageApi.open({
        type: 'error',
        content: (res as NetworkError).message || 'Login session was expired.',
      });

      route.push('/jetlag');
    }

    setLoading(false);
  };
  useEffect(() => {
    if (localStorage.getItem('jl')) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className='linear-ivory-text p-2'>Loading</div>
  ) : (
    <section className='ivory'>
      {contextHolder}
      {children}
    </section>
  );
}
