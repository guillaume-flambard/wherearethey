<template>
  <div>
    <header class="shadow-sm bg-white dark:bg-slate-800">
      <nav class="container mx-auto p-4">
        <NuxtLink to="/">Where Are They</NuxtLink>
      </nav>
    </header>
    <div class="container mx-auto p-4">
      <slot />
    </div>

    <footer class="container mx-auto p-4 flex justify-between border-t-2">
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        </li>
        <li>
          <NuxtLink class="btn" to="/cases">Cases</NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped></style>
