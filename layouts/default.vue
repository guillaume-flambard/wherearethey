<template>
  <div class="min-h-screen">
    <header class="shadow-sm bg-white dark:bg-slate-800">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Where Are They</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cases" class="btn">Cases</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<style scoped>
li > .router-link-active {
  color: #12b488;
}

.btn {
  @apply bg-[#12b488] text-white font-bold py-2 px-3 rounded-lg shadow-sm;
}
</style>
