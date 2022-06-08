<template>
  <icon-display
    keypath="tankCard.feedProgram"
    :boolean="isFeedProgramSet"
    template-name="feedProgram"
  />
</template>
<script setup lang="ts">
import IconDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/IconDisplay.vue";
defineProps<{
  isFeedProgramSet: boolean;
}>();
</script>
