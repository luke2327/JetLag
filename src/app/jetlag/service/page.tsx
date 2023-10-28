'use client';

import { Button, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';

import CalcFlight from '@/components/modal/CalcFlight';
import CalcSleep from '@/components/modal/CalcSleep';
import EaseOut from '@/components/motion/EaseOut';
import Title from '@/components/Title';
import TransparentLayer from '@/components/TransparentLayer';

export default function HomePage() {
  const [calcSleepModal, setCalcSleepModal] = useState<boolean>(false);
  const [calcFlightModal, setCalcFlightModal] = useState<boolean>(false);

  return (
    <div className='layout relative text-center sm:pt-4'>
      <EaseOut>
        <Title title='Jet Lag Service' />
      </EaseOut>
      <TransparentLayer className='flex justify-center gap-2'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <AccentButton delay={0.5} title='수면시간 추천' />
          </Col>
          <Col xs={24} sm={8}>
            <AccentButton
              delay={0.8}
              title='수면시간 계산기'
              onClickFn={setCalcSleepModal}
            />
          </Col>
          <Col xs={24} sm={8}>
            <AccentButton
              delay={1.1}
              title='JetLag'
              onClickFn={setCalcFlightModal}
            />
          </Col>
        </Row>
        {/*<Button2 onClick={sleepCalculate}>sss</Button2>*/}
      </TransparentLayer>
      <CalcSleep isModalOpen={calcSleepModal} setModal={setCalcSleepModal} />
      <CalcFlight isModalOpen={calcFlightModal} setModal={setCalcFlightModal} />
    </div>
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
        style={{
          color: 'var(--textbrown)',
          backgroundColor: 'rgb(255, 253, 243)',
        }}
        className='whitespace-nowrap rounded-md'
        onClick={() => onClickFn && onClickFn(true)}
      >
        {title}
      </Button>
    </motion.div>
  );
}
