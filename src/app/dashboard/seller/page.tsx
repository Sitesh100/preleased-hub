'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar, { NavItem } from '@/src/components/dashboard/Sidebar';
import Topbar               from '@/src/components/dashboard/Topbar';
import PropertiesTab        from '@/src/components/dashboard/PropertiesTab';
import LeadsTab             from '@/src/components/dashboard/LeadsTab';
import {
  clearDashboardSession,
  DashboardSession,
  getDashboardSession,
} from '@/src/lib/dashboard-auth';

export default function SellerDashboardPage() {
  const router = useRouter();
  const [session,     setSession]     = useState<DashboardSession | null>(null);
  const [active,      setActive]      = useState<NavItem>('properties');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const current = getDashboardSession();
    if (!current || current.role !== 'seller') {
      router.replace('/dashboard');
      return;
    }
    setSession(current);
  }, [router]);

  if (!session || session.role !== 'seller') {
    return null;
  }

  return (
    <div className="h-full flex bg-[#f7f7f7]">
      <Sidebar
        active={active}
        onNav={setActive}
        onLogout={() => {
          clearDashboardSession();
          setSession(null);
        }}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
        accountLabel="Seller Account"
        accountEmail={session.email}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar active={active} />

        <main className="flex-1 overflow-y-auto p-6">
          {active === 'properties' ? <PropertiesTab /> : <LeadsTab />}
        </main>
      </div>
    </div>
  );
}