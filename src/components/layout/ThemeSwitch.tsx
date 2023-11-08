import { Switch } from 'antd';
import { Moon, Sun } from 'lucide-react';
import { useRecoilState } from 'recoil';

import { settingState } from '@/store/setting';

import { siteConfig } from '@/constant/config';

export default function ThemeSwitch() {
  const [setting, setSetting] = useRecoilState(settingState);
  const themeChange = (value: boolean) => {
    if (value) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      (
        document.querySelector('meta[name="theme-color"]') as Element
      ).setAttribute('content', '#494336');
      window.localStorage.setItem('mode', 'dark');
      setSetting({ theme: 'dark' });
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      (
        document.querySelector('meta[name="theme-color"]') as Element
      ).setAttribute('content', '#F8F5E3');
      window.localStorage.setItem('mode', 'light');
      setSetting({ theme: 'light' });
    }
  };

  return (
    <Switch
      className='mr-2'
      onChange={themeChange}
      checked={setting.theme === 'dark'}
      checkedChildren={
        <Moon strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
      unCheckedChildren={
        <Sun strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
    />
  );
}
