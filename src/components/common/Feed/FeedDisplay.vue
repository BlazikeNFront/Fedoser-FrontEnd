<template>
  <div class="feedDisplay">
    <p>
      <span class="font-weight-bold" style="margin-right: 5px">FEED NAME:</span
      >{{ props.feed.name }}
    </p>
    <p>
      <span class="font-weight-bold" style="margin-right: 5px">FEED SIZE:</span
      >{{ props.feed.size }}mm
    </p>
  </div>
</template>

<script setup lang="ts">
import { Feed } from "@/types/Feed";

const props = defineProps<{
  feed: Feed;
}>();
</script>

<style></style>
