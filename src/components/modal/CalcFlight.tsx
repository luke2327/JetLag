'use client';

import type { DatePickerProps } from 'antd';
import { Button, Col, Collapse, DatePicker, Divider, Modal, Row } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

import { DestinationInfo } from '@/lib/cityMatching';
import useAxios from '@/hooks/axios';

import Spinner from '@/components/core/Spin';
import FlightRecommend from '@/components/modal/calcFlight/FlightRecommend';
import FlightResult from '@/components/modal/calcFlight/FlightResult';
import { FlightList } from '@/components/modal/calcFlight/FlightResult.interface';
import CountryAutocomplete from '@/components/selects/CountryAutocomplete';

import { siteConfig } from '@/constant/config';

export type JourneyInfo = Record<'depart' | 'arrive', DestinationInfo> & {
  departDate: string;
};
export default function CalcFlight({
  isModalOpen,
  setModal,
}: {
  isModalOpen: boolean;
  setModal: (x: boolean) => void;
}) {
  const { POST } = useAxios();
  const [collapseKey, setCollapseKey] = useState(1);
  const [journeyInfo, setJourneyInfo] = useState<JourneyInfo>(
    {} as JourneyInfo
  );
  const [loadFlightList, setLoadFlightList] = useState(false);
  const [flightList, setFlightList] = useState<FlightList[]>([]);
  const [selectedFlightInfo, setSelectedFlightInfo] = useState<FlightList>();
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
      className='!max-w-[700px] !p-2'
    >
      <Divider className='mt-0' />
      <Collapse
        defaultActiveKey={[collapseKey]}
        size='small'
        activeKey={collapseKey}
        onChange={collapseOnChange}
      >
        <Collapse.Panel key={1} header='Search flight'>
          <div className='flex flex-col items-start justify-center gap-2'>
            <Row gutter={[8, 8]} className='flex items-center'>
              <Col xs={24} sm={6}>
                <DatePicker
                  disabledDate={disabledDate}
                  onChange={dateOnChange}
                />
              </Col>
              <Col xs={24} sm={7}>
                <CountryAutocomplete
                  type='depart'
                  setJourney={journeyOnChange}
                />
              </Col>
              <Col xs={24} sm={1}>
                <MoveRight strokeWidth={siteConfig.lucideStrokeWidth} />
              </Col>
              <Col xs={24} sm={7}>
                <CountryAutocomplete
                  type='arrive'
                  setJourney={journeyOnChange}
                />
              </Col>
              <Col xs={24} sm={3}>
                <Button onClick={getFlightList} disabled={loadFlightList}>
                  Search
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse.Panel>
        <Collapse.Panel key={2} header='Search result'>
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
          header='Journey info'
          disabled={!selectedFlightInfo}
        >
          <FlightRecommend
            flightInfo={selectedFlightInfo as FlightList}
            journeyInfo={journeyInfo}
          />
        </Collapse.Panel>
      </Collapse>
    </Modal>
  );
}
