import Papa from 'papaparse';

// Fonction pour convertir une chaîne CSV en JSON
export default function csvToJson(csvString: string) {
    return new Promise((resolve, reject) => {
        Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error: Error) => {
                reject(error);
            }
        });
    });
}
