import dayjs from 'dayjs';

import { Auth } from '@/store/auth';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function toDayJs(user: Auth['user']) {
  const returnData: {
    birthday?: Auth['user']['birthday'];
    sleepTime?: Auth['user']['sleepTime'];
    wakeupTime?: Auth['user']['wakeupTime'];
  } = {};

  if (user.birthday) {
    returnData.birthday = dayjs(user.birthday, 'YYYY-MM-DD');
  }
  if (user.sleepTime) {
    returnData.sleepTime = dayjs(user.sleepTime, 'HH:mm');
  }
  if (user.wakeupTime) {
    returnData.wakeupTime = dayjs(user.wakeupTime, 'HH:mm');
  }

  return returnData;
}
