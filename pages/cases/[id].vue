<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <h1 class="font-extrabold text-3xl text-center">X-File - {{ id }}</h1>
    <!-- <div v-if="loading" class="relative h-screen flex items-center justify-center">
      <div class="loader absolute"></div>
    </div> -->

    <article>
      <div>
        <div class="flex flex-col gap-3">
            <h2 class="font-bold text-xl">{{ data?.cas_nom_dossier }}</h2>
          <div class="flex flex-wrap justify-between">
            <div class="mx-2">
              <p>📍 {{ data?.cas_zone_nom }}</p>
              <p>👀 {{ data?.cas_public }}</p>
            </div>
            <div class="mx-2">
              <p>👤 {{ data?.cas_temoignages_nb }}</p>
              <p>🎖️ {{ data?.cas_classification_calc }}</p>
            </div>
          </div>
          <p>🗓️ {{ data?.cas_AAAA }}</p>
          <div class="flex flex-col gap-6 my-2">
            <p class="text-sm">
              <span class="font-bold">Témoignage officiel :</span><br />
              <p class="leading-10" v-html="data?.cas_resume_web" />
            </p>
            <p class="text-sm">
              <span class="font-bold">Conclusion pro :</span><br />

              <p class="leading-10" v-html="data?.cas_resume" />
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { CaseData } from "~/types/cases";

const { id } = useRoute().params;

const { data: fetchData, pending: loading } = await useFetch(
	`/api/cases/${id}`,
);
const data = ref<CaseData | null>(fetchData.value ? fetchData.value[0] : null);
</script>


<style scoped></style>
