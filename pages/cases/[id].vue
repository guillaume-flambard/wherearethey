<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <!-- <div v-if="loading" class="relative h-screen flex items-center justify-center">
      <div class="loader absolute"></div>
    </div> -->
    <h1 class="font-extrabold text-3xl text-center">X-File - {{ data?.id_cas }}</h1>
    <div class="mt-20">
      <CaseArticle :data="data" />
    </div>


  </div>
</template>

<script setup lang="ts">
import type { CaseData } from "~/types/cases";

definePageMeta({
  layout: "cases",
  pageTransition: {
    name: "rotate",
  },
});

const route = useRoute();
const id = route.params.id;

const { data: fetchData, pending: loading } = await useFetch<CaseData[]>(
  `/api/cases/${id}`,
);
const data = ref<CaseData | null>(fetchData.value ? fetchData.value[0] : null);
</script>


<style scoped></style>
