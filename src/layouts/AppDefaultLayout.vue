<template>
  <div class="d-flex" style="min-height: 100vh">
    <the-nav-bar />
    <div style="width: 100%">
      <the-header />

      <v-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-main>
    </div>
  </div>
  <the-footer />
</template>
<script setup lang="ts">
import TheHeader from "@/components/Layout/TheHeader.vue";
import TheFooter from "@/components/Layout/TheFooter.vue";
import TheNavBar from "@/components/Layout/TheNavBar.vue";
</script>
