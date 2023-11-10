import { useEffect, useState } from "react";

import { SupportedTheme } from "@/interface/common";

export default function useTheme(): [SupportedTheme, ((value: boolean) => void)] {
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
    initTheme('light');

    if (window?.localStorage.getItem('mode')) {
      initTheme(window?.localStorage.getItem('mode') as SupportedTheme);
    }
  }, []);

  return [currentTheme, themeChange];
}