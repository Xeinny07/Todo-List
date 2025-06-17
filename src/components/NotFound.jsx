export default function NotFound() {
  return (
    <main className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg mt-2">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-4 text-blue-500 underline">
         Go back home
      </a>
    </main>
  );
} 