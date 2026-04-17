'use client';

import { useState } from 'react';

import LoginScreen          from '@/src/components/dashboard/LoginScreen';
import Sidebar, { NavItem } from '@/src/components/dashboard/Sidebar';
import Topbar               from '@/src/components/dashboard/Topbar';
import PropertiesTab        from '@/src/components/dashboard/PropertiesTab';
import LeadsTab             from '@/src/components/dashboard/LeadsTab';

export default function SellerDashboardPage() {
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [active,      setActive]      = useState<NavItem>('properties');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="h-full flex bg-[#f7f7f7]">
      <Sidebar
        active={active}
        onNav={setActive}
        onLogout={() => setLoggedIn(false)}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
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