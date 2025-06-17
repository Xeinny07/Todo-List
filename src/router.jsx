import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
} from '@tanstack/react-router'

import App from './App'
import TodoList from './components/TodoList'
import TodoDetail from './components/TodoDetail'
import AddTodo from './components/AddTodo'
import EditTodo from './components/EditTodo'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorTest from './components/ErrorTest'

// 1. Root layout
const rootRoute = new RootRoute({
  component: App,
})

// 2. Routes
const todoListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TodoList,
})

const todoDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/todos/$id',
  component: TodoDetail,
})

const addTodoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/todos/add',
  component: AddTodo,
})

const editTodoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/todos/$todoid/edit',
  component: EditTodo,
})

const errorBoundaryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/error-boundary-test',
  component: ErrorBoundary,
})

const errorTestRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/error-test',
  component: ErrorTest,
})

//  Route tree
const routeTree = rootRoute.addChildren([
  todoListRoute,
  todoDetailRoute,
  addTodoRoute,
  editTodoRoute,
  errorBoundaryRoute,
  errorTestRoute,
])

export const router = new Router({
  routeTree,
  defaultNotFoundComponent: NotFound,

})

// 5. Provide router in main.jsx
export function AppRouterProvider() {
  return <RouterProvider router={router} />
}