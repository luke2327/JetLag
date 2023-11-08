'use client';

import { useRouter } from 'next/navigation';
import { useRouter as useIntlRouter } from 'next-intl/client';
import { useEffect } from 'react';

export default function RootPage() {
  const route = useRouter();
  const intlRoute = useIntlRouter();

  useEffect(() => {
    try {
      intlRoute.push('/');
    } catch (e) {
      route.push('/');
    }
  }, []);
}
