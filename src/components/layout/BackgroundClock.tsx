import Head from 'next/head';
import backgroundClock from 'public/images/clock.png';
import * as React from 'react';

export default function BackgroundClock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className='bg-clock min-h-screen'
      style={{
        backgroundImage: `src(${backgroundClock.src})`,
        width: '100%',
        height: '100%',
      }}
    >
      <Head>
        <title>Hi</title>
      </Head>
      {children}
    </main>
  );
}
