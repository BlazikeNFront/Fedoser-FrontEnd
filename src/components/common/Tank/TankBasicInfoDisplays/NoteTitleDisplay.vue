<template>
  <base-display keypath="notes.name" :span-value="title" template-name="name" />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
defineProps<{
  title: string;
}>();
</script>
