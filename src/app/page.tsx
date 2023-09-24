'use client';

import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
import Title from '@/components/Title';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <>
      <section>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center text-center'>
          <Title title='Welcome to JetLag' />
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
              Theodorus Clarence
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </>
  );
}
