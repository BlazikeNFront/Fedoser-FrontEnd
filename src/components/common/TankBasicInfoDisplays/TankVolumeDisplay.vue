<template>
  <i18n-t keypath="tankCard.volume" tag="p" scope="global" class="f-15">
    <template #volume>
      <!--  &#13221; is unicode for cubic meters -->
      <span class="ml-2 f-2" v-text="`${volume} &#13221;`"></span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  volume: number;
}>();
</script>
