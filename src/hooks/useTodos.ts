import { useState, useEffect } from 'react';
import { Todo, Priority, Filter } from '@/types';

const STORAGE_KEY = 'todo-app-todos';

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch (e: any) {
    console.error('Failed to load todos:', e.message);
  }
  return [];
}

function saveToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e: any) {
    console.error('Failed to save todos:', e.message);
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos(prev => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  }

  function deleteTodo(id: string): void {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  function editTodo(id: string, newText: string): void {
    if (!newText.trim()) return;
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, text: newText.trim() } : todo)
    );
  }

  function clearCompleted(): void {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function reorderTodo(fromIndex: number, toIndex: number): void {
    setTodos(prev => {
      const filtered = getFilteredTodos(prev);
      const updated = [...prev];
      const fromTodo = filtered[fromIndex];
      const toTodo = filtered[toIndex];
      const fromIdx = updated.findIndex(t => t.id === fromTodo.id);
      const toIdx = updated.findIndex(t => t.id === toTodo.id);
      updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, fromTodo);
      return updated;
    });
  }

  function getFilteredTodos(allTodos: Todo[]): Todo[] {
    return allTodos
      .filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      })
      .filter(todo => {
        if (categoryFilter !== 'all') return todo.category === categoryFilter;
        return true;
      })
      .filter(todo => {
        if (search.trim()) return todo.text.toLowerCase().includes(search.toLowerCase());
        return true;
      });
  }

  const filteredTodos = getFilteredTodos(todos);
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  const categories = ['General', ...Array.from(new Set(todos.map(t => t.category).filter(c => c !== 'General')))];

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodo,
  };
}
