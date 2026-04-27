// src/components/dashboard/Topbar.tsx
'use client';

import { Bell, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NavItem } from './Sidebar';
import { useViewPropertyQuery } from '@/src/redux/features/property/propertyApi';

interface TopbarProps {
  active: NavItem;
}

function getPropertyCount(payload: unknown) {
  const root = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : null;
  const data = root && 'data' in root ? root.data : payload;
  return Array.isArray(data) ? data.length : 0;
}

export default function Topbar({ active }: TopbarProps) {
  const router = useRouter();
  const { data, isFetching } = useViewPropertyQuery();
  const listingCount = getPropertyCount(data);
  const titles: Record<NavItem, { heading: string; sub: string }> = {
    properties: {
      heading: 'My Properties',
      sub: isFetching
        ? 'Loading your hospitality listings...'
        : `Manage your hospitality listings (${listingCount})`,
    },
    leads: { heading: 'Lead Inquiries', sub: 'Buyer & investor inquiries' },
  };
  const { heading, sub } = titles[active];

  return (
    <header className="h-16 bg-white border-b border-black/10 px-6 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-lg font-black text-black leading-tight">{heading}</h1>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-black/10 hover:bg-gray-50 transition relative">
          <Bell className="h-4 w-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-black rounded-full" />
        </button>

        {/* Home shortcut */}
        <button
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-black/10 hover:bg-gray-50 transition"
          onClick={() => router.push('/')}
        >
          <Home className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
