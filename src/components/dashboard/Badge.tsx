// src/components/dashboard/Badge.tsx

interface BadgeProps {
  status: string;
}

export default function Badge({ status }: BadgeProps) {
  const map: Record<string, string> = {
    Active:    'bg-black text-white',
    Pending:   'bg-gray-200 text-gray-700',
    Sold:      'bg-gray-100 text-gray-400 line-through',
    Rejected:  'bg-red-50 text-red-600',
    New:       'bg-black text-white',
    Contacted: 'bg-gray-200 text-gray-700',
    Closed:    'bg-gray-100 text-gray-400',
    Shared:    'bg-[#dff7ff] text-[#1d6b86]',
    Submitted: 'bg-[#e7ecff] text-[#2f56c8]',
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
        map[status] ?? 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}