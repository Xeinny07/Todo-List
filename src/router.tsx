import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
} from '@tanstack/react-router'

import App from './App'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorTest from './components/ErrorTest'

// 1. Root layout
const rootRoute = new RootRoute({
  component: App,
  errorComponent: ErrorBoundary
})

// 2. Routes
const todoListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TodoList,
})


const todoFormRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/todos/add',
  component: TodoForm,
})


const errorTestRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/error-test',
  component: ErrorTest,
})

//  Route tree
const routeTree = rootRoute.addChildren([
  todoListRoute,
  todoFormRoute,
  errorTestRoute,
])

export const router = new Router({
  routeTree,
  defaultNotFoundComponent: NotFound,

})


export function AppRouterProvider() {
  return <RouterProvider router={router} />
}