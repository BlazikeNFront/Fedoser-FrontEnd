<template>
  <base-display
    keypath="notes.ph"
    :span-value="ph.toString()"
    template-name="ph"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  ph: number;
}>();
</script>
