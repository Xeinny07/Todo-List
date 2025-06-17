import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          Todo App
        </h1>
      </div>

      {/* The Outlet is where the nested route content will be injected */}
      <Outlet />
    </main>
  );
}
