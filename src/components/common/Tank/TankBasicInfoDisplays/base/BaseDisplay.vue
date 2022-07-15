<template>
  <i18n-t
    tag="p"
    class="shadow-bg f-15 text-white py-2 radius-4"
    scope="global"
  >
    <template #[templateName]>
      <span class="ml-2 f-2" v-bind="spanAttrs" v-text="spanValue"></span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Attrs } from "@/types/Attrs";
defineProps<{
  templateName: string;
  spanValue: string;
  spanAttrs?: Attrs;
}>();
</script>
