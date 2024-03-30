<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div class="h-screen flex items-center justify-center relative">

      <MapboxMap
      map-id="{ID}"
      class="absolute inset-0 w-full h-full rounded-full"
      :options="{
        style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a', // style URL
        center: [-68.137343, 45.137451], // starting position
        zoom: 1.5 // starting zoom
      }"
    />
  </div>

  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
