'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import TodoList from "@/src/components/TodoList";

export default function HomePage() {
  const { data: session } = useSession();

  // If user is not logged in
  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>You’re not signed in 😢</h2>
        <Link href="/login">Go to Login</Link>
      </div>
    );
  }

  // If logged in, show todos
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {session.user?.email}! 🎉</h2>
      <button
        onClick={() => signOut()}
        style={{
          marginTop: "20px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Sign Out
      </button>

      <div style={{ marginTop: "50px" }}>
        <TodoList />
      </div>
    </main>
  );
}