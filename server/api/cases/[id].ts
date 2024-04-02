import Papa from 'papaparse';
import type { CaseData } from '~/types/cases';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    // URL vers votre fichier CSV dans le dossier `static`
    const csvUrl = 'http://localhost:3000/public_cases.csv';

    // Utilisez $fetch pour récupérer le contenu CSV directement comme texte
    const csvData: string = await $fetch(csvUrl);

    // Convertissez CSV en JSON
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true,
            skipEmptyLines: "greedy",
            complete: (results) => {
                console.log(results.data.filter((row: unknown) => (row as CaseData).id_cas === id));

                resolve(results.data.filter((row: unknown) => (row as CaseData).id_cas === id));
            },
            error: (error: Error) => {
                reject(error);
            }
        });
    });
});
