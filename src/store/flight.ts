import { Dayjs } from 'dayjs';
import { atom } from 'recoil';

export interface Flight {
  depcity: string | null;
  arrcity: string | null;
  depdate: string | null;
  deptime: string | null;
  arrdate: string | null;
  arrtime: string | null;
  sleep: string | Dayjs | null;
  wake: string | Dayjs | null;
  program: 'before';
  daysbefore: number;
}

export const flightState = atom<Flight>({
  key: 'flight',
  default: {
    depcity: null,
    arrcity: null,
    depdate: null,
    deptime: null,
    arrdate: null,
    arrtime: null,
    sleep: null,
    wake: null,
    program: 'before',
    daysbefore: 0,
  },
});

export type FlightResult = {
  type: 'planning' | 'no risk' | 'little risk';
  plan?: Partial<{
    title: string;
    sub: string;
    sugg: string;
  }>[];
};

export const flightResultState = atom<FlightResult>({
  key: 'flightResult',
  default: {
    type: 'planning',
    plan: [],
  },
});
