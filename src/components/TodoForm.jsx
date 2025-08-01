import { useState, useRef, useEffect } from 'react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle);

    setTitle('');
    inputRef.current?.focus();  
  };

  return (
    <section
      className="mb-6"
      aria-labelledby="add-todo-heading"
    >
      <h2 id="add-todo-heading" className="text-xl font-semibold mb-3">
        Add New Todo
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 items-stretch"
        role="form"
        aria-label="Add a new todo"
      >
        <label htmlFor="todo-title" className="sr-only">
          Todo title :
        </label>
        <input
          type="text"
          id="todo-title"
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className=" bg-white text-black flex-grow border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700"
          aria-required="true"
          aria-describedby="todo-title-helper"
        />

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Add todo"
        >
          Add
        </button>
      </form>

      {/* Helper text for the input field */}
      <p id="todo-title-helper" className=" text-white">
        Enter a new todo title and click Add to create a new todo item.
      </p>
    </section>
  );
}
