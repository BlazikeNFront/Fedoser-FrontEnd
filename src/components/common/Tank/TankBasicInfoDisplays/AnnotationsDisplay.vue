<template>
  <base-display
    keypath="tankCard.annotations"
    :span-value="annotationNumber.toString()"
    template-name="annotations"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  annotationNumber: number;
}>();
</script>
