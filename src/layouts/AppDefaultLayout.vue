<template>
  <v-layout class="app__app-layot-wrapper">
    <the-nav-bar />
    <v-main tag="div" :class="[mdAndUp ? '' : 'mt-10', 'w-100']">
      <the-header v-if="mdAndUp" />
      <main class="">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </v-main>
    <the-footer />
  </v-layout>
</template>
<script setup lang="ts">
import TheHeader from "@/components/Layout/TheHeader.vue";
import TheFooter from "@/components/Layout/TheFooter.vue";
import TheNavBar from "@/components/Layout/TheNavBar.vue";
import { useDisplay } from "vuetify/lib/framework";
const { mdAndUp } = useDisplay();
</script>
<style lang="scss">
.app__app-layot-wrapper {
  min-height: 100vh;
  background-color: rgb(var(--v-theme-app-background));
}
</style>
