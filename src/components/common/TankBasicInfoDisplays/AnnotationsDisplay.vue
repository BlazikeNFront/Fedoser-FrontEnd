<template>
  <i18n-t keypath="tankCard.annotations" tag="p" scope="global">
    <template #annotations>
      <span class="ml-2" v-text="annotationNumber"> </span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  annotationNumber: number;
}>();
</script>
