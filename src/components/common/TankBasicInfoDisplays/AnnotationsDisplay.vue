<template>
  <i18n-t keypath="tankCard.annotations" tag="p" scope="global" class="f-15">
    <template #annotations>
      <span v-bind="textAttrs" v-text="annotationNumber"> </span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
import { Attrs } from "@/types/Attrs";
defineProps<{
  annotationNumber: number;
  textAttrs?: Attrs;
}>();
</script>
