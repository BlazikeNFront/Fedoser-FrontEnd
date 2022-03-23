import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "@/stores/store";
import { i18n } from "@/i18n/i18n";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(pinia).use(router).use(vuetify).use(i18n).mount("#app");
