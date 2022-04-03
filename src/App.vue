<template>
  <v-app style="overflow: hidden" class="app__overlay">
    <component :is="currentLayout" />
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import AppDefaultLayout from "./layouts/AppDefaultLayout.vue";
import HomePageLayout from "./layouts/HomePageLayout.vue";
import { HomeLayoutPages } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";

const route = useRoute();
const currentLayout = computed(() => {
  if (route.name) {
    return HomeLayoutPages.includes(route.name)
      ? HomePageLayout
      : AppDefaultLayout;
  }
  return HomePageLayout;
});

const { checkForCredentialsInLocalStorage } = useUserStore();
onBeforeMount(() => {
  checkForCredentialsInLocalStorage();
});
</script>
<style lang="scss">
.app__overlay {
  background-color: $main-background-color;
}
</style>
