'use client';

import type { DatePickerProps } from 'antd';
import { Button, Col, DatePicker, Divider, Modal, Row, Typography } from 'antd';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

import { DestinationInfo } from '@/lib/cityMatching';

import Spinner from '@/components/core/Spin';
import FlightResult from '@/components/modal/calcFlight/FlightResult';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';
import CountryAutocomplete from '@/components/selects/CountryAutocomplete';

import { siteConfig } from '@/constant/config';

type JourneyInfo = Record<'depart' | 'arrive', DestinationInfo> & {
  departDate: string;
};

const { Text, Title } = Typography;

export default function CalcFlight({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const [journeyInfo, setJourneyInfo] = useState<JourneyInfo>(
    {} as JourneyInfo
  );
  const [loadFlightList, setLoadFlightList] = useState(false);
  const [flightList, setFlightList] = useState<FlightList[]>([]);
  const getFlightList = async () => {
    setLoadFlightList(true);

    const result = await axios.post<FlightList[]>(
      `${siteConfig.apiScheme}/scrap/skyscanner/flightList`,
      journeyInfo
    );

    setFlightList(result.data);
    setLoadFlightList(false);
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

  return (
    <Modal
      title='즐거운 여행을 위한 시차 수면 계산'
      open={isModalOpen}
      onCancel={() => setModal(false)}
      footer={null}
      width='auto'
      className='!max-w-[700px] !p-2'
    >
      <Divider className='mt-0' />
      <div className='flex flex-col items-start justify-center gap-2'>
        <Divider orientation='left' className='!my-0'>
          Search flight
        </Divider>
        <Row gutter={[8, 8]} className='flex items-center'>
          <Col xs={24} sm={6}>
            <DatePicker onChange={dateOnChange} />
          </Col>
          <Col xs={24} sm={7}>
            <CountryAutocomplete type='depart' setJourney={journeyOnChange} />
          </Col>
          <Col xs={24} sm={1}>
            <MoveRight strokeWidth={siteConfig.lucideStrokeWidth} />
          </Col>
          <Col xs={24} sm={7}>
            <CountryAutocomplete type='arrive' setJourney={journeyOnChange} />
          </Col>
          <Col xs={24} sm={3}>
            <Button onClick={getFlightList} disabled={loadFlightList}>
              Search
            </Button>
          </Col>
        </Row>
      </div>
      {flightList.length || loadFlightList ? (
        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='w-full'
          >
            <div className='flex flex-col items-start justify-center gap-2'>
              <Divider orientation='left' className='!mb-0 !mt-6'>
                Search Result
              </Divider>
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
                    <FlightResult list={flightList} />
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </Modal>
  );
}
