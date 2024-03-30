<template>
  <div>
    <div v-if="loading">
      loading...
    </div>
    <h1 class="font-extrabold text-3xl text-center">X-File - {{ id }}</h1>
    <!-- <div v-if="loading" class="relative h-screen flex items-center justify-center">
      <div class="loader absolute"></div>
    </div> -->

    <article v-for="c in casesData" :key="c.id_cas">
      <div>
        <div class="flex flex-col gap-3">
          <h2 class="font-bold text-xl">{{ c.cas_nom_dossier }}</h2>
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
          <div class="flex flex-col gap-6 my-2">
            <p class="text-sm">
              <span class="font-bold">Témoignage officiel :</span><br />
              <p class="leading-10" v-html="c.cas_resume_web" />
            </p>
            <p class="text-sm">
              <span class="font-bold">Conclusion pro :</span><br />

              <p class="leading-10" v-html="c.cas_resume" />
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import Papa from "papaparse";

// Définition de l'interface pour les données des cas
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
const loading = ref(false);
// Utilisation de useRoute pour accéder aux paramètres de route
const route = useRoute();
const id = ref(route.params.id as string);

// Déclaration de la référence pour stocker les données des cas
const casesData = ref<CaseData[]>([]);
// Fonction pour charger et parser le fichier CSV
const loadCasesData = () => {
	const csvUrl = "/public_cases.csv";
	loading.value = true;
	fetch(csvUrl)
		.then((response) => response.text())

		.then((csvText) => {
			Papa.parse(csvText, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					// Filtrage des données en fonction de l'ID et assurance du type via une assertion
					const parsedData = results.data as CaseData[];
					casesData.value = parsedData.filter(
						(c): c is CaseData => c.id_cas === id.value,
					);
					loading.value = false;
				},
			});
		})
		.catch((error) =>
			console.error("Erreur lors du chargement du fichier CSV:", error),
		);
};

// Exécution de la fonction loadCasesData au montage du composant
onMounted(loadCasesData);
</script>


<style scoped></style>
