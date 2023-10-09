'use client';

import type { DatePickerProps } from 'antd';
import { Button, Col, DatePicker, Divider, Modal, Row, Typography } from 'antd';
import axios from 'axios';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

import FlightResult from '@/components/modal/calcFlight/FlightResult';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';
import CountryAutocomplete from '@/components/selects/CountryAutocomplete';

import { siteConfig } from '@/constant/config';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const { Text, Title } = Typography;

export default function CalcFlight({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const [loadFlightList, setLoadFlightList] = useState(false);
  const [flightList, setFlightList] = useState<FlightList[]>([]);
  const getFlightList = async () => {
    setLoadFlightList(true);

    const result = await axios.post<FlightList[]>(
      `${siteConfig.apiScheme}/scrap/skyscanner/flightList`
    );

    setFlightList(result.data);
    setLoadFlightList(false);
  };
  return (
    <Modal
      title='즐거운 여행을 위한 시차 수면 계산'
      open={isModalOpen}
      onCancel={() => setModal(false)}
      footer={null}
      width='auto'
      className='!max-w-[700px]'
    >
      <Divider className='mt-0' />
      <div className='flex flex-col items-start justify-center gap-2'>
        <Divider orientation='left' className='!my-0'>
          Search flight
        </Divider>
        <Row gutter={[8, 8]} className='flex items-center'>
          <Col xs={24} sm={6}>
            <DatePicker onChange={onChange} />
          </Col>
          <Col xs={24} sm={7}>
            <CountryAutocomplete />
          </Col>
          <Col xs={24} sm={1}>
            <MoveRight strokeWidth={siteConfig.lucideStrokeWidth} />
          </Col>
          <Col xs={24} sm={7}>
            <CountryAutocomplete />
          </Col>
          <Col xs={24} sm={3}>
            <Button onClick={getFlightList}>Search</Button>
          </Col>
        </Row>
      </div>
      <div className='flex flex-col items-start justify-center gap-2'>
        <Divider orientation='left' className='!mb-0 !mt-6'>
          Search Result
        </Divider>
        {loadFlightList ? <>loading</> : null}
        {flightList.length ? <FlightResult list={flightList} /> : null}
      </div>
    </Modal>
  );
}
