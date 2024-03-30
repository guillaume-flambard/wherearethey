<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Cases</h1>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
    >
      <article v-for="c in casesData">
        <div class="block p-4 shadow-sm bg-white dark:bg-slate-800 rounded-lg h-full">
          <div class="flex flex-col gap-1">
            <NuxtLink :to="`/cases/${c.id_cas}`">
              <h2 class="font-bold text-xl">{{ c.cas_nom_dossier }}</h2>
            </NuxtLink>
            <div class="flex flex-wrap justify-between">
              <div class="mx-2">
                <p>📍 {{ c.cas_zone_nom }}</p>
                <p>👀 {{ c.cas_public }}</p>
              </div>
              <div class="mx-2">
                <p>👤 {{ c.cas_temoignages_nb }}</p>
                <p>🎖️ {{ c.cas_classification_calc }}</p>
              </div>
            </div>
            <p>🗓️ {{ c.cas_AAAA }}</p>
            <div class="flex flex-col gap-2 my-2">
              <p class="text-sm truncate">
                <span class="font-bold">Témoignage officiel :</span><br />
                {{ c.cas_resume_web }}
              </p>
              <p class="text-sm truncate">
                <span class="font-bold">Conclusion pro :</span><br />
                {{ c.cas_resume }}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";

interface CaseData {
	id_cas: string;
	cas_nom_dossier: string;
	cas_zone_nom: string;
	cas_public: string;
	cas_temoignages_nb: string;
	cas_classification_calc: string;
	cas_AAAA: string;
	cas_resume_web: string;
	cas_resume: string;
}

definePageMeta({
	layout: "cases",
});

const csvUrl = "/public_cases.csv";
const casesData = ref<CaseData[]>([]);

fetch(csvUrl)
	.then((response) => response.text()) // Obtenez le texte du fichier CSV
	.then((csvText) => {
		// Parsez le texte CSV avec PapaParse
		Papa.parse(csvText, {
			header: true,
			skipEmptyLines: true,
			encoding: "utf-8",
			complete: (results) => {
				casesData.value = results.data as CaseData[];
				console.log(results.data); // Vos données CSV sous forme de JSON
			},
		});
	})
	.catch((error) =>
		console.error("Erreur lors du chargement du fichier CSV:", error),
	);
</script>

<style scoped></style>
