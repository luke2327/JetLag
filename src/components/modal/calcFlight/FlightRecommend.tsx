'use client';

import { Col, Input, Row, TimePicker, Typography } from 'antd';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import moment from 'moment-timezone';

import { JourneyInfo } from '@/components/modal/CalcFlight';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';

import { siteConfig } from '@/constant/config';
import { TimeZone } from '@/constant/timezone';

const { Text } = Typography;

type IFlightRecommend = {
  flightInfo: FlightList;
  journeyInfo: JourneyInfo;
};

function getTimeDiff(departTimezone: TimeZone, arriveTimezone: TimeZone) {
  const now = moment.utc() as unknown as number;
  const dp = moment.tz.zone(departTimezone)?.offset(now) as number;
  const ar = moment.tz.zone(arriveTimezone)?.offset(now) as number;

  return (dp - ar) / 60;
}

export default function FlightRecommend({
  flightInfo,
  journeyInfo,
}: IFlightRecommend) {
  const { depart, arrive } = journeyInfo;

  return (
    <div className='flex max-h-[400px] w-full flex-col gap-1 overflow-scroll overflow-x-hidden'>
      <Row>
        <Col xs={6}>
          <Input disabled value={getTimeDiff(depart.tz, arrive.tz)}></Input>
        </Col>
        <Col xs={18}>
          <TimePicker
            showNow={false}
            minuteStep={30}
            showSecond={false}
            placeholder='취침시간'
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12}>
          <Text>Depart time</Text>
          <div className='flex items-center gap-2'>
            <PlaneTakeoff strokeWidth={siteConfig.lucideStrokeWidth} />
            <Text>{flightInfo.departDateTime.toString()}</Text>
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <Text>Arrive time</Text>
          <div className='flex items-center gap-2'>
            <PlaneLanding strokeWidth={siteConfig.lucideStrokeWidth} />
            <Text>{flightInfo.arriveDateTime.toString()}</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}
