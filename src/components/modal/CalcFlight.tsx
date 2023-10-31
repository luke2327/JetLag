'use client';

import type { DatePickerProps } from 'antd';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Modal,
  Row,
  Typography,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { DestinationInfo } from '@/lib/cityMatching';
import useAxios from '@/hooks/axios';

import Spinner from '@/components/core/Spin';
import FlightConfiguration from '@/components/modal/calcFlight/FlightConfiguration';
import FlightResult from '@/components/modal/calcFlight/FlightResult';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';
import CountryAutocomplete from '@/components/selects/CountryAutocomplete';

import { userState } from '@/store/auth';
import { Flight, flightResultState, flightState } from '@/store/flight';

import { siteConfig } from '@/constant/config';

export type JourneyInfo = Record<'depart' | 'arrive', DestinationInfo> & {
  departDate: string;
};

const { Title, Paragraph, Text } = Typography;
export default function CalcFlight({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const { POST } = useAxios();
  const [level, setLevel] = useState<1 | 2>(1);
  const [collapseKey, setCollapseKey] = useState(1);
  const [journeyInfo, setJourneyInfo] = useState<JourneyInfo>(
    {} as JourneyInfo
  );
  const [loadFlightList, setLoadFlightList] = useState(false);
  const [flightList, setFlightList] = useState<FlightList[]>([]);
  const [selectedFlightInfo, setSelectedFlightInfo] = useState<FlightList>();
  const [flight, setFlight] = useRecoilState(flightState);
  const flightResult = useRecoilValue(flightResultState);
  const user = useRecoilValue(userState);

  const getFlightList = async () => {
    setLoadFlightList(true);

    const res = await POST<FlightList[]>('/scrap/trip/flightList', journeyInfo);

    if (res) {
      setFlightList(res as FlightList[]);
      setLoadFlightList(false);
      setCollapseKey(2);
    }
  };

  const journeyOnChange = (
    type: 'arrive' | 'depart',
    point: DestinationInfo
  ) => {
    setJourneyInfo({
      ...journeyInfo,
      [type]: point,
    });
  };

  const dateOnChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setJourneyInfo({
      ...journeyInfo,
      departDate: dateString,
    });
  };

  const flightInfoOnChange = (flightInfo: FlightList) => {
    setSelectedFlightInfo(flightInfo);
    setCollapseKey(3);

    if (flightInfo) {
      const [departDate, departTime] = (
        flightInfo.departDateTime as unknown as string
      ).split(' ');
      const [arriveDate, arriveTime] = (
        flightInfo.arriveDateTime as unknown as string
      ).split(' ');

      const changeInfo: Partial<Flight> = {
        program: 'before',
        daysbefore: 0,
        depcity: flightInfo.departPoint.cityCode,
        depdate: departDate,
        deptime: departTime,
        arrcity: flightInfo.arrivePoint.cityCode,
        arrdate: arriveDate,
        arrtime: arriveTime,
      };

      setFlight({
        ...flight,
        ...changeInfo,
      });

      if (user && user.wakeupTime && user.sleepTime) {
        setFlight({
          ...flight,
          ...changeInfo,
          wake: user.wakeupTime,
          sleep: user.sleepTime,
        });
      }
    }
  };

  const collapseOnChange = (key: string | string[]) => {
    setCollapseKey(Number(Array.isArray(key) ? key.pop() : key));
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().subtract(1, 'd').endOf('day');
  };

  return (
    <Modal
      title='즐거운 여행을 위한 시차 수면 계산'
      open={isModalOpen}
      onCancel={() => setModal(false)}
      footer={null}
      width='auto'
      className='!max-w-[800px] !p-2'
    >
      <Divider className='mt-0' />
      {level === 1 && (
        <Collapse
          defaultActiveKey={[collapseKey]}
          size='small'
          activeKey={collapseKey}
          onChange={collapseOnChange}
        >
          <Collapse.Panel key={1} header='항공권 검색'>
            <div className='flex w-full flex-col items-start justify-center gap-2'>
              <Row gutter={[8, 8]} className='flex w-full items-center'>
                <Col xs={24} sm={6}>
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={dateOnChange}
                    className='w-full'
                    placeholder='출발일'
                  />
                </Col>
                <Col xs={24} sm={7}>
                  <CountryAutocomplete
                    type='depart'
                    setJourney={journeyOnChange}
                    className='w-full'
                  />
                </Col>
                <Col
                  xs={24}
                  sm={1}
                  className='xs:rotate-0 flex rotate-90 justify-center'
                >
                  <MoveRight strokeWidth={siteConfig.lucideStrokeWidth} />
                </Col>
                <Col xs={24} sm={7}>
                  <CountryAutocomplete
                    type='arrive'
                    setJourney={journeyOnChange}
                    className='w-full'
                  />
                </Col>
                <Col xs={24} sm={3}>
                  <Button
                    onClick={getFlightList}
                    disabled={
                      loadFlightList ||
                      (!journeyInfo.arrive && !journeyInfo.depart)
                    }
                    style={{
                      color: 'var(--textbrown)',
                      backgroundColor: 'rgb(255, 253, 243)',
                      border: '1px solid #c0c0c0',
                    }}
                    className='w-full whitespace-nowrap rounded-md !p-0'
                  >
                    검색
                  </Button>
                </Col>
              </Row>
            </div>
          </Collapse.Panel>
          <Collapse.Panel
            key={2}
            header='항공권 리스트'
            disabled={!flightList.length}
          >
            {flightList.length || loadFlightList ? (
              <div className='flex flex-col items-start justify-center gap-2'>
                {loadFlightList ? (
                  <div className='flex w-full justify-center'>
                    <Spinner />
                  </div>
                ) : null}
                {flightList.length ? (
                  <AnimatePresence mode='wait'>
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='w-full'
                    >
                      <FlightResult
                        list={flightList}
                        flightInfoOnChange={flightInfoOnChange}
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : null}
              </div>
            ) : null}
          </Collapse.Panel>
          <Collapse.Panel
            key={3}
            header='계산 상세'
            disabled={!selectedFlightInfo}
          >
            <FlightConfiguration
              flightInfo={selectedFlightInfo as FlightList}
              journeyInfo={journeyInfo}
              dispatchLevel={setLevel}
            />
          </Collapse.Panel>
        </Collapse>
      )}
      {level === 2 && (
        <div className='flex flex-col items-center'>
          {flightResult.plan?.length && flightResult.type === 'planning' ? (
            <div>
              <Title level={5}>
                {journeyInfo.depart.name} 에서 {journeyInfo.arrive.name} 로의
                수면계획
              </Title>
              <div className='max-h-[54vh] overflow-scroll overflow-x-hidden'>
                {flightResult.plan.map((x, idx) => {
                  if (x.title) {
                    return (
                      <Title level={5} key={idx}>
                        {x.title}
                      </Title>
                    );
                  } else {
                    return (
                      <Row gutter={[4, 4]} key={idx} className='!mb-1 pl-4'>
                        <Col xs={24} sm={4}>
                          <Text strong={true}>{x.sub}</Text>
                        </Col>
                        <Col xs={24} sm={20}>
                          <Text>{x.sugg}</Text>
                        </Col>
                      </Row>
                    );
                  }
                })}
              </div>
            </div>
          ) : null}
          {/* no risk */}
          {flightResult.plan?.length === 0 &&
            flightResult.type === 'no risk' && (
              <div>
                <Title level={5}>
                  <Text className='px-2 text-xl'>
                    {journeyInfo.depart.name}
                  </Text>
                  에서
                  <Text className='px-2 text-xl'>
                    {journeyInfo.arrive.name}
                  </Text>
                  의 여정은{' '}
                  <Text
                    style={{
                      backgroundColor: '#8af58f',
                    }}
                    className='rounded-sm p-1'
                  >
                    리스크가 없습니다
                  </Text>
                </Title>
              </div>
            )}
          {/* little risk */}
          {flightResult.plan?.length === 0 &&
            flightResult.type === 'little risk' && (
              <div>
                <Title level={5}>
                  <Text className='px-2 text-xl'>
                    {journeyInfo.depart.name}
                  </Text>
                  에서
                  <Text className='px-2 text-xl'>
                    {journeyInfo.arrive.name}
                  </Text>
                  의 여정은{' '}
                  <Text
                    style={{
                      backgroundColor: '#e4e4c6',
                    }}
                    className='rounded-sm p-1'
                  >
                    작은 리스크
                  </Text>
                  가 있을 것 같습니다.
                </Title>
              </div>
            )}
          {/* help text */}
          <div className='w-full'>
            <Collapse ghost>
              <Collapse.Panel
                key={1}
                header='여행 피로도를 줄이기 위해서는'
                className='text-md font-bold'
              >
                <Text strong className='pl-6'>
                  비행 중:
                </Text>
                <div className='pl-8 font-medium'>
                  <Paragraph className='!mb-0'>
                    - 차, 커피, 술보다 물 많이 마시기
                  </Paragraph>
                  <Paragraph className='!mb-0'>- 과일 먹기</Paragraph>
                </div>
                <Text strong className='pl-6'>
                  도착 시:
                </Text>
                <div className='pl-8 font-light'>
                  <Paragraph className='!mb-0'>- 물 많이 마시기</Paragraph>
                  <Paragraph className='!mb-0'>- 샤워하기</Paragraph>
                  <Paragraph className='!mb-0'>
                    - 필요한 경우 20분간 낮잠 자기
                  </Paragraph>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>

          <Divider className='my-1' />
          <div className='pt-2'>
            <Button
              type='primary'
              style={{
                color: 'var(--textbrown)',
                backgroundColor: 'rgb(255, 253, 243)',
                border: '1px solid #c0c0c0',
              }}
              className='w-full whitespace-nowrap rounded-md'
              onClick={() => setLevel(1)}
            >
              이전
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
