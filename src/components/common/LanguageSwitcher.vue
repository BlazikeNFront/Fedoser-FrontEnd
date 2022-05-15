<template>
  <div>
    <v-menu top offset-y transition="slide-y-transition" v-model="showMenu">
      <template #activator="{ props }">
        <v-card
          v-bind="props"
          flat
          :width="selectWidth"
          class="d-flex align-center justify-center"
          :class="
            appTheme
              ? 'language-select--app-theme'
              : 'language-select--home-theme'
          "
        >
          <v-icon
            color="white"
            :class="mdAndUp ? 'mr-4' : ''"
            :icon="Icons.GLOBE"
            :size="selectIconWidth"
          />
          <p v-if="mdAndUp" class="py-2 text-white">
            {{SUPPORTED_LOCALES[currentLanguage as keyof typeof SUPPORTED_LOCALES]}}
          </p></v-card
        >
      </template>
      <v-list
        class="rounded-t-0"
        :class="
          appTheme
            ? 'language-select-menu--app-theme'
            : 'language-select-menu--home-theme'
        "
      >
        <v-list-item
          v-for="(item, key) in SUPPORTED_LOCALES"
          :key="key"
          class="d-flex align-center justify-center text-center language-select-menu__list-item"
          @click="changeAppLanguage(key)"
        >
          <span class="d-flex align-center justify-center" style="width: 40%"
            ><img
              :style="`width:${selectIconWidth}px`"
              :src="require(`@/assets/countryFlags/${key}.png`)"
              :alt="`${item} flag`"
          /></span>
          <p v-if="mdAndUp" class="text-white" v-text="item"></p>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { SUPPORTED_LOCALES, loadLocaleMessages } from "@/i18n/i18n";
import { Icons } from "@/constants/icons/MdiIcons";
import { useDisplay } from "vuetify/lib/framework";
defineProps<{
  appTheme?: boolean;
  selectWidth: number;
  selectIconWidth: number;
}>();
const { mdAndUp } = useDisplay();
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
.language-select--home-theme {
  top: 0;
  background: transparent;
  font-size: 1.5rem;
}
.language-select-menu--home-theme {
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
  p {
    font-size: 1.5rem;
    letter-spacing: 5px;
    width: 60%;
  }
}
.language-select--app-theme {
  background: $secondary-color;
  border: 2px solid $secondary-color;
  border-radius: 0;
  font-size: 1.2rem;
}
.language-select-menu--app-theme {
  border: 2px solid $secondary-color;
  border-top: none;
  padding: 0;
  background-color: $secondary-color;
  font-size: 1.2rem;
  cursor: pointer;

  .language-select-menu__list-item {
    border-top: 2px solid $primary-color-dark;
  }
  .language-select-menu__list-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  p {
    font-size: 1.2rem;
    width: 40%;
  }
}
@media (min-width: 960px) {
  .language-select--home-theme {
    border: 2px solid white;
    border-radius: 0;
  }
}
</style>
