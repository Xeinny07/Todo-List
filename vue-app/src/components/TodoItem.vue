<template>
  <article
    class="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 border-l-4 border-white-500 focus-within:ring-2 focus-within:ring-yellow-300"
    tabindex="0"
    :aria-labelledby="'todo-' + todo.id"
  >
    <div class="flex items-center justify-between">
      <h2
        :id="'todo-' + todo.id"
        :class="['text-lg font-semibold', todo.completed ? 'text-black line-through' : 'text-black']"
      >
        {{ todo.title }}
      </h2>s
      <span
        class="px-3 py-1 rounded text-sm font-medium bg-yellow-800 text-white"
        :aria-label="`todo status: ${todo.completed ? 'Completed' : 'Not completed'}`"
      >
        {{ todo.completed ? '✅ Completed' : '❌ Not Completed' }}
      </span>
    </div>

    <div class="flex flex-wrap gap-3 mt-3" aria-label="Todo actions">
      <button
        @click="$emit('markCompleted', todo.id)"
        class="bg-yellow-800 text-white px-3 py-1 rounded hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        :aria-label="todo.completed ? 'Mark as incomplete' : 'Mark as complete'"
      >
        Mark as {{ todo.completed ? 'Incomplete' : 'Complete' }}
      </button>

      <button
        @click="showEditModal = true"
        class="px-3 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Edit
      </button>

      <button
        @click="showDeleteModal = true"
        class="px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Delete
      </button>

      <button
        @click="showViewModal = true"
        class="px-3 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        View
      </button>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div class="bg-white p-6 rounded shadow text-center max-w-md w-full">
        <h2 class="text-xl font-bold mb-2">{{ todo.title }}</h2>
        <p class="bg-white text-black mb-4">Status: {{ todo.completed ? '✅ Completed' : '❌ Not Completed' }}</p>
        <button @click="showViewModal = false" class="bg-yellow-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300">
          Close
        </button>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div class="bg-white p-6 rounded shadow text-center">
        <p class="mb-4 bg-white text-black">Are you sure you want to delete this todo?</p>
        <div class="flex justify-center gap-4">
          <button
            @click="confirmDelete"
            class="bg-yellow-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Yes, Delete
          </button>
          <button
            @click="showDeleteModal = false"
            class="bg-orange-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20">
      <div class="bg-white text-black p-6 rounded shadow max-w-md w-full text-center">
        <h2 class="text-lg font-bold mb-2">Edit Todo</h2>
        <label for="edit-title" class="sr-only">Edit title</label>
        <input
          id="edit-title"
          v-model="editedTitle"
          class="border px-3 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <div class="flex justify-center gap-4">
          <button @click="confirmEdit" class="bg-yellow-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Save
          </button>
          <button @click="showEditModal = false" class="bg-orange-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  todo: { id: number; title: string; completed: boolean };
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", payload: { id: number; newTitle: string }): void;
  (e: "markCompleted", id: number): void;
}>();

const showDeleteModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const editedTitle = ref(props.todo.title);

const confirmDelete = () => {
  emit("delete", props.todo.id);
  showDeleteModal.value = false;
};

const confirmEdit = () => {
  emit("edit", { id: props.todo.id, newTitle: editedTitle. value});
  showEditModal.value = false;
};
</script>