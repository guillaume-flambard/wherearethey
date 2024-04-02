import Papa from 'papaparse';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number.parseInt(query.page?.toString() as string, 10) || 1;
    const pageSize = Number.parseInt(query.pageSize?.toString() as string, 10) || 10;
    const search = query.search?.toString().toLowerCase() || "";
    const csvUrl = 'http://localhost:3000/public_cases.csv';

    const csvData = await $fetch(csvUrl, { responseType: 'text' });

    return new Promise((resolve, reject) => {
        Papa.parse(csvData as string, { // Le `as string` n'est pas nécessaire ici car $fetch avec `responseType: 'text'` garantit déjà un string
            header: true,
            skipEmptyLines: "greedy",
            complete: (results) => {
                // Filtrage des données en fonction du terme de recherche
                const filteredData = results.data.filter((row) => {
                    return row.cas_nom_dossier.toLowerCase().includes(search);
                });

                // Calcul de la pagination sur les données filtrées
                const start = (page - 1) * pageSize;
                const paginatedData = filteredData.slice(start, start + pageSize);

                resolve({
                    data: paginatedData, // Cela doit être paginatedData
                    page,
                    pageSize,
                    total: filteredData.length,
                    totalPages: Math.ceil(filteredData.length / pageSize),
                });
            },
            error: reject
        });
    });
});
