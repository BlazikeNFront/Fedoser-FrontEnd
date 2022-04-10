<template>
  <i18n-t keypath="tankCard.feedProgram" tag="p" scope="global">
    <template #feedProgram>
      <v-icon
        class="ml-2"
        :icon="isFeedProgramSet ? Icons.CHECKMARK_CIRCLE : Icons.EXIT"
        :color="isFeedProgramSet ? 'success' : 'error'"
      />
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Icons } from "@/constants/icons/MdiIcons";
defineProps<{
  isFeedProgramSet: boolean;
}>();
</script>
