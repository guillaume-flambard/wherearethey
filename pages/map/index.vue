<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div ref="mapContainer" class="flex items-center justify-center relative h-[86vh] map-container">

      <MapboxMap v-model="locations" ref="map" map-id="map" class="absolute inset-0"
        :options="{ style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a', center: [-68.137343, 45.137451], zoom: 1.5, cluster: true, clusterMaxZoom: 14, clusterRadius: 50 }">
        <template v-for="(location, index) in locations" :key="location.id">
          <MapboxDefaultMarker :lnglat="[location.coordinates?.lon, location.coordinates?.lat]"
            :marker-id="'marker' + index">
            <!-- <Icon name="noto:flying-saucer" size="25" /> -->
            <MapboxDefaultPopup :lnglat="[location.coordinates?.lon, location.coordinates?.lat]"
              :popup-id="'popup' + index" class="mapboxgl-popup-content-child">
              <p class="text-white">{{ location.cas_nom_dossier }}</p>
            </MapboxDefaultPopup>
          </MapboxDefaultMarker>
        </template>
        <!-- <MapboxAttributionControl />
                  <MapboxScaleControl />
                  <MapboxNavigationControl />
                  <MapboxFullscreenControl />
                  <MapboxGeolocateControl /> -->
      </MapboxMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import Worker from '~/assets/worker/map.worker?worker'
import { ref, onMounted } from 'vue';

interface Location {
  coordinates: {
    lon: number;
    lat: number;
  };
  cas_nom_dossier: string;
}

const locations = ref<Location[]>([]);
const limit = ref(100);
definePageMeta({
  layout: "map",
  pageTransition: {
    name: "rotate",
  },
});
// Assurez-vous que le chemin est correct



onMounted(() => {
  if (window.Worker) {
    const myWorker = new Worker();
    myWorker.onmessage = function (e: MessageEvent) {

      locations.value = locations.value.concat(e.data.slice(0, limit.value));
    };

    myWorker.onerror = function (e: ErrorEvent) {
      console.error('Erreur dans le worker', e);
    };
    // Envoyez l'URL du CSV au worker pour traitement
    myWorker.postMessage({ csvUrl: 'http://localhost:3000/public_cases.csv', accessToken: 'pk.eyJ1Ijoiem9hbmxvZ2lhIiwiYSI6ImNsdWVsNzZhazBiZXEya3JvdzY1NnRkcXkifQ.SBSKPBqL7eT_feWhQBupUQ' });
    Worker.terminate();
  }
});


// // Remplacez '/api/locations' par votre point de terminaison API correct
// const { data: locations, pending, error } = await useFetch('/api/map', {
//   // Ajoutez des paramètres de requête si nécessaire[0].coordinates.lat
//   lazy: true,
// });
</script>
<style scoped></style>