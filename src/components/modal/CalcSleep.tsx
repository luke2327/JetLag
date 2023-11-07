import { Button, Col, Divider, Modal, Row, Select, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Balancer from 'react-wrap-balancer';

import { sleepDate } from '@/lib/utils';

const { Text, Title } = Typography;

export default function CalcSleep({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const t = useTranslations('service');

  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<'am' | 'pm'>('am');
  const [cycles, setCycles] = useState<{ date: Date; label: string }[]>([]);

  const calculate = () => {
    const time = new Date();

    const convHour = hour === 12 ? 0 : hour;

    if (ampm === 'am') {
      time.setHours(convHour);
    } else {
      time.setHours(convHour + 12);
    }

    time.setMinutes(minute);

    const temp: { date: Date; label: string }[] = [];

    temp.push({
      date: new Date(time.getTime() - 270 * 60000),
      label: 'For Three Cycles - Four and a half Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[0].date.getTime() - 270 * 60000),
      label: 'For Four Cycles - Six Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[1].date.getTime() - 270 * 60000),
      label: 'For Five Cycles - Seven and a half Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[2].date.getTime() - 270 * 60000),
      label: 'For Six Cycles - Nine Hours of Sleep.',
    });

    setCycles(temp);
  };

  const sleepNow = () => {
    const temp: { date: Date; label: string }[] = [];

    temp.push({
      date: new Date(new Date().getTime() + 104 * 60000),
      label: 'For One Cycle - One and a half Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[0].date.getTime() + 90 * 60000),
      label: 'For Two Cycles - Three Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[1].date.getTime() + 90 * 60000),
      label: 'For Three Cycles - Four and a half Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[2].date.getTime() + 90 * 60000),
      label: 'For Four Cycles - Six Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[3].date.getTime() + 90 * 60000),
      label: 'For Five Cycles: Seven and a half Hours of Sleep.',
    });
    temp.push({
      date: new Date(temp[4].date.getTime() + 90 * 60000),
      label: 'For Six Cycles - Nine Hours of Sleep.',
    });

    setCycles(temp);
  };

  const checkAgain = () => {
    setHour(1);
    setMinute(0);
    setAmpm('am');
    setCycles([]);
  };

  return (
    <Modal
      title={t('calculateSleepTime')}
      open={isModalOpen}
      onCancel={() => setModal(false)}
      footer={null}
      centered
      width='auto'
      className='!max-w-[700px] !p-2'
    >
      <Divider className='mt-0' />
      <div className='flex flex-col items-center justify-center gap-4'>
        <Row gutter={[8, 8]} className='!xs:w-auto !w-full'>
          <Col xs={24} sm={8}>
            <Select
              size='small'
              placeholder={t('hour')}
              value={hour}
              onChange={(value) => setHour(value)}
              className='xs:w-40 w-full text-center'
              options={Array(12)
                .fill(null)
                .map((_x, i) => ({ value: i + 1 }))}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              size='small'
              placeholder={t('minute')}
              value={minute}
              onChange={(value) => setMinute(value)}
              className='xs:w-40 w-full text-center'
              options={Array(12)
                .fill(null)
                .map((_x, i) => ({ value: i * 5 }))}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Select
              size='small'
              value={ampm}
              onChange={(value) => setAmpm(value)}
              className='xs:w-40 w-full text-center'
              options={[
                { value: 'am', label: 'AM' },
                { value: 'pm', label: 'PM' },
              ]}
            />
          </Col>
        </Row>
        <Divider className='my-1' />
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={8}>
            <Button
              type='default'
              style={{
                color: 'var(--textbrown)',
                backgroundColor: 'rgb(255, 253, 243)',
                border: '1px solid #c0c0c0',
              }}
              className='xs:w-40 w-full'
              onClick={calculate}
            >
              <Text>{t('calculate')}</Text>
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type='default'
              style={{
                color: 'var(--textbrown)',
                backgroundColor: 'rgb(255, 253, 243)',
                border: '1px solid #c0c0c0',
              }}
              className='xs:w-40 w-full'
              onClick={sleepNow}
            >
              <Text>{t('sleepNow')}</Text>
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              type='default'
              style={{
                color: 'var(--textbrown)',
                backgroundColor: 'rgb(255, 253, 243)',
                border: '1px solid #c0c0c0',
              }}
              className='xs:w-40 w-full'
              onClick={checkAgain}
            >
              <Text>{t('checkAgain')}</Text>
            </Button>
          </Col>
        </Row>
      </div>
      {cycles.length ? (
        <>
          <Divider orientation='left'>
            <p className='w-[40px]'>{t('result')}</p>
          </Divider>
          <div className='flex flex-col items-center justify-center'>
            <Row
              gutter={[16, 16]}
              className='flex flex-col items-start justify-center'
            >
              {cycles.map((cycle, i) => (
                <Col key={i} xs={24}>
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={8} className='xs:text-right text-left'>
                      <Title level={5} className='!mb-0'>
                        {sleepDate(cycle.date)}
                      </Title>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Text>{cycle.label}</Text>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
            <Balancer className='mt-2'>{t('calcSleepGuideMsg1')}</Balancer>
            <Balancer>{t('calcSleepGuideMsg2')}</Balancer>
          </div>
        </>
      ) : null}
    </Modal>
  );
}
