'use client';

import { Divider, Drawer } from 'antd';
import { deleteCookie } from 'cookies-next';
import { Home, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import IntlLink from 'next-intl/link';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import LanguageSwitch from '@/components/layout/LanguageSwitch';
import ThemeSwitch from '@/components/layout/ThemeSwitch';

import { authState } from '@/store/auth';
import { flightResultState, flightState } from '@/store/flight';

import { siteConfig } from '@/constant/config';

export default function Header() {
  const t = useTranslations('common');
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

    route.push('/login');
  };
  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const onCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <header className='sticky top-0 flex h-12 w-[100vw] items-center'>
      <div
        id='horizontal-nav'
        className='flex w-full items-center justify-between'
      >
        <ul className='flex w-full gap-4 pl-4'>
          <li>
            <IntlLink className='text-reverse-color' href='/'>
              <Home
                className='text-reverse-color'
                strokeWidth={siteConfig.lucideStrokeWidth}
                size={20}
              />
            </IntlLink>
          </li>
          <li>
            <IntlLink className='text-reverse-color' href='/service'>
              {t('service')}
            </IntlLink>
          </li>
          <li>
            <IntlLink className='text-reverse-color' href='/shopping'>
              {t('shopping')}
            </IntlLink>
          </li>
          <li>
            <IntlLink className='text-reverse-color' href='/customer'>
              {t('customerCenter')}
            </IntlLink>
          </li>
          <li>
            <IntlLink className='text-reverse-color' href='/myPage'>
              {t('myPage')}
            </IntlLink>
          </li>
          {auth.status === 'login' ? (
            <li>
              <IntlLink
                className='text-reverse-color'
                href='/login'
                onClick={logout}
              >
                {t('logout')}
              </IntlLink>
            </li>
          ) : (
            <li>
              <IntlLink className='text-reverse-color' href='/login'>
                {t('login')}
              </IntlLink>
            </li>
          )}
        </ul>
        <div id='language-selector' className='flex items-center'>
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </div>
      <div id='nav-button' style={{ display: 'none' }} className='w-full'>
        <button
          onClick={openDrawer}
          style={{ backgroundColor: 'transparent' }}
          className='pl-2'
        >
          <Menu
            strokeWidth={siteConfig.lucideStrokeWidth}
            color='var(--reverseColor)'
          />
        </button>
        <div className='text-reverse-color flex w-full items-center justify-center'>
          <IntlLink href='/' className='ml-[-36px] font-bold tracking-widest'>
            {t('title')}
          </IntlLink>
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
        style={{ backgroundColor: 'var(--primary)', minWidth: 180 }}
      >
        {auth.status === 'login' ? (
          <div>
            <span>{auth.user.email}</span>
            <Divider className='my-2' />
          </div>
        ) : null}

        <ul className='flex w-full flex-col justify-around gap-2'>
          <li>
            <IntlLink href='/' onClick={onCloseDrawer}>
              {t('title')}
            </IntlLink>
          </li>
          <li>
            <IntlLink href='/service' onClick={onCloseDrawer}>
              {t('service')}
            </IntlLink>
          </li>
          <li>
            <IntlLink href='/shopping' onClick={onCloseDrawer}>
              {t('shopping')}
            </IntlLink>
          </li>
          <li>
            <IntlLink href='/customer' onClick={onCloseDrawer}>
              {t('customerCenter')}
            </IntlLink>
          </li>
          <li>
            <IntlLink href='/myPage' onClick={onCloseDrawer}>
              {t('myPage')}
            </IntlLink>
          </li>
          {auth.status === 'login' ? (
            <li>
              <IntlLink href='/login' onClick={logout}>
                {t('logout')}
              </IntlLink>
            </li>
          ) : (
            <li>
              <IntlLink href='/login' onClick={onCloseDrawer}>
                {t('login')}
              </IntlLink>
            </li>
          )}
        </ul>
        <Divider className='my-2' />
        <div className='flex justify-between'>
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </Drawer>
    </header>
  );
}
