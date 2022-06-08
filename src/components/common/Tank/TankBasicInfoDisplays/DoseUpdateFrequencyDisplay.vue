<template>
  <base-display
    keypath="feedInformation.doseUpdateFrequencyDisplay"
    :span-value="updateFrequency.toString()"
    template-name="updateFrequency"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  updateFrequency: number;
}>();
</script>
