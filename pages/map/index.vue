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

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/zoanlogia/cluelezpp009501ntb28m254a',
    center: [1.7191036, 46.71109],
    zoom: 1.5,
  });

  // TODO : add the number in the clusters

  map.on('load', () => {
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    map.addControl(new mapboxgl.GeolocateControl(), 'bottom-right');

    const geojsonData = {
      type: 'FeatureCollection',
      features: mapStore.locations.map(location => (
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.coordinates.lon, location.coordinates.lat]
          },
          properties: {
            title: location.cas_nom_dossier,
            description: location.cas_resume_web,
          }
        }))
    };

    map.addSource('locations', {
      type: 'geojson',
      data: geojsonData,
      cluster: true,
      clusterRadius: 50,
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'locations',
      filter: ['has', 'point_count'], // Affiche uniquement les clusters
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#06aeb4',
          10,
          '#06aeb4',
          30,
          '#06aeb4',
        ],
        // Utilisez des propriétés de peinture pour styliser les clusters
      },
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'locations',
      filter: ['!', ['has', 'point_count']], // Affiche uniquement les points non-clusterisés
      paint: {
        'circle-color': '#06aeb4',
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',

        // Stylisez les points individuels
      },
    });

    // map.on('click', 'unclustered-point', (e) => {
    //   // Zoom et centre sur le point cliqué
    //   map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 10 });
    // });

    map.on('click', 'unclustered-point', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Assurez-vous que si la carte est déplacée pendant que le popup est ouvert,
      // il se ferme correctement et se rouvre au bon endroit.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features[0].properties.cluster_id;
      map.getSource('locations').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
    });
  })

});

// const adjustCoordinates = (coordinates, index, adjustmentFactor = 0.0001) => {
//   // Créez une petite variance basée sur l'index du point
//   const variance = (index % 2 === 0 ? adjustmentFactor : -adjustmentFactor) * Math.floor(index / 2);
//   return [coordinates[0] + variance, coordinates[1] + variance];
// }



// const addMarkers = (locations) => {
//   locations.forEach(location => {
//     const el = document.createElement('div');
//     el.className = 'marker';

//     const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<div class="marker-content">
//         <p>
//           ${location.cas_nom_dossier}
//         </p>
//         <a href="/cases/${location.id_cas}" class="link">En savoir +</a>
//       </div>`
//     );

//     new mapboxgl.Marker(el)
//       .setLngLat([location.coordinates.lon, location.coordinates.lat])
//       .setPopup(popup)
//       .addTo(map);
//   });

//   console.log('Added markers:', locations.length);
// }
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
