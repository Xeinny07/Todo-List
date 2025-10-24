import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET - fetch all todos
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

// POST - create a new todo
export async function POST(request: Request) {
  const { title } = await request.json();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const newTodo = await prisma.todo.create({
    data: { title },
  });

  return NextResponse.json(newTodo, { status: 201 });
}
