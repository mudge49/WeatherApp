import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',  
  runtimeConfig: {
    public: {
      weatherApiKey: process.env.NUXT_PUBLIC_WEATHER_API_KEY,
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
