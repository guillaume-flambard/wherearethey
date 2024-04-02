<template>
  <div class="min-h-screen">
    <header class="shadow-sm bg-white dark:bg-slate-800">
      <Navbar />
    </header>
    <main class="container mx-auto p-4 mt-20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
watch(
  () => route.path,
  () => location.reload(),
);
</script>

<style></style>