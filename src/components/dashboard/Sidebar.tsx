// src/components/dashboard/Sidebar.tsx
'use client';

import { LayoutGrid, MessageSquare, LogOut, ChevronRight } from 'lucide-react';

export type NavItem = 'properties' | 'leads';

interface SidebarProps {
  active: NavItem;
  onNav: (item: NavItem) => void;
  onLogout: () => void;
  open: boolean;
  onToggle: () => void;
  accountLabel?: string;
  accountEmail?: string;
}

const navItems = [
  { id: 'properties' as NavItem, label: 'Properties',     icon: LayoutGrid },
  { id: 'leads'      as NavItem, label: 'Lead Inquiries', icon: MessageSquare },
];

export default function Sidebar({
  active,
  onNav,
  onLogout,
  open,
  onToggle,
  accountLabel = 'Seller Account',
  accountEmail = 'seller@preleasehub.com',
}: SidebarProps) {
  return (
    <aside
      className={`shrink-0 ${open ? 'w-56' : 'w-16'} transition-all duration-300 bg-black text-white flex flex-col`}
    >
      {/* Logo / collapse toggle */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 shrink-0">
        {open && (
          <span className="text-sm font-black tracking-tight truncate">PrereleaseHub</span>
        )}
        <button
          onClick={onToggle}
          className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition ml-auto"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Seller info */}
      {open && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shrink-0">
              {accountLabel.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold leading-tight truncate">{accountLabel}</p>
              <p className="text-[10px] text-white/40 truncate">{accountEmail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${active === id
                ? 'bg-white text-black'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {open && <span className="truncate">{label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}