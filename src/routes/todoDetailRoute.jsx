// src/routes/todoDetailRoute.jsx
import axios from 'axios'
import TodoDetail from '@/components/TodoDetail'

export const todoDetailRoute = {
  path: '/todo/:id',
  component: TodoDetail,
  loader: async ({ params }) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
    return data
  }
}