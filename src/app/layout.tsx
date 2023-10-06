import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/globals.css';

import BackgroundClock from '@/components/layout/BackgroundClock';
import Header from '@/components/layout/Header';
import EaseOut from '@/components/motion/EaseOut';

import { siteConfig } from '@/constant/config';

import StyledComponentsRegistry from '../lib/AntdRegistry';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang='en'>
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <BackgroundClock>
          <Header />
          <EaseOut>
            <section className='ivory'>{children}</section>
          </EaseOut>
        </BackgroundClock>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
