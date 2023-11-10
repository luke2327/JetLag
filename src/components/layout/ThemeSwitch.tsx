import { Switch } from 'antd';
import { Moon, Sun } from 'lucide-react';

import useTheme from '@/hooks/useTheme';

import { siteConfig } from '@/constant/config';

export default function ThemeSwitch() {
  const [theme, setTheme] = useTheme();

  return (
    <Switch
      className='mr-2'
      onChange={setTheme}
      checked={theme === 'dark'}
      defaultChecked={theme === 'dark'}
      checkedChildren={
        <Moon strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
      unCheckedChildren={
        <Sun strokeWidth={siteConfig.lucideStrokeWidth} size={16} />
      }
    />
  );
}
