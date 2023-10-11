type Name = string;
type Type = 'cityName';
type Code = string;

export type DestinationInfo = { name: Name; type: Type; code: Code };

const cities: DestinationInfo[] = [
  { name: 'New York', type: 'cityName', code: 'NYC' },
  { name: 'San Francisco', type: 'cityName', code: 'SFO' },
  { name: 'Los Angeles', type: 'cityName', code: 'LAX' },
  { name: 'Chicago', type: 'cityName', code: 'CHI' },
  { name: 'Vancouver', type: 'cityName', code: 'YVR' },
  { name: 'Toronto', type: 'cityName', code: 'YTO' },
  { name: 'London', type: 'cityName', code: 'LON' },
  { name: 'Paris', type: 'cityName', code: 'PAR' },
  { name: 'Frankfurt', type: 'cityName', code: 'FRA' },
  { name: 'Rome', type: 'cityName', code: 'ROM' },
  { name: 'Amsterdam', type: 'cityName', code: 'AMS' },
  { name: 'Madrid', type: 'cityName', code: 'MAD' },
  { name: 'Hong Kong', type: 'cityName', code: 'HKG' },
  { name: 'Taipei', type: 'cityName', code: 'TPE' },
  { name: 'Shanghai', type: 'cityName', code: 'SHA' },
  { name: 'Seoul', type: 'cityName', code: 'SEL' },
  { name: 'Busan', type: 'cityName', code: 'PUS' },
  { name: 'Osaka', type: 'cityName', code: 'OSA' },
  { name: 'Tokyo', type: 'cityName', code: 'TYO' },
  { name: 'Bangkok', type: 'cityName', code: 'BKK' },
  { name: 'Singapore', type: 'cityName', code: 'SIN' },
  { name: 'Kuala Lumpur', type: 'cityName', code: 'KUL' },
  { name: 'Manila', type: 'cityName', code: 'MNL' },
];

const cityMatching = (name: Name) => {
  return cities.find(({ name: nameX }) => nameX === name);
};

export default cityMatching;
