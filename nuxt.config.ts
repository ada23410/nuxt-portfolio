// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/base.scss'],
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            // 可選：讓每個 <style lang="scss"> 都自帶變數
            additionalData: '@use "@/assets/css/_variable.scss" as *;'
          }
        }
      }
    },
    runtimeConfig: {
      notionToken: process.env.NOTION_TOKEN,
      notionDataSourceId: process.env.NOTION_DATASOURCE_ID,
      public: {}
    }
})
