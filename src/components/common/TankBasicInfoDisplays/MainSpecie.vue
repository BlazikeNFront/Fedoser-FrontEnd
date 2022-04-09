<template>
  <i18n-t keypath="tankCard.mainSpecie" tag="p" scope="global">
    <template #mainSpecie>
      <span class="mr-2">: </span>
      <span v-text="mainSpecie"> </span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  mainSpecie: string;
}>();
</script>
