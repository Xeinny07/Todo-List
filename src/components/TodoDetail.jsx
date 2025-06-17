import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link } from '@tanstack/react-router'

export default function TodoDetail() {
  // Get the id from the URL
  const { id } = useParams({ from: '/todos/$id' })

  // Fetch the todo by ID
  const { data: todo, isLoading, isError, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => res.data),
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Todo Details</h2>
      <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Status:</strong> {todo.completed ? '✅ Completed' : '❌ Not Completed'}</p>

      {/* 🔙 Back to Todo List link */}
      <Link to="/" className="mt-4 inline-block text-blue-600 underline">
        ← Back to Todo List
      </Link>
    </div>
  )
}