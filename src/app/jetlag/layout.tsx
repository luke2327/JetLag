'use client';

// default page

import { useEffect, useState } from 'react';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { toDayJs } from '@/lib/helper';
import useAxios from '@/hooks/axios';

import { authState } from '@/store/auth';

import { Credential } from '@/interface/auth';

export default function AppLayout({ children }: React.PropsWithChildren) {
  const { POST } = useAxios();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);

  const getUserInfo = async () => {
    const payload = ['/auth/userInfo', {}, { withCredentials: true }] as const;
    await POST<Credential>(...payload).then((res) => {
      if (res && res.success) {
        const dayJsInstance = toDayJs(res.user);

        setAuth({
          ...auth,
          status: 'login',
          user: { ...res.user, ...dayJsInstance },
        });
      }
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
