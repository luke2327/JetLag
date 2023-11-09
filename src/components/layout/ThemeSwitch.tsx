import { Switch } from 'antd';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { siteConfig } from '@/constant/config';
import { SupportedTheme } from '@/interface/common';

export default function ThemeSwitch() {
  const [currentTheme, setCurrentTheme] = useState<SupportedTheme>('light');
  const initTheme = (theme: SupportedTheme) => {
    const isDark = theme === 'dark';

    document.documentElement.classList.remove(isDark ? 'light' : 'dark');
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    (
      document.querySelector('meta[name="theme-color"]') as Element
    ).setAttribute('content', isDark ? '#16223D' : '#93CFFF');
    window.localStorage.setItem('mode', isDark ? 'dark' : 'light');
    setCurrentTheme(isDark ? 'dark' : 'light');
  };

  const themeChange = (value: boolean) => {
    initTheme(value ? 'dark' : 'light');
  };

  useEffect(() => {
    if (window?.localStorage.getItem('mode')) {
      initTheme(window?.localStorage.getItem('mode') as SupportedTheme);
    }
  }, []);

  // useEffect(() => {
  //   console.log(window?.localStorage.getItem('mode'));
  // }, [currentTheme]);

  return (
    <Switch
      className='mr-2'
      onChange={themeChange}
      checked={currentTheme === 'dark'}
      defaultChecked={currentTheme === 'dark'}
      checkedChildren={
        <Moon strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
      unCheckedChildren={
        <Sun strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
    />
  );
}
