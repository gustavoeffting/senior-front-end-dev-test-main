// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Our Blog!',
      meta: [
        {
          name: 'description',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, esse hic aut error blanditiis explicabo.'
        }
      ]
    }
  },
  devtools: { enabled: true },
  experimental: {
    componentIslands: true,
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-lazy-hydrate"],
  nitro: {
    experimental: {
      database: true,
    },
  },
  routeRules: {
    "/": {
      ssr: false,
    },
  },
});
