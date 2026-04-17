// src/components/dashboard/StatCard.tsx

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="border border-black/10 rounded-2xl p-5 bg-white hover:shadow-md transition-shadow">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-black leading-none">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}