import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["@nuxt/devtools"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ["~/assets/css/main.css"],
});
