// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'],
  css: ['~/layouts/global.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})