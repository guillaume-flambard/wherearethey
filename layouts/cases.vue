<template>
  <div>
    <header class="shadow-sm bg-white dark:bg-slate-800">
      <nav class="container mx-auto p-4">
        <NuxtLink to="/">👽 Where Are They</NuxtLink>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />

    </main>

    <footer
      class="mx-auto py-4 px-10 flex justify-between border-t-2 fixed z-50 bottom-0 inset-x-0 backdrop-blur-lg dark:bg-slate-800 bg-white shadow-sm opacity-95">
      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/map">Map</NuxtLink>
        </li>
        <li>
          <NuxtLink class="btn" to="/cases">Cases</NuxtLink>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #12b488;
}
</style>
