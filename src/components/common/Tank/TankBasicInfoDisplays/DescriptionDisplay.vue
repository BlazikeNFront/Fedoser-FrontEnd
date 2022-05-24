<template>
  <base-display
    keypath="mainTankInformationDisplay.description"
    :span-value="description"
    template-name="description"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  description: string;
}>();
</script>
