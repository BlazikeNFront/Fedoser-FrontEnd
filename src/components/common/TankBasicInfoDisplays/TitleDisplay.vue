<template>
  <base-display
    keypath="global.title"
    :span-value="title"
    template-name="title"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  title: string;
}>();
</script>
