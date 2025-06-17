import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export default function AddTodo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTodo = {
      title,
      completed,
      userId: 1, // required by JSONPlaceholder
    };

    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    if (res.ok) {
      navigate({ to: '/' }); // Go back to the list
    } else {
      alert('Failed to add todo');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}