'use client';

import { Modal } from 'antd';
import { motion } from 'framer-motion';

import Button from '@/components/buttons/Button';
import EaseOut from '@/components/motion/EaseOut';
import Title from '@/components/Title';
import TransparentLayer from '@/components/TransparentLayer';

const sleepCalculate = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
  });
};

export default function HomePage() {
  return (
    <div className='layout relative text-center sm:pt-4'>
      <EaseOut>
        <Title title='Jet Lag Service' />
      </EaseOut>
      <TransparentLayer className='flex justify-center gap-2'>
        <AccentButton delay={1} title='수면시간 추천' />
        <AccentButton delay={1.3} title='수면시간 계산기' />
        <AccentButton delay={1.6} title='JetLag' />
        {/*<Button2 onClick={sleepCalculate}>sss</Button2>*/}
      </TransparentLayer>
    </div>
  );
}

function IvoryButton(params: { title: string; onClick?: any }) {
  return (
    <Button
      variant='primary'
      style={{ color: 'var(--textbrown)' }}
      className='rounded-xl'
    >
      {params.title}
    </Button>
  );
}

function AccentButton({
  delay,
  title,
  btnLink,
  btnDisabled,
}: {
  delay: number;
  title: string;
  btnLink?: string;
  btnDisabled?: boolean;
}) {
  return (
    <motion.div
      initial={{
        top: 40,
        opacity: 0,
      }}
      animate={{
        top: 0,
        opacity: 1,
      }}
      className='relative'
      transition={{
        duration: 0.2,
        delay,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Button
        variant='primary'
        style={{ color: 'var(--textbrown)' }}
        className='rounded-xl'
      >
        {title}
      </Button>
    </motion.div>
  );
}
