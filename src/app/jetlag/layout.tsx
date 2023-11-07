'use client';

// default page

import { ConfigProvider, message } from 'antd';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import * as React from 'react';
import { Provider } from 'react-wrap-balancer';
import { RecoilRoot, useRecoilState } from 'recoil';

import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { toDayJs } from '@/lib/helper';
import useAxios, { NetworkError } from '@/hooks/axios';

import BackgroundClock from '@/components/layout/BackgroundClock';
import Header from '@/components/layout/Header';
import EaseOut from '@/components/motion/EaseOut';

import { authState } from '@/store/auth';

import { Credential } from '@/interface/auth';

export default function AppLayout({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);

  return (
    <RecoilRoot>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#d0c79b',
          },
          components: {
            Form: {
              labelColor: 'rgba(255,255,255,1)',
            },
            Collapse: {
              contentPadding: '4px !important',
              headerPadding: '4px',
            },
          },
        }}
      >
        <StyledComponentsRegistry>
          <BackgroundClock>
            <Header />
            <Provider>
              <AuthProvider setLoading={setLoading}>
                <EaseOut>
                  {loading ? (
                    <div className='linear-ivory-text p-2'>Loading</div>
                  ) : (
                    <section className='ivory'>{children}</section>
                  )}
                </EaseOut>
              </AuthProvider>
            </Provider>
          </BackgroundClock>
        </StyledComponentsRegistry>
      </ConfigProvider>
    </RecoilRoot>
  );
}

function AuthProvider({
  children,
  setLoading,
}: {
  children: ReactNode;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const route = useRouter();
  const { POST } = useAxios();
  const [messageApi, contextHolder] = message.useMessage();
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

      route.push('/');
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

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
}
