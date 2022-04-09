<template>
  <i18n-t keypath="tankCard.feedProgram" tag="p" scope="global">
    <template #feedProgram>
      <span class="mr-2">: </span>
      <v-icon
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
