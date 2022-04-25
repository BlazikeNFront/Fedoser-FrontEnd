<template>
  <base-display keypath="global.date" :span-value="date" template-name="date" />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  date: string;
}>();
</script>
