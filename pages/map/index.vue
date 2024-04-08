<template>
  <div>
    <div ref="mapContainer" v-once class="map-container h-[100dvh] rounded-lg"></div>
  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';

definePageMeta({
  title: 'Map',
  description: 'Map page description',
  layout: 'map'
});

const config = useRuntimeConfig();
mapboxgl.accessToken = config.public.MAPBOX_ACCESS_TOKEN;

const mapStore = useMapStore();
const mapContainer = ref(null);

let map;

onMounted(async () => {
  await mapStore.fetchData();
  initMap();

  if (mapStore.locations.length > 0) {
    addMarkers(mapStore.locations);
  }

  watch(() => mapStore.locations, (newLocations) => {
    addMarkers(newLocations);
  }, { deep: true });
});

const initMap = () => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a',
    cluster: true,
    center: [1.7191036, 46.71109],
    zoom: 1.5,
  });
}

const addMarkers = (locations) => {
  locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'marker';

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div class="marker-content">
        <p>
          ${location.cas_nom_dossier}
        </p>
        <a href="/cases/${location.id_cas}" class="link">En savoir +</a>
      </div>`
    );

    new mapboxgl.Marker(el)
      .setLngLat([location.coordinates.lon, location.coordinates.lat])
      .setPopup(popup)
      .addTo(map);
  });

  console.log('Added markers:', locations.length);
}
</script>



<style scoper>
.marker {
  background-image: url('~/assets/img/flying-saucer.svg');
  background-size: cover;
  /* box-shadow: 0 0 10px rgba(48, 161, 106, 0.282); */
  /* here there's an icon of flying-saucer so we are making a really light box shadow */

  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.marker-content {
  padding: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}

.mapboxgl-popup-content {
  background-color: #1f2937;
  font-family: "Mono Roboto", monospace;
  border-radius: 20px;
}

.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
  border-top-color: #1f2937;
}

.mapboxgl-popup-close-button {
  display: none !important;
}

.mapboxgl-ctrl.mapboxgl-ctrl-attrib {
  display: none !important;
}

.mapboxgl-ctrl.mapboxgl-ctrl-scale {
  background-color: transparent !important;
  width: auto !important;
  border: 1px solid #06aeb4;
  border-radius: 5px;
  color: white;
}
</style>
