import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';

import { authState } from '@/store/auth';

import { siteConfig } from '@/constant/config';

export type NetworkError = { success: false; message: string };

export default function useAxios() {
  const route = useRouter();
  const resetAuth = useResetRecoilState(authState);
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
        console.log(e, 'Axios error');
        if (e.message === 'timeout of 10000ms exceeded') {
          console.log('타임아웃 에러');
        } else {
          localStorage.removeItem('jl');
          deleteCookie('Authorization');
          deleteCookie('session-cookie');
          resetAuth();

          if (e.message === 'Request failed with status code 401') {
            route.push('/jetlag/login');
          }
        }

        return { success: false, message: e.message } as NetworkError;
      });
  }

  return {
    GET,
    POST,
  };
}
