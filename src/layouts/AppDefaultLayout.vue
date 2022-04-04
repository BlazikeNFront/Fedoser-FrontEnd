<template>
  <div class="app__app-layot-wrapper">
    <the-nav-bar />
    <v-main tag="div">
      <the-header />
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </v-main>

    <the-footer />
  </div>
</template>
<script setup lang="ts">
import TheHeader from "@/components/Layout/TheHeader.vue";
import TheFooter from "@/components/Layout/TheFooter.vue";
import TheNavBar from "@/components/Layout/TheNavBar.vue";
</script>
<style lang="scss">
.app__app-layot-wrapper {
  min-height: 100vh;
  background-color: rgb(var(--v-theme-app-background));
}
</style>
