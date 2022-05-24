<template>
  <div class="d-flex flex-column align-center justify-center">
    <div
      class="feed-quality-display__color-bar"
      :style="`background-color:${FEED_QUALITY_COLORS[quality]}`"
    ></div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { FEED_QUALITY_COLORS } from "@/constants/enums/Feed";
defineProps<{
  quality: keyof typeof FEED_QUALITY_COLORS;
}>();
</script>
<style>
.feed-quality-display__color-bar {
  width: 4rem;
  height: 1rem;
}
</style>
