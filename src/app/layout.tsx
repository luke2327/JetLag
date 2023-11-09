import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Jetlag',
  description: 'Jetlag',
  openGraph: {
    images: ['/jetlag.png'],
  },
  icons: {
    icon: '/jetlag.png',
    shortcut: '/jetlag.png',
    apple: '/jetlag.png',
  },
  themeColor: '#F8F5E3',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  colorScheme: 'light',
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html className='light bg-clock h-full min-h-screen w-full bg-cover bg-no-repeat'>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
