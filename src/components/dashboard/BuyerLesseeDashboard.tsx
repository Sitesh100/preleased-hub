'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, LayoutGrid, LogOut, Search, FileText } from 'lucide-react';
import Badge from '@/src/components/dashboard/Badge';
import {
  clearDashboardSession,
  DashboardRole,
  DashboardSession,
  getDashboardSession,
  roleLabel,
} from '@/src/lib/dashboard-auth';

interface BuyerLesseeDashboardProps {
  role: Extract<DashboardRole, 'buyer' | 'lessee'>;
}

type BuyerNav = 'dashboard' | 'requests';

const ACTIVE_PROPERTIES = [
  {
    id: 'p-1',
    title: 'Pre-leased Boutique Resort, North Goa',
    location: 'Goa',
    category: 'Resort',
    model: 'Investment',
    demand: '₹8.5 Cr',
    status: 'Active',
    note: 'Seller contact hidden. Raise verified interest to continue.',
  },
];

const SUBMITTED_REQUESTS = [
  {
    id: 'r-1',
    title: 'Pre-leased Boutique Resort, North Goa',
    role: 'investor',
    budget: '₹7 Cr - ₹9 Cr',
    purpose: 'invest',
    status: 'Submitted',
    contactState: 'Contact hidden',
  },
  {
    id: 'r-2',
    title: 'Pre-leased Boutique Resort, North Goa',
    role: 'lease_operator',
    budget: 'MG + Revenue Share',
    purpose: 'lease',
    status: 'Shared',
    contactState: 'Contact hidden',
  },
];

export default function BuyerLesseeDashboard({ role }: BuyerLesseeDashboardProps) {
  const router = useRouter();
  const [session, setSession] = useState<DashboardSession | null>(null);
  const [active, setActive] = useState<BuyerNav>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const found = getDashboardSession();

    if (!found || found.role !== role) {
      router.replace('/dashboard');
      return;
    }

    setSession(found);
  }, [role, router]);

  const roleTitle = roleLabel(role);
  const roleSpecificText = useMemo(() => {
    if (role === 'buyer') {
      return 'Browse active listings, raise interest, request meetings, and track investment inquiry progress.';
    }

    return 'Browse active listings, raise lease interest, request meetings, and track operator inquiry progress.';
  }, [role]);

  if (!session || session.role !== role) {
    return null;
  }

  function handleLogout() {
    clearDashboardSession();
    setSession(null);
  }

  const screenTitle = active === 'dashboard' ? `${roleTitle} Dashboard` : 'My Submitted Requests';
  const screenSub =
    active === 'dashboard'
      ? roleSpecificText
      : 'Track inquiry status after raising interest from website property pages.';

  return (
    <div className="h-full flex bg-[#f7f7f7]">
      <aside
        className={`shrink-0 ${sidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 bg-black text-white flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 shrink-0">
          {sidebarOpen && <span className="text-sm font-black tracking-tight truncate">PrereleaseHub</span>}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition ml-auto"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-black shrink-0">
                {roleTitle.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold leading-tight truncate">{roleTitle} Account</p>
                <p className="text-[10px] text-white/40 truncate">{session.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 py-3 space-y-0.5 px-2">
          <button
            onClick={() => setActive('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === 'dashboard'
                ? 'bg-white text-black'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="truncate">Dashboard</span>}
          </button>

          <button
            onClick={() => setActive('requests')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === 'requests'
                ? 'bg-white text-black'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="truncate">My Requests</span>}
          </button>
        </nav>

        <div className="px-2 pb-4 border-t border-white/10 pt-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-black text-black leading-tight">{screenTitle}</h1>
                <p className="mt-2 text-sm text-[#5b6b84]">{screenSub}</p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/listings"
                  className="inline-flex h-10 items-center rounded-xl border border-black/10 px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Explore Listings
                </Link>
              </div>
            </div>
          </div>

          {active === 'dashboard' && (
            <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
              <h2 className="text-2xl font-black text-black leading-tight">{roleTitle} / Lease User View</h2>
              <p className="mt-1 text-sm text-[#5b6b84]">
                {role === 'buyer'
                  ? 'View active properties and submit buyer requests through controlled workflow.'
                  : 'View active properties and submit lessee requests through controlled workflow.'}
              </p>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-black/10 bg-[#fafafa] px-3 h-11">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  placeholder="Search city, asset type, or title"
                  className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {ACTIVE_PROPERTIES.map((property) => (
                  <article key={property.id} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black leading-tight text-black">{property.title}</h3>
                        <p className="mt-1 text-sm text-[#5b6b84]">
                          {property.location} • {property.category} • {property.model}
                        </p>
                      </div>
                      <Badge status={property.status} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-black">Demand: {property.demand}</p>
                    <p className="mt-3 rounded-xl bg-[#f2f4f8] px-3 py-2 text-sm text-[#5b6b84]">{property.note}</p>

                    <div className="mt-3 flex gap-2">
                      <button className="h-10 rounded-xl bg-black px-4 text-xs font-bold text-white transition hover:bg-gray-800">
                        Raise Interest
                      </button>
                      <button className="h-10 rounded-xl border border-black/10 px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50">
                        Request Meeting
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {active === 'requests' && (
            <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
              <h2 className="text-2xl font-black text-black leading-tight">My Submitted Requests</h2>
              <p className="mt-1 text-sm text-[#5b6b84]">
                Track inquiry status after raising interest from website property pages.
              </p>

              <div className="mt-4 space-y-3">
                {SUBMITTED_REQUESTS.map((request) => (
                  <article key={request.id} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black leading-tight text-black">{request.title}</h3>
                        <p className="mt-1 text-sm text-[#5b6b84]">
                          Role: {request.role} • Budget: {request.budget} • Purpose: {request.purpose}
                        </p>
                        <p className="mt-1 text-sm text-[#5b6b84]">Admin-controlled progress for this request.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge status={request.status} />
                        <span className="inline-flex rounded-full border border-black/10 px-3 py-1 text-xs text-gray-500">
                          {request.contactState}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
