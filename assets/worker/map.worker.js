import Papa from "papaparse";
async function getCoordinatesForName(name, accessToken) {
  const endpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const url = `${endpoint}/${encodeURIComponent(
    name
  )}.json?access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const { center } = data.features[0];
      const coordinates = { lat: center[1], lon: center[0] };

      return coordinates;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées", error);
    return null;
  }
}

globalThis.onmessage = async (event) => {
  // Fetch du fichier CSV
  try {
    const { csvUrl, accessToken } = event.data;
    const response = await fetch(csvUrl);

    const csvText = await response.text();

    // Parse du CSV avec Papa Parse
    Papa.parse(csvText, {
      header: true,
      complete: async (results) => {
        const dataWithCoordinates = await Promise.all(
          results.data.map(async (row) => {
            // Assurez-vous que `getCoordinatesForName` est définie dans ce scope ou importée
            const coordinates = await getCoordinatesForName(
              row.cas_zone_nom,
              accessToken
            );
            return { ...row, coordinates };
          })
        );
        // Envoie des données traitées au thread principal
        globalThis.postMessage(dataWithCoordinates);
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du fichier CSV", error);
    return;
  }
};
