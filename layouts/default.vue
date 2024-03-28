<template>
  <div>
    <header>
      <nav class="space-y-5">
        <NuxtLink to="/">Where Are They</NuxtLink>
        <ul class="space-y-1">
          <li><NuxtLink class="active:bg-slate-500" to="/">Home</NuxtLink></li>
          <li>
            <NuxtLink class="active:bg-slate-500" to="/dashboard"
              >Dashboard</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="active:bg-slate-500" to="/cases">Cases</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #12b488;
}
</style>
