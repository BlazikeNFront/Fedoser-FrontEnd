<template>
  <v-app style="background-color: rgb(var(--v-theme-dark-blue))">
    <component :is="currentLayout" />
    <error-snack-bar />
  </v-app>
</template>

<script setup lang="ts">
import AppDefaultLayout from "./layouts/AppDefaultLayout.vue";
import HomePageLayout from "./layouts/HomePageLayout.vue";
import ErrorSnackBar from "@/components/common/ErrorSnackBar.vue";
import { HomeLayoutPages } from "@/constants/routesNames/RoutesNames";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentLayout = computed(() => {
  if (route.name)
    return HomeLayoutPages.includes(route.name)
      ? HomePageLayout
      : AppDefaultLayout;

  return HomePageLayout;
});
</script>
