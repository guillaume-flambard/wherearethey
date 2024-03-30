import VuePapaParse from 'vue-papa-parse';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VuePapaParse);
})