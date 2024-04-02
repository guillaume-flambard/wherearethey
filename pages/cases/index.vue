<template>
  <div>
    <!-- <div v-if="loading">loading...</div> -->
    <h1 class="font-extrabold text-3xl text-center">Cases</h1>
    <form>
      <input type="text" placeholder="find your Alien..."
        class="w-full p-2 my-5 border border-gray-300 rounded-md shadow-sm dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        v-model="search" />
    </form>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
      <article v-for="c in paginatedCasesData">

        <div class="block p-4 shadow-sm bg-white dark:bg-slate-800 rounded-lg h-full ">
          <div class="flex flex-col gap-1">
            <NuxtLink :to="`/cases/${c.id_cas}`">
              <h2 class="font-bold text-xl">{{ c.cas_nom_dossier }}</h2>
            </NuxtLink>
            <div class="flex justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <Icon name="lets-icons:pin-alt-duotone" size="25" />
                  <p class="truncate"> {{ c.cas_zone_nom }}</p>
                </div>
                <div class="flex">
                  <Icon name="lets-icons:view-duotone" size="25" />
                  <p> {{ c.cas_public }}</p>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-1">
                  <Icon name="lets-icons:user-duotone" size="25" />
                  <p>
                    {{ c.cas_temoignages_nb }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="lets-icons:star-duotone" size="25" />
                  <p>{{ c.cas_classification_calc }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="lets-icons:calendar-duotone" size="25" />
              <p>{{ c.cas_AAAA }}</p>
            </div>
            <div class="flex flex-col gap-2 my-2">
              <p class="text-sm truncate">
                <span class="font-bold">Témoignage officiel :</span><br />
                ⏵ {{ c.cas_resume_web }}
              </p>
              <p class="text-sm truncate">
                <span class="font-bold">Conclusion pro :</span><br />
                ⏵ {{ c.cas_resume }}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="flex justify-center gap-2 fixed bottom-14 inset-x-0 z-[999]">
      <div class="bg-[#12b488] flex gap-4 px-3 border-b-2 rounded-t-md">
        <button @click="currentPage > 1 && (currentPage -= 1)" :disabled="currentPage === 1"
          class="disabled:text-gray-500">
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

import { ref, watch, computed } from 'vue';
import { useFetch } from 'nuxt/app';

const currentPage = ref(1);
const pageSize = ref(10);
const search = ref("");

const { data: casesData, pending: loading } = useFetch('/api/cases', {
  params: computed(() => ({ page: currentPage.value, pageSize: pageSize.value, search: search.value })),
  immediate: true,
});

// Calcul du nombre total de pages basé sur le total des cas renvoyé
const totalFilteredPages = computed(() => {
  return Math.ceil((casesData.value as { total: number }).total / pageSize.value);
});

// Pagination des données
const paginatedCasesData = computed(() => (casesData.value as { data: any }).data);

// Réinitialisation à la première page en cas de nouvelle recherche
watch(search, () => {
  currentPage.value = 1;
});
</script>

<style scoped></style>
