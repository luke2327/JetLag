import { Col, Collapse, Divider, Modal, Row, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { useTranslations } from 'next-intl';
import IntlLink from 'next-intl/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { sleepDate } from '@/lib/utils';

import { userState } from '@/store/auth';

const { Text, Title } = Typography;

type Cycles = { date: Date; label: string }[];

export default function RecommendSleep({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const t = useTranslations('service');
  const [collapseKey, setCollapseKey] = useState(1);
  const [cyclesSleep, setCyclesSleep] = useState<Cycles>([]);
  const [cyclesWakeup, setCyclesWakeup] = useState<Cycles>([]);
  const user = useRecoilValue(userState) || {};

  const calculate = (type: 'sleepTime' | 'wakeupTime') => {
    if (!user[type]) {
      return;
    }
    const time = new Date();
    const hour = (user[type] as Dayjs).get('hour');
    const minute = (user[type] as Dayjs).get('minute');

    time.setHours(hour);
    time.setMinutes(minute);

    const cycles: Cycles = [];

    cycles.push({
      date: new Date(time.getTime() - 270 * 60000),
      label: 'For Three Cycles - Four and a half Hours of Sleep.',
    });
    cycles.push({
      date: new Date(cycles[0].date.getTime() - 270 * 60000),
      label: 'For Four Cycles - Six Hours of Sleep.',
    });
    cycles.push({
      date: new Date(cycles[1].date.getTime() - 270 * 60000),
      label: 'For Five Cycles - Seven and a half Hours of Sleep.',
    });
    cycles.push({
      date: new Date(cycles[2].date.getTime() - 270 * 60000),
      label: 'For Six Cycles - Nine Hours of Sleep.',
    });

    if (type === 'sleepTime') {
      setCyclesSleep(cycles);
    } else {
      setCyclesWakeup(cycles);
    }
  };

  useEffect(() => {
    calculate('sleepTime');
    calculate('wakeupTime');
  }, []);

  const collapseOnChange = (key: string | string[]) => {
    setCollapseKey(Number(Array.isArray(key) ? key.pop() : key));
  };

  return (
    <Modal
      title={t('sleepTime')}
      open={isModalOpen}
      onCancel={() => setModal(false)}
      footer={null}
      width='auto'
      className='!max-w-[600px] !p-2'
    >
      <Divider className='mt-0' />
      {user.sleepTime && user.wakeupTime ? (
        <Collapse
          accordion
          ghost
          defaultActiveKey={[collapseKey]}
          size='small'
          activeKey={collapseKey}
          onChange={collapseOnChange}
        >
          <Collapse.Panel key={1} header={t('sleepTime')}>
            {cyclesSleep.length ? (
              <>
                <div className='flex flex-col pl-6'>
                  <Row gutter={[16, 16]} className='flex flex-col '>
                    {cyclesSleep.map((cycle, i) => (
                      <Col key={i} xs={24}>
                        <Row gutter={[8, 8]}>
                          <Col xs={24} sm={4} className='text-left'>
                            <Title level={5} className='!mb-0'>
                              {sleepDate(cycle.date)}
                            </Title>
                          </Col>
                          <Col xs={24} sm={20}>
                            <Text>{cycle.label}</Text>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </div>
              </>
            ) : null}
          </Collapse.Panel>

          <Collapse.Panel key={2} header={t('wakeupTimeRecommend')}>
            {cyclesWakeup.length ? (
              <>
                <div className='flex flex-col pl-6'>
                  <Row gutter={[16, 16]} className='flex flex-col'>
                    {cyclesWakeup.map((cycle, i) => (
                      <Col key={i} xs={24}>
                        <Row gutter={[8, 8]}>
                          <Col xs={24} sm={4} className='text-left'>
                            <Title level={5} className='!mb-0'>
                              {sleepDate(cycle.date)}
                            </Title>
                          </Col>
                          <Col xs={24} sm={20}>
                            <Text>{cycle.label}</Text>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </div>
              </>
            ) : null}
          </Collapse.Panel>
        </Collapse>
      ) : (
        <div>
          <Text>취침시간과 기상시간을 설정해주세요.</Text>
        </div>
      )}

      <Divider className='my-2' />
      <div>
        {t('toMyPage')}{' '}
        <IntlLink style={{ color: '#1677ff' }} href='/myPage'>
          {t('move')}
        </IntlLink>
      </div>
    </Modal>
  );
}
