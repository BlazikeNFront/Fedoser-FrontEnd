import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "@/stores/store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
