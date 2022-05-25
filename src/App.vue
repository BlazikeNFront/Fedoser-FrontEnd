<template>
  <v-app style="overflow: hidden">
    <component :is="currentLayout" />
    <error-snack-bar />
  </v-app>
</template>

<script setup lang="ts">
import AppDefaultLayout from "./layouts/AppDefaultLayout.vue";
import HomePageLayout from "./layouts/HomePageLayout.vue";
import ErrorSnackBar from "@/components/common/ErrorSnackBar.vue";
import { HomeLayoutPages } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";

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
