import { Dayjs } from 'dayjs';
import { atom } from 'recoil';

export interface Auth {
  status: 'login' | 'none';
  user: {
    email: string | null;
    age: number | null;
    phone: string | null;
    birthday: string | Dayjs | null;
    sleepTime: string | Dayjs | null;
    wakeupTime: string | Dayjs | null;
  };
}

export interface CompactAuth {
  status: 'login';
  user: {
    email: string;
    age: number;
    phone: string;
    birthday: string | Dayjs;
    sleepTime: string | Dayjs;
    wakeupTime: string | Dayjs;
  };
}

export const authState = atom<Auth>({
  key: 'auth',
  default: {
    status: 'none',
    user: {
      email: null,
      age: null,
      phone: null,
      birthday: null,
      sleepTime: null,
      wakeupTime: null,
    },
  },
});
