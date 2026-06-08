import { useState } from 'react';
import { Trash2, Pencil, Check, X, Flag } from 'lucide-react';
import clsx from 'clsx';
import { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

const PRIORITY_BG: Record<Priority, string> = {
  low: 'bg-green-50 border-green-100',
  medium: 'bg-yellow-50 border-yellow-100',
  high: 'bg-red-50 border-red-100',
};

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <div
      className={clsx(
        'group bg-white rounded-2xl border shadow-sm px-4 py-3 flex items-center gap-3 transition-all hover:shadow-md',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-gray-800 border-b border-indigo-400 focus:outline-none bg-transparent py-0.5"
          />
        ) : (
          <p
            className={clsx(
              'text-sm font-medium truncate',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            )}
          >
            {todo.text}
          </p>
        )}
        <div className="flex items-center gap-2 mt-0.5">
          <span className={clsx('text-xs px-1.5 py-0.5 rounded font-medium border', PRIORITY_BG[todo.priority])}>
            <Flag className={clsx('w-2.5 h-2.5 inline mr-0.5', PRIORITY_STYLES[todo.priority])} />
            {todo.priority}
          </span>
          <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{todo.category}</span>
          <span className="text-xs text-gray-400">{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-500 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
