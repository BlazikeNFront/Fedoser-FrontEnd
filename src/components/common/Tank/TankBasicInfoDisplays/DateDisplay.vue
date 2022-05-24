<template>
  <base-display keypath="notes.date" :span-value="date" template-name="date" />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  date: string;
}>();
</script>
