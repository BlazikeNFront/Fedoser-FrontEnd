<template>
  <icon-display
    keypath="notes.isImportant"
    :boolean="isImportant"
    template-name="icon"
  />
</template>
<script setup lang="ts">
import IconDisplay from "@/components/common/TankBasicInfoDisplays/base/IconDisplay.vue";
defineProps<{
  isImportant: boolean;
}>();
</script>
