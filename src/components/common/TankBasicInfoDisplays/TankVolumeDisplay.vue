<template>
  <i18n-t keypath="tankCard.volume" tag="p" scope="global">
    <template #volume>
      <!--  &#13221; is unicode for cubic meters -->
      {{ `${volume} &#13221;` }}
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  volume: number;
}>();
</script>
