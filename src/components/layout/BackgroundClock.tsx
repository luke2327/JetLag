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
      className='bg-clock h-full min-h-screen w-full bg-cover bg-no-repeat'
      style={{ backgroundImage: `src(${backgroundClock.src})` }}
    >
      <Head>
        <title>Jetlag</title>
      </Head>
      {children}
    </main>
  );
}
