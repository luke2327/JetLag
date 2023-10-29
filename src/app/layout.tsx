'use client';

import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';
import * as React from 'react';
import { Provider } from 'react-wrap-balancer';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/globals.css';

import BackgroundClock from '@/components/layout/BackgroundClock';
import Header from '@/components/layout/Header';
import EaseOut from '@/components/motion/EaseOut';

import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang='en'>
      <RecoilRoot>
        <body className={inter.className}>
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
                  <EaseOut>{children}</EaseOut>
                </Provider>
              </BackgroundClock>
            </StyledComponentsRegistry>
          </ConfigProvider>
        </body>
      </RecoilRoot>
    </html>
  );
};

export default RootLayout;
