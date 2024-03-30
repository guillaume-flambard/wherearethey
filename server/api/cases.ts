import Papa from 'papaparse';

export default defineEventHandler(async (event) => {
    // URL vers votre fichier CSV dans le dossier `static`
    const csvUrl = 'http://localhost:3000/public_cases.csv';

    // Utilisez $fetch pour récupérer le contenu CSV directement comme texte
    const csvData: string = await $fetch(csvUrl);

    // Convertissez CSV en JSON
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true,
            skipEmptyLines: "greedy", // Mis à jour pour correspondre à la documentation de PapaParse
            complete: (results) => {
                resolve(results.data);
            },
            error: (error: Error) => {
                reject(error);
            }
        });
    });
});
