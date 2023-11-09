import { Dayjs } from 'dayjs';
import { atom, selector } from 'recoil';

export interface Auth {
  status: 'login' | 'none';
  user: {
    email: string | null;
    age: number | null;
    phone: string | null;
    birthday: string | Dayjs | null;
    sleepTime: string | Dayjs | null;
    wakeupTime: string | Dayjs | null;
    messageToken: string[] | null;
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
    messageToken: string[];
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
      messageToken: null
    },
  },
});

export const userState = selector({
  key: 'authStateSelector',
  get: ({ get }) => {
    const auth = get(authState);

    return auth.user;
  },
});
