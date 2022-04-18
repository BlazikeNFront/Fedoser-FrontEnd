<template>
  <i18n-t keypath="tankCard.mainSpecie" tag="p" scope="global" class="f-15">
    <template #mainSpecie>
      <span class="f-2 ml-2" v-text="mainSpecie"></span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  mainSpecie: string;
}>();
</script>
