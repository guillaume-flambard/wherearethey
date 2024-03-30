<template>
  <article>
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
          <span class="leading-10" v-html="data?.cas_resume_web" />
        </p>
        <p class="text-sm">
          <span class="font-bold">Conclusion pro :</span><br />
          <span class="leading-10" v-html="data?.cas_resume" />
        </p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { CaseData } from "~/types/cases";

// Correctement définir et typer la prop 'data'
defineProps<{
	data?: CaseData | null;
}>();
</script>

<style scoped>
/* Vos styles ici */
</style>
