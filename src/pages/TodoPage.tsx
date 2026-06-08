import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import SearchBar from '@/components/SearchBar';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const todoHook = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">My Todos</h1>
            <p className="text-sm text-gray-500">Stay organized, get things done</p>
          </div>
        </div>

        {/* Add Todo */}
        <div className="mb-4">
          <AddTodoForm
            onAdd={todoHook.addTodo}
            categories={todoHook.categories}
          />
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar search={todoHook.search} setSearch={todoHook.setSearch} />
        </div>

        {/* Stats */}
        <div className="mb-4">
          <StatsBar
            total={todoHook.allTodos.length}
            active={todoHook.activeCount}
            completed={todoHook.completedCount}
          />
        </div>

        {/* Filter */}
        <div className="mb-4">
          <FilterBar
            filter={todoHook.filter}
            setFilter={todoHook.setFilter}
            categoryFilter={todoHook.categoryFilter}
            setCategoryFilter={todoHook.setCategoryFilter}
            categories={todoHook.categories}
            onClearCompleted={todoHook.clearCompleted}
            completedCount={todoHook.completedCount}
          />
        </div>

        {/* Todo List */}
        <TodoList
          todos={todoHook.todos}
          onToggle={todoHook.toggleTodo}
          onDelete={todoHook.deleteTodo}
          onEdit={todoHook.editTodo}
        />
      </div>
    </div>
  );
}
