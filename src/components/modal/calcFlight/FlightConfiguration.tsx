'use client';

import {
  Button,
  Col,
  Input,
  InputNumber,
  message,
  Row,
  TimePicker,
  Typography,
} from 'antd';
import { Dayjs } from 'dayjs';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import moment from 'moment-timezone';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import useAxios, { NetworkError } from '@/hooks/axios';

import { JourneyInfo } from '@/components/modal/CalcFlight';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';

import { userState } from '@/store/auth';
import { FlightResult, flightResultState, flightState } from '@/store/flight';

import { siteConfig } from '@/constant/config';
import { TimeZone } from '@/constant/timezone';

const { Text, Paragraph } = Typography;

type IFlightRecommend = {
  flightInfo: FlightList;
  journeyInfo: JourneyInfo;
  dispatchLevel: Dispatch<SetStateAction<1 | 2>>;
};

function getTimeDiff(departTimezone: TimeZone, arriveTimezone: TimeZone) {
  try {
    const now = moment.utc() as unknown as number;
    const dp = moment.tz.zone(departTimezone)?.offset(now) as number;
    const ar = moment.tz.zone(arriveTimezone)?.offset(now) as number;

    return (dp - ar) / 60;
  } catch (e) {
    console.log('시차 구하기 에러', e);

    return 0;
  }
}

export default function FlightConfiguration({
  flightInfo,
  journeyInfo,
  dispatchLevel,
}: IFlightRecommend) {
  const { depart, arrive } = journeyInfo;
  const user = useRecoilValue(userState);
  const [messageApi, contextHolder] = message.useMessage();
  const [manualWake, setManualWake] = useState<string | null>(null);
  const [manualSleep, setManualSleep] = useState<string | null>(null);
  const [flight, setFlight] = useRecoilState(flightState);
  const setFlightResult = useSetRecoilState(flightResultState);
  const { POST } = useAxios();
  const calculate = async () => {
    const wake = flight.wake
      ? (flight.wake as Dayjs).format('HH:mm')
      : manualWake;
    const sleep = flight.sleep
      ? (flight.sleep as Dayjs).format('HH:mm')
      : manualSleep;
    const params = {
      ...flight,
      wake: (flight.wake as Dayjs).format('HH:mm'),
      sleep: (flight.sleep as Dayjs).format('HH:mm'),
    };

    const res = await POST<{ result: FlightResult }>(
      '/scrap/trip/flightJetlag',
      params
    ).catch((e) => {
      messageApi.open({
        type: 'error',
        content: (e as NetworkError).message || 'Calculate jetlag error.',
      });
    });

    if (res && (res as { result: FlightResult }).result) {
      setFlightResult((res as { result: FlightResult }).result);

      dispatchLevel(2);
    } else if (res && (res as NetworkError).message) {
      messageApi.open({
        type: 'error',
        content: (res as NetworkError).message,
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'No data.',
      });
    }
  };

  return (
    <div className='flex max-h-[400px] w-full flex-col gap-1 overflow-scroll overflow-x-hidden'>
      {contextHolder}
      <Row gutter={[4, 4]}>
        <Col xs={24} sm={8}>
          <Paragraph className='!mb-0'>시차</Paragraph>
          <Input
            size='small'
            disabled
            value={getTimeDiff(depart.tz, arrive.tz)}
            width='100%'
          ></Input>
        </Col>
        <Col xs={12} sm={8}>
          <Paragraph className='!mb-0'>취침시간</Paragraph>
          <TimePicker
            showNow={false}
            minuteStep={30}
            showSecond={false}
            placeholder='Sleep time'
            format='HH:mm'
            defaultValue={flight.sleep as Dayjs}
            disabled={!!flight.sleep && !!user.sleepTime}
            className='w-full'
            onChange={(date) => {
              setFlight({
                ...flight,
                sleep: date,
              });
            }}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Paragraph className='!mb-0'>기상시간</Paragraph>
          <TimePicker
            showNow={false}
            minuteStep={30}
            showSecond={false}
            placeholder='Wakeup time'
            format='HH:mm'
            defaultValue={flight.wake as Dayjs}
            disabled={!!flight.wake && !!user.wakeupTime}
            className='w-full'
            onChange={(date) => {
              setFlight({
                ...flight,
                wake: date,
              });
            }}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]} className='mt-2'>
        <Col xs={24} sm={12}>
          <Text>출발</Text>
          <div className='flex items-center gap-2'>
            <PlaneTakeoff strokeWidth={siteConfig.lucideStrokeWidth} />
            <Text>{flightInfo.departDateTime.toString()}</Text>
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <Text>도착</Text>
          <div className='flex items-center gap-2'>
            <PlaneLanding strokeWidth={siteConfig.lucideStrokeWidth} />
            <Text>{flightInfo.arriveDateTime.toString()}</Text>
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 2]} className='mt-2'>
        <Col xs={24}>
          시차적응을 위한 날짜 조정
          <InputNumber
            min={0}
            max={10}
            maxLength={2}
            size='small'
            className='mx-1.5 max-w-[40px] !text-center'
            controls={false}
            defaultValue={0}
            onChange={(val) =>
              setFlight({ ...flight, daysbefore: val as number })
            }
          />
          일 후 탑승
        </Col>
      </Row>
      <Row className='mt-2'>
        <Button
          type='primary'
          style={{
            color: 'var(--textbrown)',
            backgroundColor: 'rgb(255, 253, 243)',
            border: '1px solid #c0c0c0',
          }}
          onClick={calculate}
          className='w-full whitespace-nowrap rounded-md'
        >
          계산
        </Button>
      </Row>
    </div>
  );
}
