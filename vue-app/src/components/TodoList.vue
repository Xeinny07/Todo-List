<template>
  <main class="max-w-3xl mx-auto p-4">
    <header class="mb-6">
      <h1 class="text-2xl font-bold mb-4"></h1>

      <div class="flex flex-col md:flex-row gap-2" aria-label="Search and filter todos">
        <input
          type="text"
          v-model="searchTerm"
          @input="currentPage = 1"
          placeholder="Search todos..."
          class="text-black border px-3 py-2 rounded w-full md:w-auto"
        />
        <select
          v-model="filterStatus"
          @change="currentPage = 1"
          class="bg-white text-black border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </header>

    <section aria-labelledby="todo-form-section" class="mb-6">
      <TodoForm @add="handleAddTodo" />
    </section>

    <section aria-labelledby="todo-list-section">
      <h2 id="todo-list-section" class="sr-only">Todo Items</h2>

      <p v-if="filteredTodos.length === 0">No todos found.</p>

      <ul v-else class="space-y-4" role="list">
        <li v-for="todo in paginatedTodos" :key="todo.id" role="listitem">
          <TodoItem
            :todo="todo"
            @delete="handleDelete"
            @edit="handleEdit"
            @markCompleted="() => handleMarkCompleted(todo.id, todo.completed)"
          />
        </li>
      </ul>

      <nav
        v-if="filteredTodos.length > 0"
        aria-label="Pagination"
        class="mt-6 flex flex-wrap justify-center sm:justify-between items-center gap-4 text-sm"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded text-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ⬅ Prev
        </button>
        <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded text-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Next ➡
        </button>
      </nav>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import TodoForm from "./TodoForm.vue";
import TodoItem from "./TodoItem.vue";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const todos = ref<Todo[]>([]);
const searchTerm = ref("");
const filterStatus = ref<"all" | "completed" | "incomplete">("all");
const currentPage = ref(1);
const todosPerPage = 5;

// Fetch Todos
const fetchTodos = async () => {
  const res = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
  todos.value = res.data.slice(0, 10);
};

onMounted(fetchTodos);

// Computed for filters
const filteredTodos = computed(() =>
  todos.value.filter((todo) => {
    const matchSearch = todo.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchFilter =
      filterStatus.value === "all"
        ? true
        : filterStatus.value === "completed"
        ? todo.completed
        : !todo.completed;
    return matchSearch && matchFilter;
  })
);

// Pagination
const totalPages = computed(() => Math.ceil(filteredTodos.value.length / todosPerPage));
const paginatedTodos = computed(() =>
  filteredTodos.value.slice(
    (currentPage.value - 1) * todosPerPage,
    currentPage.value * todosPerPage
  )
);

// Handlers
const handleAddTodo = async (title: string) => {
  const newTodo = { title, completed: false, userId: 1 };
  const res = await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  todos.value.unshift(res.data);
  alert("✅ New todo added!");
};

const handleDelete = async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  todos.value = todos.value.filter((t) => t.id !== id);
};

const handleEdit = async (payload: {id: number, newTitle: string}) => {
  const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, { 
    title: payload.newTitle,
   });
  todos.value = todos.value.map((t) => (t.id === payload.id ? res.data : t));
};

const handleMarkCompleted = async (id: number, completed: boolean) => {
  const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    completed: !completed,
  });
  todos.value = todos.value.map((t) =>
    t.id === id ? { ...t, completed: res.data.completed } : t
  );
};

const prevPage = () => (currentPage.value = Math.max(currentPage.value - 1, 1));
const nextPage = () => (currentPage.value = Math.min(currentPage.value + 1, totalPages.value));
</script>