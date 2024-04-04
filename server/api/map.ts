import Papa from 'papaparse';
import type { CaseData } from '~/types/cases';

const geocodeCache = new Map<string, { lat: number, lon: number }>();
// Fonction pour récupérer les coordonnées à partir du nom de la zone en utilisant l'API de géocodage de Mapbox
async function getCoordinatesForName(name: string) {
    if (geocodeCache.has(name)) {
        return geocodeCache.get(name);
    }

    const accessToken = 'pk.eyJ1Ijoiem9hbmxvZ2lhIiwiYSI6ImNsdWVsNzZhazBiZXEya3JvdzY1NnRkcXkifQ.SBSKPBqL7eT_feWhQBupUQ'
    const endpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places'; // TODO Affiner resultat car deux cas ne sont pas affichés au bon endroit
    const url = `${endpoint}/${encodeURIComponent(name)}.json?access_token=${accessToken}`;

    try {
        const response = await $fetch(url) as { features: { center: [number, number] }[] };
        if (response.features && response.features.length > 0) {
            const { center } = response.features[0];
            const coordinates = { lat: center[1], lon: center[0] };
            geocodeCache.set(name, coordinates); // Mettre en cache les coordonnées
            return coordinates;
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées', error);
        return null;
    }
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const csvUrl = 'http://localhost:3000/public_cases.csv';
    const page = parseInt(query?.page?.toString() || '') || 1
    const limit = parseInt(query?.limit?.toString() || '') || 100;

    const response = await fetch(csvUrl);
    const csvData = await response.text();


    return new Promise((resolve, reject) => {
        Papa.parse<CaseData>(csvData as string, {
            header: true,
            skipEmptyLines: "greedy",
            complete: async (results) => {
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                const selectedData = results.data.slice(startIndex, endIndex);


                const dataWithCoordinates = await Promise.all(selectedData.map(async (row) => {
                    const coordinates = await getCoordinatesForName(row.cas_zone_nom);
                    return { ...row, coordinates: coordinates || { lat: null, lon: null } };
                }));
                resolve(dataWithCoordinates);
            },
            error: reject,
        });
    });
});
