import { Select } from 'antd';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

import { SupportedLanguage } from '@/interface/common';

export default function LanguageSwitch() {
  const locale = useLocale() as unknown as 'ko' | 'en' | 'ja';
  const pathname = usePathname();
  const route = useRouter();

  const languageChange = (locale: SupportedLanguage) => {
    route.replace(pathname, { locale });
    localStorage.setItem('locale', locale);
  };

  return (
    <Select
      size='small'
      bordered={false}
      defaultValue={locale}
      onChange={languageChange}
      className='min-w-[84px]'
      options={[
        { value: 'en', label: 'English' },
        { value: 'ko', label: '한국어' },
        { value: 'ja', label: '日本語' },
      ]}
    />
  );
}
