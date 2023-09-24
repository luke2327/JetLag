import * as React from 'react';

export default function Title({ title }: { title: string }) {
  return (
    <h1 className='roboto linear-ivory-text px-2 font-bold italic leading-tight'>
      {title}
    </h1>
  );
}
