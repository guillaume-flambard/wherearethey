// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-mapbox', '@pinia/nuxt', "nuxt-lodash",
  ],
  runtimeConfig: {
    public: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_TOKEN,
    },
  },
  css: ['~/layouts/global.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css'
      }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  tailwindcss: {
    config: {
      mode: 'jit',
      theme: {
        extend: {
          animation: {
            border: 'border 4s ease infinite',
          },
          keyframes: {
            border: {
              '0%, 100%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
            },
          },
        },
      },
    }
  }
})