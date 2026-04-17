// src/components/dashboard/LeadsTab.tsx
'use client';

import { Search } from 'lucide-react';
import StatCard from './StatCard';
import Badge from './Badge';

const LEADS = [
  { id: 1, name: 'Rahul Mehta',   email: 'rahul.mehta@gmail.com', property: 'Sunrise Grand Hotel', date: '14 Apr 2026', status: 'New',       message: 'Interested in site visit this weekend.' },
  { id: 2, name: 'Priya Sharma',  email: 'priya.s@outlook.com',   property: 'The Palm Boutique',   date: '12 Apr 2026', status: 'Contacted', message: 'Can you share the floor plan and financials?' },
  { id: 3, name: 'Amit Joshi',    email: 'amitj@invest.co',       property: 'Green Valley Inn',    date: '10 Apr 2026', status: 'New',       message: 'What is the current occupancy rate?' },
  { id: 4, name: 'Sonal Kapoor',  email: 'sonal.k@ventures.in',   property: 'Sunrise Grand Hotel', date: '08 Apr 2026', status: 'Closed',    message: 'Thank you, we will proceed with the deal.' },
];

export default function LeadsTab() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads"  value="4" sub="this quarter" />
        <StatCard label="New"          value="2" sub="awaiting response" />
        <StatCard label="Contacted"    value="1" sub="follow-up pending" />
        <StatCard label="Closed"       value="1" sub="deal finalised" />
      </div>

      {/* Lead cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-black">Lead Inquiries</h2>

          <div className="flex items-center gap-2 h-9 border border-black/15 rounded-xl px-3 bg-white w-48">
            <Search className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            <input
              placeholder="Search leads…"
              className="outline-none bg-transparent text-xs text-black placeholder:text-gray-400 w-full"
            />
          </div>
        </div>

        <div className="space-y-3">
          {LEADS.map((lead) => (
            <div
              key={lead.id}
              className="border border-black/10 rounded-2xl p-5 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Avatar + details */}
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {lead.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-black text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-400">{lead.email}</p>
                    <p className="text-xs text-gray-500 mt-2 italic">"{lead.message}"</p>
                  </div>
                </div>

                {/* Badge + date */}
                <div className="text-right flex-shrink-0 space-y-1.5">
                  <Badge status={lead.status} />
                  <p className="text-[10px] text-gray-400 block">{lead.date}</p>
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Re: <span className="font-semibold text-black">{lead.property}</span>
                </p>
                <button className="text-xs font-semibold text-black underline underline-offset-2 hover:no-underline transition">
                  Reply →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}