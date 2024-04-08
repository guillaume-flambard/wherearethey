export const useCasesStore = defineStore('casesStore', {
    state: () => ({
        id: '',
        name: '',
        description: ''
    }),
    actions: {
        async fetchCases() {
            const cases: any = await $fetch('/api/cases', {
                query: {
                    page: 1,
                    pageSize: 10
                }
            })
            this.id = cases.id_cas
            this.name = cases.cas_nom_dossier
            this.description = cases.cas_zone_nom
        }
    }
})
