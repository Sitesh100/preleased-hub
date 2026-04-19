// src/components/dashboard/PropertiesTab.tsx
'use client';

import { useState } from 'react';
import StatCard from './StatCard';
import Badge from './Badge';
import PropertyListingForm from '@/src/components/post-property/PropertyListingForm';

const PROPERTIES = [
  {
    id: 1,
    name: '31-Room Running Hotel',
    location: 'Vijay Nagar, Indore',
    price: '₹5 Lakh / month',
    status: 'Pending',
    type: 'Hotel',
    area: '18,500 sq ft',
    interested: 0,
  },
  {
    id: 2,
    name: 'Pre-leased Boutique Resort',
    location: 'North Goa',
    price: '₹8.5 Cr',
    status: 'Active',
    type: 'Resort',
    area: '22,000 sq ft',
    interested: 1,
  },
  {
    id: 3,
    name: 'Service Apartment Block',
    location: 'Dehradun',
    price: '₹3.2 Cr',
    status: 'Rejected',
    type: 'Service Apartment',
    area: '14,200 sq ft',
    interested: 0,
  },
];

export default function PropertiesTab() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Listings" value="3" sub="1 active" />
        <StatCard label="Active" value="1" sub="approved and live" />
        <StatCard label="Visible Interested Leads" value="1" sub="qualified by admin" />
        <StatCard label="Connect / Meeting Requests" value="0" sub="awaiting action" />
      </div>

      {/* Listings table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-black">My Listings</h2>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="h-9 px-4 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition"
          >
            {showForm ? 'Close Form' : '+ Add Listing'}
          </button>
        </div>

        {showForm && (
          <div className="mb-5 rounded-2xl border border-black/10 bg-white p-3 sm:p-5">
            <p className="mb-3 text-sm text-gray-500">
              Post a new property directly from dashboard using the same listing form used on website.
            </p>
            <PropertyListingForm submitLabel="Submit Listing For Review" className="rounded-2xl border border-[#d5dee9] bg-[#f5f6f8] p-4 shadow-none sm:p-5" />
          </div>
        )}

        <div className="border border-black/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-[#fafafa]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Area</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Interested</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {PROPERTIES.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-black text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.location}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-gray-600 text-xs">{p.type}</td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-600 text-xs">{p.area}</td>
                  <td className="px-5 py-4 font-bold text-black text-sm">{p.price}</td>
                  <td className="px-5 py-4"><Badge status={p.status} /></td>
                  <td className="px-5 py-4 hidden lg:table-cell text-xs text-gray-500">
                    {p.interested > 0 ? `${p.interested} lead visible` : 'No interested lead yet'}
                  </td>
                  <td className="px-5 py-4">
                    <button className="text-xs text-gray-400 hover:text-black transition font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}