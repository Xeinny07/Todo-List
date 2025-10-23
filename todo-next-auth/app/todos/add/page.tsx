'use client';

import { useState } from "react";
import axios from "axios";
import TodoForm from "@/src/components/TodoForm";

export default function AddTodoPage() {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (title: string) => {
    try {
      setLoading(true);
      await axios.post("/api/todos", { title }); // You’ll create this API route later
      alert("Todo added successfully!");
    } catch (error) {
      console.error("Failed to add todo:", error);
      alert("Error adding todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a New Todo</h1>
      <TodoForm onAdd={handleAdd} />
      {loading && <p className="mt-3 text-sm text-gray-500">Adding todo...</p>}
    </main>
  );
}
