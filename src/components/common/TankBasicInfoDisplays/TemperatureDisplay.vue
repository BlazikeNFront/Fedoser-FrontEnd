<template>
  <base-display
    keypath="notes.temperature"
    :span-value="temperature.toString()"
    template-name="temperature"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  temperature: number;
}>();
</script>
