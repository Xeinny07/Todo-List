<template>
  <main class="h-screen flex flex-col justify-center items-center text-center">
    <h1 class="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
    <p class="text-lg mt-2">The page you're looking for doesn't exist.</p>
    <router-link to="/" class="mt-4 text-blue-500 underline">
      Go back home
    </router-link>
  </main>
</template>

<script lang="ts">
export default {
  name: "NotFound",
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>