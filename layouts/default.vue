<template>
  <div class="min-h-screen">
    <header class="shadow-sm bg-white dark:bg-slate-800">

    </header>
    <main class="container mx-auto p-4">
      <Navbar />
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

<style scoped>
</style>