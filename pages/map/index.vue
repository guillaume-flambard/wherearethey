<!-- <Icon name="noto:flying-saucer" size="25" /> -->
<template>
  <div>
    <h1 class="font-extrabold text-3xl text-center">Map</h1>
    <div v-if="pending">Loading...</div>


    <div ref="mapContainer" class="map-container h-[100vh]"></div>

  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiem9hbmxvZ2lhIiwiYSI6ImNsdWVsNzZhazBiZXEya3JvdzY1NnRkcXkifQ.SBSKPBqL7eT_feWhQBupUQ'
const mapContainer = ref(null);
let map = null;

// Configuration initiale pour la pagination et l'intervalle
const currentPage = ref(1);
const pageSize = ref(50); // Vous pouvez ajuster la taille de page selon les besoins
let intervalId = null;

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a',
    cluster: true,

    center: [1.7191036, 46.71109],
    zoom: 1.5,
  });

  // Initialiser le chargement des données
  loadMoreData();

  // Configurer l'intervalle pour charger plus de données
  intervalId = setInterval(loadMoreData, 500); // Augmentation de l'intervalle à 10 secondes
});

async function loadMoreData() {
  const { data } = await useFetch('/api/map', {
    params: {
      page: currentPage.value,
      limit: pageSize.value,
    },
    // Optionnel: ajouter `pick` pour alléger la charge de données si votre API le permet
  });

  if (data.value) {
    console.log('Data:', data.value);
    addMarkers(data.value);
    currentPage.value++; // Préparer la page suivante pour la prochaine requête
  }
}

function addMarkers(locations) {

  locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'marker';

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div><p>${location.cas_nom_dossier}</p><a href="/cases/${location.id_cas}" class="link">Voir</a></div>`
    );

    new mapboxgl.Marker(el)
      .setLngLat([location.coordinates.lon, location.coordinates.lat])
      .setPopup(popup)
      .addTo(map);
  });

  console.log('Added markers:', locations.length);
}

onUnmounted(() => {
  if (map) map.remove();
  clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
});
</script>



<style>
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

.link {
  display: inline-block;
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  border-radius: 5px;
}
</style>
