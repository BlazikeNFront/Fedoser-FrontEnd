import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "@/stores/store";
import { i18nInstance, loadLocaleMessages } from "@/i18n/i18n";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

(async function appInit() {
  const app = createApp(App);

  await loadLocaleMessages(
    i18nInstance.global,
    i18nInstance.global.locale.value
  );

  app.use(pinia).use(router).use(vuetify).use(i18nInstance).mount("#app");
})();
