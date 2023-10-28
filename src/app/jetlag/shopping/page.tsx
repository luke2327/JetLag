'use client';

import { Card, Typography } from 'antd';
import { ChevronRight } from 'lucide-react';
import React from 'react';

import shoppingItemInfos from '@/lib/shoppingItemInfos';

import EaseOut from '@/components/motion/EaseOut';
import ShoppingCard from '@/components/ShoppingCard';
import TransparentLayer from '@/components/TransparentLayer';

import { siteConfig } from '@/constant/config';

const { Title } = Typography;
const { Meta } = Card;

export default function ShoppingPage() {
  return (
    <main
      id='shopping'
      className='layout relative flex w-full justify-center p-2 sm:p-0 sm:pt-4'
    >
      <EaseOut className='flex flex-col justify-center'>
        <TransparentLayer>
          <Title level={3} className='!mb-0 text-center !text-white'>
            Shopping
          </Title>
          <div className='mt-6 flex flex-wrap items-center gap-6'>
            {shoppingItemInfos.map((x, idx) => (
              <ShoppingCard key={idx} {...x} />
            ))}
            <ChevronRight
              color='#d0c79b'
              strokeWidth={siteConfig.lucideStrokeWidth}
              className='cursor-pointer'
            />
          </div>
        </TransparentLayer>
      </EaseOut>
    </main>
  );
}
