'use client';

import { Collapse, CollapseProps } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import customerInfos from '@/lib/customerInfos';

import TransparentLayer from '@/components/TransparentLayer';

const items: CollapseProps['items'] = customerInfos.map((x) => ({
  key: x.key,
  label: x.label,
  children: (
    <p className='pl-4 leading-7'>
      {x.content.map((x, idx) => (
        <p key={idx}>{x}</p>
      ))}
    </p>
  ),
}));

const { Title } = Typography;

export default function CustomerPage() {
  return (
    <main
      id='customer'
      className='layout relative flex w-full justify-center p-2 sm:p-0 sm:pt-4'
    >
      <TransparentLayer className='flex w-full max-w-[1200px] flex-col justify-center'>
        <Title level={3} className='!mb-0 text-center !text-white'>
          Customer Center
        </Title>
        <Collapse
          rootClassName='p-2'
          accordion={true}
          defaultActiveKey={['1']}
          ghost
          items={items}
          style={{ color: 'var(--ivory)' }}
        />
      </TransparentLayer>
    </main>
  );
}
