<template>
  <desktop-nav-bar v-if="mdAndUp" />
  <the-mobile-app-bar v-else />
</template>
<script setup lang="ts">
import TheMobileAppBar from "@/components/Layout/TheMobileAppBar.vue";
import DesktopNavBar from "@/components/Layout/NavBars/DesktopNavBar.vue";
import { useDisplay } from "vuetify/lib/framework";
const { mdAndUp } = useDisplay();
</script>
