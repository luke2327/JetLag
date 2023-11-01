import { AutoComplete, Input } from 'antd';
import React from 'react';

import cityMatching, { DestinationInfo } from '@/lib/cityMatching';

const renderTitle = (title: string) => (
  <span>
    {title}
    {/*<a*/}
    {/*  style={{ float: 'right' }}*/}
    {/*  href='https://www.google.com/search?q=antd'*/}
    {/*  target='_blank'*/}
    {/*  rel='noopener noreferrer'*/}
    {/*>*/}
    {/*  more*/}
    {/*</a>*/}
  </span>
);

const renderItem = (title: string, code: string) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>{code}</span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Asia'),
    options: [
      renderItem('Hong Kong', 'HKG'),
      renderItem('Taipei', 'TPE'),
      renderItem('Shanghai', 'SHA'),
      renderItem('Seoul', 'SEL'),
      renderItem('Busan', 'PUS'),
      renderItem('Osaka', 'OSA'),
      renderItem('Tokyo', 'TYO'),
      renderItem('Bangkok', 'BKK'),
      renderItem('Singapore', 'SIN'),
      renderItem('Kuala Lumpur', 'KUL'),
      renderItem('Manila', 'MNL'),
    ],
  },
  {
    label: renderTitle('Europe'),
    options: [
      renderItem('London', 'LON'),
      renderItem('Paris', 'PAR'),
      renderItem('Frankfurt', 'FRA'),
      renderItem('Rome', 'ROM'),
      renderItem('Amsterdam', 'AMS'),
      renderItem('Madrid', 'MAD'),
    ],
  },
  {
    label: renderTitle('North America'),
    options: [
      renderItem('New York', 'NYC'),
      renderItem('San Francisco', 'SFO'),
      renderItem('Los Angeles', 'LAX'),
      renderItem('Chicago', 'CHI'),
      renderItem('Vancouver', 'YVR'),
      renderItem('Toronto', 'YTO'),
    ],
  },
];

const App = ({
  type,
  setJourney,
  className,
}: {
  type: 'depart' | 'arrive';
  setJourney: (type: 'arrive' | 'depart', point: DestinationInfo) => void;
  className?: string;
}) => (
  <AutoComplete
    popupClassName='certain-category-search-dropdown'
    // popupMatchSelectWidth={'100%'}
    options={options}
    onChange={(value) =>
      setJourney(type, cityMatching(value) as DestinationInfo)
    }
    size='middle'
    className={className}
  >
    <Input
      className='text-center'
      size='middle'
      placeholder={type === 'depart' ? '출발지' : '도착지'}
    />
  </AutoComplete>
);

export default App;
