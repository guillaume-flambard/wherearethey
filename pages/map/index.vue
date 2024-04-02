<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div ref="mapContainer" class="flex items-center justify-center relative h-[86vh] map-container">

      <MapboxMap v-model="locations" ref="map" map-id="{ID}" class="absolute inset-0" :options="{
        style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a', // style URL
        center: [-68.137343, 45.137451], // starting position
        zoom: 1.5 // starting zoom
      }">
        <!-- <MapboxSource
        source-id="{ID}"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
      />
      <MapboxLayer
        :layer="{
          source: '{ID}',
          id: 'geojson-layer',
          type: 'fill'
        }"
      /> -->
        <MapboxGeolocateControl position="top-left" />
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
const locations = ref([]);


</script>

<style scoped></style>
