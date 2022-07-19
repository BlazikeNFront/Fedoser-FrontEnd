<template>
  <i18n-t
    tag="p"
    scope="global"
    class="d-flex align-center justify-center f-15 shadow-bg text-white py-2 radius-4"
  >
    <template #[templateName]>
      <v-icon
        class="ml-2 f-2"
        :icon="boolean ? Icons.CHECKMARK_CIRCLE : Icons.EXIT"
        :color="boolean ? 'success' : 'error'"
      />
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Icons } from "@/constants/icons/MdiIcons";
defineProps<{
  templateName: string;
  boolean: boolean;
}>();
</script>
