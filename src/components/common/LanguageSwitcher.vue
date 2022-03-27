<template>
  <v-menu top offset-y transition="slide-y-transition">
    <template #activator="{ props }">
      <v-card
        v-bind="props"
        flat
        width="200"
        class="language-select d-flex align-center justify-center"
        style="border: 2px solid white"
      >
        <p class="py-2 px-5 text-white text-h4">
          <v-icon :icon="Icons.GLOBE" size="30" />
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
        <span class="w-50 d-flex align-center justify-center"
          ><img
            style="width: 25px"
            :src="require(`@/assets/countryFlags/${key}.png`)"
            :alt="`${item} flag`"
        /></span>
        <p
          class="text-h4 text-white w-50"
          style="letter-spacing: 0.3rem !important"
          v-text="item"
        ></p>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { SUPPORTED_LOCALES, loadLocaleMessages } from "@/i18n/i18n";
import { Icons } from "@/constants/icons/MdiIcons";
const i18n = useI18n();
const currentLanguage = computed(() => i18n.locale.value);

async function changeAppLanguage(newLanguage: string) {
  if (newLanguage === currentLanguage.value) return;
  try {
    await loadLocaleMessages(i18n, newLanguage);
    i18n.locale.value = newLanguage;
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss" scoped>
.language-select {
  background: transparent;
}
.language-select-menu {
  padding: 0;
  background-color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
  &__list-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
