'use client';

//

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { Auth, authState } from '@/store/auth';

import { siteConfig } from '@/constant/config';

export default function AppLayout({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);

  const getUserInfo = async () => {
    await axios
      .post<{
        authorization: string;
        success: boolean;
        user: Auth['user'];
      }>(
        `${siteConfig.apiScheme}/auth/userInfo`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          console.log(111, res.data.user);
          setAuth({ ...auth, status: 'login', user: res.data.user });
        }
      })
      .catch((e) => {
        console.log(e.response);
      });

    setLoading(false);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return loading ? (
    <div></div>
  ) : (
    <section className='ivory'>{children}</section>
  );
}
