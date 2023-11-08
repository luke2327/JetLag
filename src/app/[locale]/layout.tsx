'use client';

import { ConfigProvider, message } from 'antd';
import { Locale } from 'antd/es/locale';
import en from 'antd/lib/locale/en_US';
import ja from 'antd/lib/locale/ja_JP';
import ko from 'antd/lib/locale/ko_KR';
import { notFound } from 'next/navigation';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { ReactNode, useEffect, useState } from 'react';
import * as React from 'react';
import { Provider } from 'react-wrap-balancer';
import { RecoilRoot, useRecoilState } from 'recoil';

import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { toDayJs } from '@/lib/helper';
import useAxios, { NetworkError } from '@/hooks/axios';

import Background from '@/components/layout/Background';
import Header from '@/components/layout/Header';
import EaseOut from '@/components/motion/EaseOut';

import { authState } from '@/store/auth';

import { Credential } from '@/interface/auth';

const locales = { en, ko, ja };

// default page

// eslint-disable-next-line @next/next/no-async-client-component
export default function AppLayout({
  children,
  params: { locale },
}: React.PropsWithChildren & { params: any }) {
  const [messages, setMessages] = useState<AbstractIntlMessages>();
  const [antdLocale, setAntdLocale] = useState<Locale>();

  useEffect(() => {
    try {
      import(`../../messages/${locale}.json`).then((e: AbstractIntlMessages) =>
        setMessages(e)
      );
    } catch (error) {
      notFound();
    }

    setAntdLocale(locales[locale as keyof typeof locales]);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  return (
    <RecoilRoot>
      {messages ? (
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConfigProvider
            locale={antdLocale}
            theme={{
              token: {
                // colorPrimary: '#d0c79b',
                colorPrimary: '#a09d9d',
                borderRadius: 4,

                // Alias Token
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
              <Background>
                <Header />
                <Provider>
                  <AuthProvider setLoading={setLoading}>
                    <EaseOut>
                      {loading ? (
                        <div className='linear-text p-2'>Loading</div>
                      ) : (
                        <section className='ivory'>{children}</section>
                      )}
                    </EaseOut>
                  </AuthProvider>
                </Provider>
              </Background>
            </StyledComponentsRegistry>
          </ConfigProvider>
        </NextIntlClientProvider>
      ) : null}
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
