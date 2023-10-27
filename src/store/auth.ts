import { atom } from 'recoil';

export interface Auth {
  status: 'login' | 'none';
  user: {
    email: string | null;
    age: number | null;
    phone: string | null;
    birthday: string | null;
    sleepTime: string | null;
    wakeupTime: string | null;
  };
}

export interface CompactAuth {
  status: 'login';
  user: {
    email: string;
    age: number;
    phone: string;
    birthday: string;
    sleepTime: string;
    wakeupTime: string;
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
