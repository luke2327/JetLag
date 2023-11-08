import Head from 'next/head';
import backgroundDark1 from 'public/images/dark-bg1.jpeg';
import * as React from 'react';

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className='bg-clock h-full min-h-screen w-full bg-cover bg-no-repeat'
      style={{ backgroundImage: `src(${backgroundDark1.src})` }}
    >
      <Head>
        <title>Jetlag</title>
      </Head>
      {children}
    </main>
  );
}
