import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default function TodoList() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return res.data.slice(0, 30); // demo limit
    }
  });

  // Mutations
  const addTodoMutation = useMutation({
    mutationFn: async (title) => {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
        userId: 1,
      });
      return res.data;
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (old = []) => [
        ...old,
        { ...newTodo, id: Date.now() },
      ]);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['todos'], (old) => old.filter((t) => t.id !== deletedId));
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: async ({ id, title }) => {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title });
      return res.data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['todos'], (old) =>
        old.map((t) => (t.id === updated.id ? updated : t))
      );
    },
  });

  const markCompletedMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !completed,
      });
      return res.data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['todos'], (old) =>
        old.map((t) => (t.id === updated.id ? { ...t, completed: updated.completed } : t))
      );
    },
  });

  // Filters
  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? todo.completed
        : !todo.completed;
    return matchSearch && matchFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  // Handlers
  const handleAddTodo = (title) => addTodoMutation.mutate(title);
  const handleDelete = (id) => deleteTodoMutation.mutate(id);
  const handleEdit = (id, title) => editTodoMutation.mutate({ id, title });
  const handleMarkCompleted = (id, completed) =>
    markCompletedMutation.mutate({ id, completed });

  // UI
  if (isLoading) return <p role="status">Loading todos...</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;

  return (
    <main role="main" className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-4" tabIndex="0"></h1>

        <div className="flex flex-col md:flex-row gap-2" aria-label="Search and filter todos">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search todos by title"
            placeholder="Search todos..."
            className="border px-3 py-2 rounded w-full md:w-auto"
          />
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by completion status"
            className="border px-3 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </header>

      <section aria-labelledby="todo-form-section" className="mb-6">
        <h2 id="todo-form-section" className="sr-only"></h2>
        <TodoForm onAdd={handleAddTodo} />
      </section>

      <section aria-labelledby="todo-list-section">
        <h2 id="todo-list-section" className="sr-only">Todo Items</h2>

        {filteredTodos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <>
            <ul className="space-y-4" role="list">
              {paginatedTodos.map((todo) => (
                <li key={todo.id} role="listitem">
                  <TodoItem
                    todo={todo}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onMarkCompleted={(id) => handleMarkCompleted(id, todo.completed)}
                  />
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="mt-6 flex flex-wrap justify-center sm:justify-between items-center gap-4 text-sm"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                ⬅ Prev
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Next ➡
              </button>
            </nav>
          </>
        )}
      </section>
    </main>
  );
}
