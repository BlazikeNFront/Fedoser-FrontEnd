<template>
  <v-menu top offset-y transition="slide-y-transition" v-model="showMenu">
    <template #activator="{ props }">
      <v-card
        v-bind="props"
        flat
        width="200"
        class="language-select d-flex align-center justify-center"
      >
        <p class="py-2 px-5 text-white text-h4">
          <v-icon class="mr-4" :icon="Icons.GLOBE" size="30" />
          {{SUPPORTED_LOCALES[currentLanguage as keyof typeof SUPPORTED_LOCALES]}}
        </p></v-card
      >
    </template>
    <v-list class="language-select-menu rounded-t-0">
      <v-list-item
        v-for="(item, key) in SUPPORTED_LOCALES"
        :key="key"
        class="d-flex align-center justify-center text-center language-select-menu__list-item"
        @click="changeAppLanguage(key)"
      >
        <span class="d-flex align-center justify-center" style="width: 40%"
          ><img
            style="width: 25px"
            :src="require(`@/assets/countryFlags/${key}.png`)"
            :alt="`${item} flag`"
        /></span>
        <p
          class="text-h4 text-white"
          style="letter-spacing: 0.3rem !important; width: 60%"
          v-text="item"
        ></p>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { SUPPORTED_LOCALES, loadLocaleMessages } from "@/i18n/i18n";
import { Icons } from "@/constants/icons/MdiIcons";
const i18n = useI18n();
const currentLanguage = computed(() => i18n.locale.value);
const showMenu = ref(false);
async function changeAppLanguage(newLanguage: string) {
  if (newLanguage === currentLanguage.value) {
    showMenu.value = false;
    return;
  }
  try {
    await loadLocaleMessages(i18n, newLanguage);
    i18n.locale.value = newLanguage;
    showMenu.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss" scoped>
.language-select {
  background: transparent;
  border: 2px solid white;
  border-radius: 0;
}
.language-select-menu {
  border: 2px solid white;
  border-top: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
  &__list-item:not(:first-child) {
    border-top: 2px solid white;
  }
  &__list-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
