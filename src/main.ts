import { createApp } from "vue";

import pinia from "@/stores/store";
import router from "./router";

import App from "./App.vue";
import { i18nInstance, loadLocaleMessages } from "@/i18n/i18n";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Loader from "@/components/common/Loader.vue";

loadFonts();

async function appInit() {
  const app = createApp(App);
  app.component("defaultLoader", Loader);
  await loadLocaleMessages(
    i18nInstance.global,
    i18nInstance.global.locale.value
  );

  app.use(pinia).use(router).use(vuetify).use(i18nInstance);

  await router.isReady();
  app.mount("#app");
}
appInit();
