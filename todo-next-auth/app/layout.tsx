'use client';

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <main className="w-full max-w-3xl bg-black text-white rounded-lg p-6 shadow-xl">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
                  Todo App
                </h1>
              </div>

              {children}
            </main>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}