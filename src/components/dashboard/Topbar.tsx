// src/components/dashboard/Topbar.tsx
'use client';

import { Bell, Home } from 'lucide-react';
import { NavItem } from './Sidebar';

interface TopbarProps {
  active: NavItem;
}

const titles: Record<NavItem, { heading: string; sub: string }> = {
  properties: { heading: 'My Properties',   sub: 'Manage your hospitality listings' },
  leads:      { heading: 'Lead Inquiries',  sub: 'Buyer & investor inquiries' },
};

export default function Topbar({ active }: TopbarProps) {
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
        <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-black/10 hover:bg-gray-50 transition">
          <Home className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
}