import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
  categories: string[];
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'high', label: 'High', color: 'text-red-600' },
];

export default function AddTodoForm({ onAdd, categories }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('General');
  const [showOptions, setShowOptions] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const finalCategory = newCategory.trim() || category;
    onAdd(text, priority, finalCategory);
    setText('');
    setNewCategory('');
    setShowOptions(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowOptions(v => !v)}
            className="px-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
            title="Options"
          >
            <ChevronDown className={clsx('w-4 h-4 transition-transform', showOptions && 'rotate-180')} />
          </button>
          <button
            type="submit"
            className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors flex items-center gap-1 font-medium text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {showOptions && (
          <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
              <div className="flex gap-1">
                {PRIORITIES.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={clsx(
                      'flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all',
                      priority === p.value
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <div className="flex gap-1">
                <select
                  value={category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                  className="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={newCategory}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                placeholder="Or new category..."
                className="mt-1 w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 placeholder-gray-400"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
