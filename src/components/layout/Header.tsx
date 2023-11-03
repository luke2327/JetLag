'use client';

import { Divider, Drawer } from 'antd';
import { deleteCookie } from 'cookies-next';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { authState } from '@/store/auth';
import { flightResultState, flightState } from '@/store/flight';

import { siteConfig } from '@/constant/config';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const route = useRouter();
  const auth = useRecoilValue(authState);
  const resetAuth = useResetRecoilState(authState);
  const resetFlight = useResetRecoilState(flightState);
  const resetFlightResult = useResetRecoilState(flightResultState);
  const logout = () => {
    deleteCookie('Authorization');
    deleteCookie('session-cookie');
    resetAuth();
    resetFlight();
    resetFlightResult();
    onCloseDrawer();
    localStorage.removeItem('jl');

    route.push('/jetlag/login');
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <header className='sticky top-0 flex h-12 w-[100vw] items-center'>
      <ul id='horizontal-nav' className='flex w-full justify-around'>
        <li>
          <Link className='linear-ivory-text' href='/jetlag'>
            Jet Lag
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/service'>
            Service
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/shopping'>
            Shopping
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/customer'>
            Customer Center
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/myPage'>
            My Page
          </Link>
        </li>
        {auth.status === 'login' ? (
          <li>
            <Link
              className='linear-ivory-text'
              href='/jetlag/login'
              onClick={logout}
            >
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link className='linear-ivory-text' href='/jetlag/login'>
              Login
            </Link>
          </li>
        )}
      </ul>
      <div id='nav-button' style={{ display: 'none' }} className='w-full'>
        <button
          onClick={openDrawer}
          style={{ backgroundColor: 'transparent' }}
          className='pl-2'
        >
          <Menu
            strokeWidth={siteConfig.lucideStrokeWidth}
            color='var(--ivory)'
          />
        </button>
        <div className='linear-ivory-text flex w-full items-center justify-center'>
          <Link href='/jetlag' className='ml-[-36px] font-bold tracking-widest'>
            Jetlag
          </Link>
        </div>
      </div>

      <Drawer
        id='header-drawer'
        placement='left'
        closable={false}
        onClose={onCloseDrawer}
        open={drawerOpen}
        key='drawer-menu'
        width='50vw'
        style={{ backgroundColor: 'var(--ivory)' }}
      >
        {auth.status === 'login' ? (
          <div>
            <span>{auth.user.email}</span>
            <Divider className='my-2' />
          </div>
        ) : null}

        <ul className='flex w-full flex-col justify-around gap-2'>
          <li>
            <Link href='/jetlag' onClick={onCloseDrawer}>
              Jet Lag
            </Link>
          </li>
          <li>
            <Link href='/jetlag/service' onClick={onCloseDrawer}>
              Service
            </Link>
          </li>
          <li>
            <Link href='/jetlag/shopping' onClick={onCloseDrawer}>
              Shopping
            </Link>
          </li>
          <li>
            <Link href='/jetlag/customer' onClick={onCloseDrawer}>
              Customer Center
            </Link>
          </li>
          <li>
            <Link href='/jetlag/myPage' onClick={onCloseDrawer}>
              My Page
            </Link>
          </li>
          {auth.status === 'login' ? (
            <li>
              <Link href='/jetlag/login' onClick={logout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href='/jetlag/login' onClick={onCloseDrawer}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </Drawer>
    </header>
  );
}
