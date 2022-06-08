<template>
  <base-display
    keypath="tankCard.volume"
    :span-value="`${volume} &#13221;`"
    template-name="volume"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  volume: number;
}>();
</script>
