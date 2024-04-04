<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div v-if="pending">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <div ref="mapContainer" class="flex items-center justify-center relative h-[86vh] map-container">

      <MapboxMap :on-drag="loadMoreData" v-model="locations" ref="map" map-id="map" class="absolute inset-0"
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

interface Location {
  id: number;
  cas_nom_dossier: string;
  coordinates: {
    lon: number;
    lat: number;
  };
}

const currentPage = ref(1);
const pageSize = ref(100); // Nombre d'éléments par page
const locations = ref<Location[]>([]);
const isLoading = ref(false);
const allDataLoaded = ref(false);

const { data, pending, error } = await useFetch('/api/map', {
  params: {
    page: currentPage.value,
    limit: pageSize.value,
  }
});

locations.value = data.value as Location[];

const loadMoreData = async () => {
  if (allDataLoaded.value || isLoading.value) return;
  isLoading.value = true;

  currentPage.value += 1;
  const { data } = await useFetch('/api/map', {
    params: {
      page: currentPage.value,
      limit: pageSize.value,
    }
  });

  if ((data.value as Location[]).length < pageSize.value) {
    allDataLoaded.value = true; // Plus de données à charger
  }

  locations.value = [...locations.value, ...data.value as Location[]];
  isLoading.value = false;
};

</script>
<style scoped></style>