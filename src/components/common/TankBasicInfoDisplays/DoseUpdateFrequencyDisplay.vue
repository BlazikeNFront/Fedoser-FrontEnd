<template>
  <i18n-t
    keypath="feedInformation.doseUpdateFrequencyDisplay"
    tag="p"
    scope="global"
    class="f-15"
  >
    <template #updateFrequency>
      <span class="f-2" v-text="updateFrequency"></span>
    </template>
  </i18n-t>
</template>
<script setup lang="ts">
defineProps<{
  updateFrequency: number;
}>();
</script>
