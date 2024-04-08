

export const useMapStore = defineStore('map', {
    state: () => ({
        locations: [] as any[],
        currentPage: 1,
        pageSize: 20000,
        isLoading: false,
    }),
    actions: {
        async fetchData() {
            if (this.isLoading) return;

            this.isLoading = true;
            try {
                // Utilisez $fetch pour charger les données. Assurez-vous que $fetch est disponible dans votre contexte.
                const data: any = await $fetch('/api/map', {
                    params: {
                        page: this.currentPage,
                        limit: this.pageSize,
                    },
                });
                if (data.length > 0) {
                    this.locations.push(...data);
                    this.currentPage++;
                }
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
