<template>
  <section class="mb-6" aria-labelledby="add-todo-heading">
    <h2 id="add-todo-heading" class="text-xl font-semibold mb-3">
      Add New Todo
    </h2>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col sm:flex-row gap-3 items-stretch"
      role="form"
      aria-label="Add a new todo"
    >
      <label for="todo-title" class="sr-only">Todo title :</label>
      <input
        type="text"
        id="todo-title"
        ref="inputRef"
        v-model="title"
        placeholder="Enter todo title"
        class="bg-white text-black flex border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-700"
        aria-required="true"
        aria-describedby="todo-title-helper"
      />

      <button
        type="submit"
        class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Add todo"
      >
        Add
      </button>
    </form>

    <p id="todo-title-helper" class="text-white">
      Enter a new todo title and click Add to create a new todo item.
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  onAdd: (title: string) => void;
}>();

const title = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus();
});

const handleSubmit = () => {
  const trimmedTitle = title.value.trim();
  if (!trimmedTitle) return;

  props.onAdd(trimmedTitle);

  title.value = "";
  inputRef.value?.focus();
};
</script>