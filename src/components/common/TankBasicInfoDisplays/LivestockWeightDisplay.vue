<template>
  <i18n-t keypath="tankCard.livestock" tag="p" scope="global">
    <template #livestock>
      <p v-if="livestockWeight" class="ml-2" v-text="livestockWeight"></p>
      <v-icon v-else class="ml-2" :icon="Icons.EXIT" />
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
