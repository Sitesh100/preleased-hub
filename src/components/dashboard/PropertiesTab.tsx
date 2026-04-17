// src/components/dashboard/PropertiesTab.tsx
import StatCard from './StatCard';
import Badge from './Badge';

const PROPERTIES = [
  { id: 1, name: 'Sunrise Grand Hotel',   location: 'Connaught Place, Delhi',    price: '₹4.2 Cr', status: 'Active',  type: 'Hotel',     area: '3,400 sq ft' },
  { id: 2, name: 'The Palm Boutique',     location: 'Bandra West, Mumbai',        price: '₹7.8 Cr', status: 'Pending', type: 'Resort',    area: '5,200 sq ft' },
  { id: 3, name: 'Green Valley Inn',      location: 'Koregaon Park, Pune',        price: '₹2.9 Cr', status: 'Active',  type: 'Inn',       area: '2,100 sq ft' },
  { id: 4, name: 'Skyline Service Apts',  location: 'Whitefield, Bengaluru',      price: '₹3.5 Cr', status: 'Sold',    type: 'Apartment', area: '1,800 sq ft' },
];

export default function PropertiesTab() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Listings"    value="4"      sub="2 active" />
        <StatCard label="Total Value"       value="₹18.4Cr" sub="across all properties" />
        <StatCard label="Views This Month"  value="312"    sub="+18% vs last month" />
        <StatCard label="Inquiries"         value="9"      sub="3 unread" />
      </div>

      {/* Listings table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-black">My Listings</h2>
          <button className="h-9 px-4 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition">
            + Add Property
          </button>
        </div>

        <div className="border border-black/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-[#fafafa]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Area</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
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