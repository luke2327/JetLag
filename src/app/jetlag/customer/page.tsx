'use client';

import { Collapse, CollapseProps } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import customerInfos from '@/lib/customerInfos';

import EaseOut from '@/components/motion/EaseOut';
import TransparentLayer from '@/components/TransparentLayer';

const items: CollapseProps['items'] = customerInfos.map((x) => ({
  key: x.key,
  label: x.label,
  children: (
    <div className='pl-4 leading-7'>
      {x.content.map((x, idx) => (
        <p key={idx}>{x}</p>
      ))}
    </div>
  ),
}));

const { Title } = Typography;

export default function CustomerPage() {
  return (
    <main
      id='customer'
      className='layout relative flex w-full justify-center p-4'
    >
      <EaseOut className='flex w-full max-w-[1200px] flex-col justify-center'>
        <TransparentLayer>
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
      </EaseOut>
    </main>
  );
}
