<template>
  <i18n-t
    keypath="tankCard.feedName"
    tag="p"
    class="d-flex align-center justify-center f-2"
    scope="global"
  >
    <template #feedName>
      <span class="ml-2" v-text="`${feed.name} ${feed.size}mm`"> </span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Feed } from "@/types/Feed";
defineProps<{
  feed: Feed;
}>();
</script>
