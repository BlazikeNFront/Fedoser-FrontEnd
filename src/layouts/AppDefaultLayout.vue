<template>
  <the-nav-bar />
  <div class="content">
    <the-header />
    <router-view class="router-view" />
    <the-footer />
  </div>
</template>
<script setup lang="ts">
import TheHeader from "@/components/Layout/TheHeader.vue";
import TheFooter from "@/components/Layout/TheFooter.vue";
import TheNavBar from "@/components/Layout/TheNavBar.vue";
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  padding: 2rem;
}
.router-view {
  margin: 0 auto;
  min-height: 80vh;
}
</style>
