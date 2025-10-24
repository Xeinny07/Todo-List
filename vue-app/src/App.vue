<template>
  <div id="app" class="min-h-screen bg-[#fef3c7] flex justify-center items-start py-10">
    <div class="bg-black text-white w-full max-w-xl md:max-w-3xl p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>