<template>
  <div>
    <div v-if="loading">loading...</div>
    <h1 class="font-extrabold text-3xl text-center">Cases</h1>
    <form action="">
      <input type="text" placeholder="find your Alien..."
        class="w-full p-2 my-5 border border-gray-300 rounded-md shadow-sm dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        v-model="search" />
    </form>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
      <article v-for="c in paginatedCasesData">
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
    <div class="flex justify-center gap-2 fixed bottom-14 inset-x-0 z-[999]">
      <div class="bg-[#12b488] flex gap-4 px-3 border-b-2 rounded-t-md">
        <button @click="currentPage > 1 && (currentPage -= 1)" :disabled="currentPage === 1" class="disabled:text-gray-500">
          ⏴ Previous
        </button>
        <button @click="currentPage < totalFilteredPages && (currentPage += 1)"
          :disabled="currentPage >= totalFilteredPages" class="disabled:text-gray-500">
          Next ⏵
        </button>
      </div>
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

const csvUrl = "public_cases.csv";
const casesData = ref<CaseData[]>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const search = ref("");

// Fetch data on mounted
onMounted(async () => {
	loading.value = true;
	try {
		const response = await fetch(`http://localhost:3000/${csvUrl}`);
		const csvText = await response.text();
		Papa.parse(csvText, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				casesData.value = results.data as CaseData[];
				loading.value = false;
			},
		});
	} catch (error) {
		console.error("Erreur lors du chargement du fichier CSV:", error);
		loading.value = false;
	}
});

// Computed properties for pagination and search
const filteredCasesData = computed(() => {
	if (search.value) {
		return casesData.value.filter((c) =>
			c.cas_nom_dossier.toLowerCase().includes(search.value.toLowerCase()),
		);
	}
	return casesData.value;
});

const paginatedCasesData = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value;
	return filteredCasesData.value.slice(start, start + pageSize.value);
});

// Calcul du nombre total de pages en fonction des résultats filtrés
const totalFilteredPages = computed(() => {
	return Math.ceil(filteredCasesData.value.length / pageSize.value);
});

// Watch for search changes and reset to first page
watch(search, () => {
	currentPage.value = 1;
});
</script>

<style scoped></style>
