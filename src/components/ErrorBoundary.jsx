export default function ErrorBoundary({ error }) {
  return (
    <div className="p-4 text-red-700">
      <h2 className="text-xl sm:text-2xl font-bold">Something went wrong!</h2>
      <p className="text-sm sm:text-base">{error.message || 'An unexpected error occurred.'}</p>
    </div>
  );
}
