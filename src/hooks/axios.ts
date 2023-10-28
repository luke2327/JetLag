import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';

import { authState } from '@/store/auth';

import { siteConfig } from '@/constant/config';

export type NetworkError = { success: false; message: string };

export default function useAxios() {
  const setAuth = useSetRecoilState(authState);
  const instance = axios.create({
    baseURL: siteConfig.apiScheme,
    timeout: 10000,
  });

  async function GET<T>(...rest: Parameters<(typeof axios)['get']>) {
    return await instance.get<T>(...rest).then((res) => res.data);
  }
  async function POST<T>(...rest: Parameters<(typeof axios)['post']>) {
    return await instance
      .post<T>(...rest)
      .then((res) => res.data)
      .catch((e) => {
        deleteCookie('Authorization');
        deleteCookie('session-cookie');
        setAuth({
          status: 'none',
          user: {
            email: null,
            age: null,
            phone: null,
            birthday: null,
            sleepTime: null,
            wakeupTime: null,
          },
        });

        return { success: false, message: e.message } as NetworkError;
      });
  }

  return {
    GET,
    POST,
  };
}
