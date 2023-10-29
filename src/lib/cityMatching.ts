import { TimeZone } from '@/constant/timezone';

type Name = string;
type Type = 'cityName';
type Code = string;

export type DestinationInfo = {
  name: Name;
  type: Type;
  code: Code;
  tz: TimeZone;
};

const cities: DestinationInfo[] = [
  { name: 'New York', type: 'cityName', code: 'NYC', tz: 'America/New_York' },
  {
    name: 'San Francisco',
    type: 'cityName',
    code: 'SFO',
    tz: 'America/Los_Angeles',
  },
  {
    name: 'Los Angeles',
    type: 'cityName',
    code: 'LAX',
    tz: 'America/Los_Angeles',
  },
  { name: 'Chicago', type: 'cityName', code: 'CHI', tz: 'America/Chicago' },
  {
    name: 'Vancouver',
    type: 'cityName',
    code: 'YVR',
    tz: 'America/Los_Angeles',
  },
  { name: 'Toronto', type: 'cityName', code: 'YTO', tz: 'America/Toronto' },
  { name: 'London', type: 'cityName', code: 'LON', tz: 'Europe/London' },
  { name: 'Paris', type: 'cityName', code: 'PAR', tz: 'Europe/Paris' },
  { name: 'Frankfurt', type: 'cityName', code: 'FRA', tz: 'Europe/Paris' },
  { name: 'Rome', type: 'cityName', code: 'ROM', tz: 'Europe/Rome' },
  { name: 'Amsterdam', type: 'cityName', code: 'AMS', tz: 'Europe/Amsterdam' },
  { name: 'Madrid', type: 'cityName', code: 'MAD', tz: 'Europe/Madrid' },
  { name: 'Hong Kong', type: 'cityName', code: 'HKG', tz: 'Asia/Hong_Kong' },
  { name: 'Taipei', type: 'cityName', code: 'TPE', tz: 'Asia/Taipei' },
  { name: 'Shanghai', type: 'cityName', code: 'SHA', tz: 'Asia/Shanghai' },
  { name: 'Seoul', type: 'cityName', code: 'SEL', tz: 'Asia/Seoul' },
  { name: 'Busan', type: 'cityName', code: 'PUS', tz: 'Asia/Seoul' },
  { name: 'Osaka', type: 'cityName', code: 'OSA', tz: 'Asia/Tokyo' },
  { name: 'Tokyo', type: 'cityName', code: 'TYO', tz: 'Asia/Tokyo' },
  { name: 'Bangkok', type: 'cityName', code: 'BKK', tz: 'Asia/Bangkok' },
  { name: 'Singapore', type: 'cityName', code: 'SIN', tz: 'Asia/Singapore' },
  {
    name: 'Kuala Lumpur',
    type: 'cityName',
    code: 'KUL',
    tz: 'Asia/Kuala_Lumpur',
  },
  { name: 'Manila', type: 'cityName', code: 'MNL', tz: 'Asia/Manila' },
];

const cityMatching = (name: Name) => {
  return cities.find(({ name: nameX }) => nameX === name);
};

export default cityMatching;
