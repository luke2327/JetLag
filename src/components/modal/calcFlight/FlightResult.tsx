'use client';

import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import Image from 'next/image';

import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';

const { Text } = Typography;

type IFlightResult = {
  list: FlightList[];
  flightInfoOnChange: (flightInfo: FlightList) => void;
};

export default function FlightResult(props: IFlightResult) {
  return (
    <div className='flex max-h-[400px] w-full flex-col gap-1 overflow-scroll overflow-x-hidden'>
      {props.list.map((flightData, idx) => (
        <FlightCard
          key={idx}
          data={flightData}
          onClick={props.flightInfoOnChange}
        />
      ))}
    </div>
  );
}

function FlightCard({
  data,
  onClick,
}: {
  data: FlightList;
  onClick: (flightInfo: FlightList) => void;
}) {
  const setTimeFormat = (t: Date) =>
    (t.toString().split(' ').pop() as string).replace(':00', '');
  const setDurationFormat = (t: number) => {
    const duration = moment.duration(t, 'minutes');

    return moment.utc(duration.asMilliseconds()).format('HH시간mm분');
  };
  const setDurationFormat2 = (t: number) => {
    const hour = parseInt((t / 60).toString());
    const minute = parseInt((t % 60).toString());

    return `${hour}h ${minute}m`;
  };

  return (
    <div
      className='flight-card cursor-pointer rounded-md p-2'
      onClick={() => onClick(data)}
    >
      <div className='flex items-center gap-2'>
        <Image
          src={`https://pic.tripcdn.com/airline_logo/3x/${data.flightInfo.airlineCode.toLowerCase()}.webp`}
          alt='airline image'
          width={24}
          height={24}
          className='visible rounded-sm'
        />
        <Text>{data.flightInfo.flightNo}</Text>
      </div>
      <Row gutter={[8, 8]} className='flex items-center'>
        <Col xs={24} sm={20}>
          <Row gutter={[4, 4]} className='flex items-center'>
            <Col xs={4}>{setTimeFormat(data.departDateTime)}</Col>
            <Col
              xs={16}
              className='!flex !flex-col !items-center !whitespace-nowrap'
            >
              <Col xs={24} sm={8} className='!flex !justify-center'>
                {setDurationFormat2(data.duration)}
              </Col>
              <div
                className='flex h-[1.5px] w-full items-center justify-between'
                style={{ backgroundColor: '#d9d9d9' }}
              >
                <div
                  className='h-[8px] w-[8px]'
                  style={{ backgroundColor: '#dadfe6' }}
                ></div>
                <div
                  className='h-[8px] w-[8px] bg-white'
                  style={{ border: '2px solid #dadfe6' }}
                ></div>
                <div
                  className='h-[8px] w-[8px] bg-white'
                  style={{ backgroundColor: '#dadfe6' }}
                ></div>
              </div>
              <Col xs={24} sm={8} className='!flex !justify-center'>
                {/*Direct*/}
              </Col>
            </Col>
            <Col xs={4} className='!flex !justify-end'>
              {setTimeFormat(data.arriveDateTime)}
            </Col>
          </Row>
          <Row gutter={[4, 4]} className='flex items-center'>
            <Col xs={12}>
              <Row>
                <Col>{data.departPoint.cityName}</Col>
                <Col>({data.departPoint.airportCode})</Col>
                {data.departPoint.terminal ? (
                  <Col>
                    &nbsp;-&nbsp;
                    {data.departPoint.terminal}
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col xs={12} className='!flex !justify-end'>
              <Row>
                <Col>{data.arrivePoint.cityName}</Col>
                <Col>({data.arrivePoint.airportCode})</Col>
                {data.arrivePoint.terminal ? (
                  <Col>
                    &nbsp;-&nbsp;
                    {data.arrivePoint.terminal}
                  </Col>
                ) : null}
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
