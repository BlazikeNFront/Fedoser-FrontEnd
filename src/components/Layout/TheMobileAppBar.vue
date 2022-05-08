<template>
  <v-app-bar
    tag="menu"
    color="teal-darken-4 pa-0"
    :absolute="false"
    image="https://picsum.photos/1920/1080?random"
    class="mobile-app-bar"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <v-container>
      <v-row
        ><v-col cols="2" class="d-flex align-center justify-center">
          <v-app-bar-nav-icon class="f-2" @click="toggleDrawer"
        /></v-col>
        <v-col cols="8" class="d-flex align-center justify-center">
          <v-app-bar-title
            class="f-3 text-center text-uppercase font-weight-bold"
            @click="$router.push({ name: RoutesNames.APP_HOME })"
            v-text="APP_NAME"
          />
        </v-col>
        <v-col cols="2" class="d-flex align-center justify-end">
          <v-menu
            v-model="mobileLanguageSwitcher"
            top
            offset-y
            transition="slide-y-transition"
          >
            <template #activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon class="f-3" :icon="Icons.GLOBE" /> </v-btn
            ></template>
            <v-list class="language-list radius-4">
              <v-list-item
                v-for="(item, key) in SUPPORTED_LOCALES"
                :key="key"
                class="d-flex align-center justify-center text-center language-select-menu__list-item"
                @click="changeAppLanguage(key)"
              >
                <p class="f-2" v-text="item"></p>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <the-mobile-nav-bar />
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import TheMobileNavBar from "@/components/Layout/TheMobileNavBar.vue";
import { useNavDrawer } from "@/stores/NavDrawerStore";
import { APP_NAME } from "@/constants/global";
import { Icons } from "@/constants/icons/MdiIcons";
import { SUPPORTED_LOCALES, loadLocaleMessages } from "@/i18n/i18n";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
const { toggleDrawer } = useNavDrawer();
const mobileLanguageSwitcher = ref(false);
const i18n = useI18n();
const currentLanguage = computed(() => i18n.locale.value);
async function changeAppLanguage(newLanguage: string) {
  if (newLanguage === currentLanguage.value) {
    mobileLanguageSwitcher.value = false;
    return;
  }
  try {
    await loadLocaleMessages(i18n, newLanguage);
    i18n.locale.value = newLanguage;
    mobileLanguageSwitcher.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss" scoped>
.mobile-app-bar {
  position: fixed !important;
  top: 0;
  left: 0;
}
.language-list {
  left: -33%;
}
</style>
