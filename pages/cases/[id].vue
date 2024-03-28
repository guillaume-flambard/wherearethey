<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Case {{ id }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const { id } = useRoute().params;

definePageMeta({
  layout: "cases",
});
</script>

<style scoped></style>
