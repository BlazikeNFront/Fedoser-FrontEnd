import { createApp } from "vue";
import App from "./App.vue";

import { pinia } from "@/stores/store";
import { i18nInstance, loadLocaleMessages } from "@/i18n/i18n";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Loader from "@/components/common/Loader.vue";
loadFonts();

(async function appInit() {
  const module = await import("./router");
  const router = await module.default;
  const app = createApp(App);
  app.component("defaultLoader", Loader);
  await loadLocaleMessages(
    i18nInstance.global,
    i18nInstance.global.locale.value
  );

  app.use(pinia).use(router).use(vuetify).use(i18nInstance).mount("#app");
})();
