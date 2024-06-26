'use client';

import { Button, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import CalcFlight from '@/components/modal/CalcFlight';
import CalcSleep from '@/components/modal/CalcSleep';
import RecommendSleep from '@/components/modal/RecommendSleep';
import EaseOut from '@/components/motion/EaseOut';
import Title from '@/components/Title';
import TransparentLayer from '@/components/TransparentLayer';

import { authState } from '@/store/auth';

export default function HomePage() {
  const t = useTranslations('service');
  const auth = useRecoilValue(authState);
  const offset = auth.status === 'login' ? 8 : 12;
  const [calcSleepModal, setCalcSleepModal] = useState(false);
  const [calcFlightModal, setCalcFlightModal] = useState(false);
  const [recommendSleepModal, setRecommendSleepModal] = useState(false);

  return (
    <main
      id='service'
      className='layout relative flex w-full flex-col items-center justify-center p-2 text-center'
    >
      <EaseOut>
        <Title title={t('title')} />
      </EaseOut>
      <TransparentLayer className='flex w-full max-w-[600px] justify-center gap-2'>
        <Row gutter={[16, 16]} className='w-[90%]'>
          {auth.status === 'login' && (
            <Col xs={24} sm={8}>
              <AccentButton
                delay={0.2}
                title={t('sleepTime')}
                onClickFn={setRecommendSleepModal}
              />
            </Col>
          )}
          <Col xs={24} sm={offset}>
            <AccentButton
              delay={0.4}
              title={t('calculateSleepTime')}
              onClickFn={setCalcSleepModal}
            />
          </Col>
          <Col xs={24} sm={offset}>
            <AccentButton
              delay={0.6}
              title={t('calculateJatlag')}
              onClickFn={setCalcFlightModal}
            />
          </Col>
        </Row>
      </TransparentLayer>
      <CalcSleep isModalOpen={calcSleepModal} setModal={setCalcSleepModal} />
      <CalcFlight isModalOpen={calcFlightModal} setModal={setCalcFlightModal} />
      <RecommendSleep
        isModalOpen={recommendSleepModal}
        setModal={setRecommendSleepModal}
      />
    </main>
  );
}

function AccentButton({
  delay,
  title,
  onClickFn,
}: {
  delay: number;
  title: string;
  onClickFn?: (x: boolean) => void;
}) {
  return (
    <motion.div
      initial={{
        top: 20,
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
        className='w-full whitespace-nowrap'
        onClick={() => onClickFn && onClickFn(true)}
      >
        {title}
      </Button>
    </motion.div>
  );
}
