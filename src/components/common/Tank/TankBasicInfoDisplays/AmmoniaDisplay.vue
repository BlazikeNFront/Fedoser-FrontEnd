<template>
  <base-display
    keypath="notes.ammonia"
    :span-value="ammonia.toString()"
    template-name="ammonia"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  ammonia: number;
}>();
</script>
