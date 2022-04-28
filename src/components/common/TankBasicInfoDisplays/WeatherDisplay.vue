<template>
  <base-display
    keypath="notes.ammonia"
    :span-value="weather.toString()"
    template-name="ammonia"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/TankBasicInfoDisplays/base/BaseDisplay.vue";
import { Weather } from "@/constants/enums/Weather";
defineProps<{
  weather: Weather;
}>();
</script>
