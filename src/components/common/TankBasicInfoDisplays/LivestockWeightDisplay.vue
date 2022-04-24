<template>
  <i18n-t keypath="tankCard.livestock" tag="p" scope="global" class="f-15">
    <template #livestock>
      <p
        v-if="livestockWeight"
        class="ml-2"
        v-bind="textAttrs"
        v-text="livestockWeight"
      ></p>
      <v-icon v-else v-bind="textAttrs" class="ml-2" :icon="Icons.EXIT" />
      <slot />
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Icons } from "@/constants/icons/MdiIcons";
import { Attrs } from "@/types/Attrs";
defineProps<{
  livestockWeight: number | null;
  textAttrs?: Attrs;
}>();
</script>
