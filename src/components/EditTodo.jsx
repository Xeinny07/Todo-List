import { useNavigate, useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';

export default function EditTodo() {
  const navigate = useNavigate();
  const todo = useLoaderData();

  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTodo = {
      ...todo,
      title,
      completed,
    };

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    if (res.ok) {
      navigate({ to: `/todo/${todo.id}` }); // Navigate to the detail page
    } else {
      alert('Failed to update todo');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Completed
        </label>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loading ? 'Saving...' : 'Update Todo'}
        </button>
      </form>
    </div>
  );
}