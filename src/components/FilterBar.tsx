import clsx from 'clsx';
import { Filter } from '@/types';
import { Trash2 } from 'lucide-react';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  categories: string[];
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 flex flex-wrap items-center gap-3">
      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              filter === f.value
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center gap-2 min-w-0">
        <div className="flex gap-1 flex-wrap">
          {['all', ...categories].map(c => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={clsx(
                'px-2.5 py-1 rounded-full text-xs font-medium border transition-all',
                categoryFilter === c
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              )}
            >
              {c === 'all' ? 'All categories' : c}
            </button>
          ))}
        </div>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear done
        </button>
      )}
    </div>
  );
}
