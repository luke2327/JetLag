import * as React from 'react';

export default function Title({ title }: { title: string }) {
  return (
    <p className='roboto linear-text px-2 text-6xl font-bold italic leading-tight'>
      {title}
    </p>
  );
}
