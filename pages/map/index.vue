<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div ref="mapContainer" class="flex items-center justify-center relative h-[86vh] map-container">

      <MapboxMap v-model="locations" ref="map" map-id="map2" class="absolute inset-0"
        :options="{ style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a', center: [-68.137343, 45.137451], zoom: 1.5 }">
        <template v-for="(location, index) in locations" :key="index">
          <MapboxDefaultMarker :lnglat="location.coordinates" :marker-id="'marker' + index">
            <Icon name="noto:flying-saucer" size="25" />
            <MapboxDefaultPopup :lnglat="location.coordinates" :popup-id="location.id.toString()"
              class="mapboxgl-popup-content-child" :text="location.description">
            </MapboxDefaultPopup>
          </MapboxDefaultMarker>
        </template>
        <MapboxAttributionControl />
        <MapboxScaleControl />
        <MapboxNavigationControl />
        <MapboxFullscreenControl />
        <MapboxGeolocateControl />
      </MapboxMap>

    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "map",
  pageTransition: {
    name: "rotate",
  },
});
const locations = ref([
  {
    id: 1,
    coordinates: [-68.137343, 45.137451],
    description: "Description du lieu ici",
  },
]);
</script>
<style scoped></style>