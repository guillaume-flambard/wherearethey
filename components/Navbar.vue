<template>
  <nav class="mx-auto p-4 flex justify-between items-center h-20 fixed z-[999] w-full top-0">
    <NuxtLink to="/" class="font-bold">👽 Where Are They</NuxtLink>
    <ul class="flex gap-4">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/map">Map</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/cases" class="btn">Cases</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
li>.router-link-active {
  color: #12b488;
}
</style>