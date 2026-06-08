type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
};

export default function StatsBar({ total, active, completed }: StatsBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4">
          <span className="text-sm text-gray-500"><span className="font-semibold text-gray-800">{total}</span> total</span>
          <span className="text-sm text-gray-500"><span className="font-semibold text-indigo-600">{active}</span> active</span>
          <span className="text-sm text-gray-500"><span className="font-semibold text-green-600">{completed}</span> done</span>
        </div>
        <span className="text-sm font-semibold text-indigo-600">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
