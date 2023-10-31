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
    <main
      id='service'
      className='layout relative flex w-full flex-col items-center justify-center p-2 text-center'
    >
      <EaseOut>
        <Title title='Jet Lag Service' />
      </EaseOut>
      <TransparentLayer className='flex w-full max-w-[600px] justify-center gap-2'>
        <Row gutter={[16, 16]} className='w-[90%]'>
          <Col xs={24} sm={8}>
            <AccentButton delay={0.5} title='수면시간 추천' />
          </Col>
          <Col xs={24} sm={8}>
            <AccentButton
              delay={0.8}
              title='수면시간 계산'
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
        style={{
          color: 'var(--textbrown)',
          backgroundColor: 'rgb(255, 253, 243)',
          border: '1px solid #c0c0c0',
        }}
        className='w-full whitespace-nowrap rounded-md'
        onClick={() => onClickFn && onClickFn(true)}
      >
        {title}
      </Button>
    </motion.div>
  );
}
