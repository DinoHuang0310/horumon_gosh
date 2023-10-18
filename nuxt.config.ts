// import { defineNuxtModule } from 'nuxt'
// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'
const publicPath = isDev ? '/' : '/horumon_gosh/'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    typeCheck: true
  },
  css: [
    '~/assets/css/main.css',
    'animate.css',
  ],
  app: {
    baseURL: publicPath,
    cdnURL: publicPath,
    head: {
      title: 'HORUMON GOSH',
      meta: [
        { name: 'viewport', content: 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', href: `${ publicPath }favicon.ico` }
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: publicPath,
    }
  },
  ssr: false,
})
