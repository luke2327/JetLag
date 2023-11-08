'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const route = useRouter();

  useEffect(() => {
    route.push('/');
  }, []);
}
