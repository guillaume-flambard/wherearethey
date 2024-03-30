// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon', 'nuxt-mapbox'],
  mapbox: {
    accessToken: 'pk.eyJ1Ijoiem9hbmxvZ2lhIiwiYSI6ImNsdWVsNzZhazBiZXEya3JvdzY1NnRkcXkifQ.SBSKPBqL7eT_feWhQBupUQ'
  },
  css: ['~/layouts/global.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})