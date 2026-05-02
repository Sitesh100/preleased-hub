'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboardRoute, getDashboardSession } from '@/src/lib/dashboard-auth';

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getDashboardSession();
    if (!session) {
      router.replace('/');
      return;
    }
    router.replace(getDashboardRoute(session.role));
  }, [router]);

  return null;
}
