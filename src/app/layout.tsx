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
    images: ['/icon-512x512.png'],
  },
  icons: {
    icon: '/icon-192x192.png',
    shortcut: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  themeColor: '#494336',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  colorScheme: 'dark',
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
