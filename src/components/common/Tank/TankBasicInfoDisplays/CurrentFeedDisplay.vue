<template>
  <base-display
    keypath="tankCard.feedName"
    :span-value="`${feed.name} ${size}mm`"
    template-name="feedName"
  />
</template>
<script setup lang="ts">
import { Feed } from "@/types/Feed";
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";

defineProps<{
  feed: Feed;
  size: string;
}>();
</script>
