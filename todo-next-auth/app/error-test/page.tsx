// app/error-test/page.tsx
'use client';

import ErrorTest from "@/src/components/ErrorTest";

export default function ErrorTestPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Error Test Page</h1>
      <ErrorTest />
    </main>
  );
}