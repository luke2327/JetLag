'use client';

import { Card, Typography } from 'antd';
import React from 'react';

import EaseOut from '@/components/motion/EaseOut';
import ShoppingCard from '@/components/ShoppingCard';
import TransparentLayer from '@/components/TransparentLayer';

import shoppingItemInfos from '@/constant/shoppingItemInfos';

const { Title } = Typography;
const { Meta } = Card;

export default function ShoppingPage() {
  return (
    <main
      id='shopping'
      className='layout relative flex w-full justify-center p-2 sm:pt-4'
    >
      <EaseOut className='flex flex-col justify-center'>
        <TransparentLayer>
          <Title level={3} className='text-reverse-color !mb-0 text-center'>
            Shopping
          </Title>
          <div className='mt-6 flex max-h-[70vh] flex-wrap items-center justify-center gap-6 overflow-x-hidden overflow-y-scroll'>
            {shoppingItemInfos.map((x, idx) => (
              <ShoppingCard key={idx} {...x} />
            ))}
            {/*<ChevronRight*/}
            {/*  color='#d0c79b'*/}
            {/*  strokeWidth={siteConfig.lucideStrokeWidth}*/}
            {/*  className='cursor-pointer'*/}
            {/*/>*/}
          </div>
        </TransparentLayer>
      </EaseOut>
    </main>
  );
}
