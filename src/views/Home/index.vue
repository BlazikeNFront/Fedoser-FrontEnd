<template>
  <div
    class="d-flex flex-column align-center justify-space-evenly"
    style="height: 70vh"
  >
    <p class="f-15 text-white font-weight bold text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div
      class="w-100 d-flex flex-column flex-sm-row align-center justify-space-around"
    >
      <v-btn
        width="50%"
        max-width="300"
        class="mb-6 mb-sm-0 py-6 f-15 font-weight-bold"
        color="blue"
        @click="$router.push({ name: RoutesNames.SIGN_IN })"
        v-text="$t('auth.signIn')"
      />
      <v-btn
        width="50%"
        max-width="300"
        class="py-6 f-15 font-weight-bold"
        color="blue"
        data-test="home-about-button"
        @click="scrollIntoAboutSection"
        v-text="$t('global.about')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useHomePageStore } from "@/stores/HomePageStore";
const { scrollIntoAboutSection } = useHomePageStore();
</script>
