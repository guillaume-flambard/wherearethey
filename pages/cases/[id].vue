<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <h1 class="font-extrabold text-3xl text-center">X-File - {{ data?.id_cas }}</h1>
    <!-- <div v-if="loading" class="relative h-screen flex items-center justify-center">
      <div class="loader absolute"></div>
    </div> -->
    <CaseArticle :data="data"  />


  </div>
</template>

<script setup lang="ts">
import type { CaseData } from "~/types/cases";

const route = useRoute();
const id = route.params.id;

const { data: fetchData, pending: loading } = await useFetch<CaseData[]>(
	`/api/cases/${id}`,
);
const data = ref<CaseData | null>(fetchData.value ? fetchData.value[0] : null);
</script>


<style scoped></style>
