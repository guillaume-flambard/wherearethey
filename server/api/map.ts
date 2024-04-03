import Papa from 'papaparse';
import type { CaseData } from '~/types/cases';

// Fonction pour récupérer les coordonnées à partir du nom de la zone en utilisant l'API de géocodage de Mapbox
async function getCoordinatesForName(name: string) {
    const accessToken = 'pk.eyJ1Ijoiem9hbmxvZ2lhIiwiYSI6ImNsdWVsNzZhazBiZXEya3JvdzY1NnRkcXkifQ.SBSKPBqL7eT_feWhQBupUQ'
    const endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const url = `${endpoint}/${encodeURIComponent(name)}.json?access_token=${accessToken}`;

    try {
        const response = await $fetch(url) as { features: { center: [number, number] }[] };
        if (response.features && response.features.length > 0) {
            const { center } = response.features[0]; // Prend la première caractéristique comme résultat
            return { lat: center[1], lon: center[0] }; // Mapbox retourne [longitude, latitude]
        }
        return null; // Gérer les cas où aucun résultat n'est trouvé
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées', error);
        return null;
    }
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const csvUrl = 'http://localhost:3000/public_cases.csv';

    const csvData = await $fetch(csvUrl, { responseType: 'text' });
    const search_text = query.search?.toString().toLowerCase() || "";

    return new Promise((resolve, reject) => {
        Papa.parse<CaseData>(csvData as string, {
            header: true,
            skipEmptyLines: "greedy",
            complete: async (results) => {
                // Filtrage des données en fonction du terme de recherche
                const filteredData = results.data.filter((row: CaseData) =>
                    row.cas_zone_nom.toLowerCase().includes(search_text)
                );

                const dataWithCoordinates = await Promise.all(
                    filteredData.map(async (row) => {
                        const coordinates = await getCoordinatesForName(row.cas_zone_nom);
                        return { ...row, coordinates };
                    })
                );

                resolve(dataWithCoordinates);
            },
            error: reject,
        });
    });
});
