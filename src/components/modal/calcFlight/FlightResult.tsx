'use client';

import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import Image from 'next/image';

import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';

const { Text } = Typography;

type IFlightResult = {
  list: FlightList[];
};

export default function FlightResult(props: IFlightResult) {
  return (
    <div className='flex max-h-[400px] w-full flex-col gap-1 overflow-scroll overflow-x-hidden'>
      {props.list.map((flightData, idx) => (
        <FlightCard key={idx} data={flightData} />
      ))}
    </div>
  );
}

function FlightCard({ data }: { data: FlightList }) {
  const setTimeFormat = (t: Date) =>
    (t.toString().split(' ').pop() as string).replace(':00', '');
  const setDurationFormat = (t: number) => {
    const duration = moment.duration(t, 'minutes');

    return moment.utc(duration.asMilliseconds()).format('HH시간mm분');
  };

  return (
    <div className='flight-card cursor-pointer rounded-md p-2'>
      <div>TagList</div>
      <Row gutter={[8, 8]} className='flex items-center'>
        <Col xs={24} sm={20}>
          <Row gutter={[4, 4]} className='flex items-center'>
            <Col xs={8}>{setTimeFormat(data.departDateTime)}</Col>
            <Col
              xs={8}
              className='!flex !flex-col !items-center !whitespace-nowrap'
            >
              <Image
                width={32}
                height={6}
                alt='flight arrow'
                src='/images/arrow-flight.png'
                className='visible'
              />
              <Col xs={24} sm={8} className='!flex !justify-center'>
                {setDurationFormat(data.duration)}
              </Col>
            </Col>
            <Col xs={8} className='!flex !justify-end'>
              {setTimeFormat(data.arriveDateTime)}
            </Col>
          </Row>
          <Row gutter={[4, 4]} className='flex items-center'>
            <Col xs={12}>
              <Row>
                <Col>{data.departPoint.cityName}</Col>
                <Col>({data.departPoint.cityCode})</Col>
                <Col>&nbsp;-&nbsp;{data.departPoint.airportCode}</Col>
              </Row>
            </Col>
            <Col xs={12} className='!flex !justify-end'>
              <Row>
                <Col>{data.arrivePoint.cityName}</Col>
                <Col>({data.arrivePoint.cityCode})</Col>
                <Col>&nbsp;-&nbsp;{data.arrivePoint.airportCode}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={4} className='!flex !justify-center'>
          <Text className='!font-bold'>
            {data.policies.price.totalPrice.toLocaleString('ko-KR')}
          </Text>
        </Col>
      </Row>
    </div>
  );
}
