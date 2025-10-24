<template>
  <div class="max-w-3xl mx-auto p-4">
    <TodoList />
  </div>
</template>

<script lang="ts">
import TodoList from "../components/TodoList.vue";

export default {
  name: "Home",
  components: {
    TodoList,
  },
};
</script>

<style scoped>
/* Add any page-specific styles here */
</style>