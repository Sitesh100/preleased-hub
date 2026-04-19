// src/components/dashboard/LeadsTab.tsx
'use client';

import { CalendarCheck2, RefreshCw, Users } from 'lucide-react';
import StatCard from './StatCard';
import Badge from './Badge';

const CONNECT_REQUESTS = [] as {
  id: number;
  property: string;
  type: string;
  status: string;
}[];

const INTERESTED_LEADS = [
  {
    id: 1,
    property: 'Pre-leased Boutique Resort, North Goa',
    leadType: 'lease_operator',
    budget: 'MG + Revenue Share',
    purpose: 'lease',
    timeline: '15 days',
    hasMeetingRequest: false,
    summary: 'Interested in taking over operations under a structured lease model.',
  },
];

export default function LeadsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Qualified Leads" value="1" sub="visible to seller" />
        <StatCard label="Meeting Requests" value="0" sub="no pending requests" />
        <StatCard label="Connect Requests" value="0" sub="no pending requests" />
        <StatCard label="Shared Contacts" value="0" sub="admin approval required" />
      </div>

      <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f8] text-[#111827]">
            <RefreshCw className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-black leading-tight">Connection &amp; Meeting Request Center</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track seller-raised connect requests after admin shares a lead summary.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-black/10 bg-[#fafafa] p-6 text-center text-sm text-gray-400">
          {CONNECT_REQUESTS.length === 0 ? 'No connect or meeting requests yet.' : 'Requests available'}
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f8] text-[#111827]">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-black leading-tight">Interested Leads Visible to Seller</h2>
            <p className="text-sm text-gray-500 mt-1">
              Seller sees qualified lead summary. Contact details remain hidden until admin approves connect.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {INTERESTED_LEADS.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-black/10 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-2xl font-black leading-tight text-black">{lead.property}</p>
                  <p className="mt-2 text-sm text-[#5b6b84]">
                    Lead type: {lead.leadType} • Budget: {lead.budget} • Purpose: {lead.purpose}
                  </p>
                  <p className="text-sm text-[#5b6b84] mt-1">
                    Timeline: {lead.timeline} • Meeting request: {lead.hasMeetingRequest ? 'Yes' : 'No'}
                  </p>
                  <p className="mt-2 text-sm text-[#5b6b84]">Summary: {lead.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge status="Shared" />
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-xs text-gray-500">
                      <CalendarCheck2 className="h-3.5 w-3.5" />
                      Contact hidden
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:pt-1">
                  <button className="h-10 rounded-xl bg-black px-4 text-xs font-bold text-white transition hover:bg-gray-800">
                    Request Connect
                  </button>
                  <button className="h-10 rounded-xl border border-black/10 px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50">
                    Request Meeting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}