<template>
  <i18n-t keypath="tankCard.livestock" tag="p" scope="global">
    <template #livestock>
      <span class="mr-2">: </span>
      <p v-if="livestockWeight" v-text="livestockWeight"></p>
      <v-icon v-else :icon="Icons.EXIT" />
      <slot />
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Icons } from "@/constants/icons/MdiIcons";
defineProps<{
  livestockWeight: number | null;
}>();
</script>
