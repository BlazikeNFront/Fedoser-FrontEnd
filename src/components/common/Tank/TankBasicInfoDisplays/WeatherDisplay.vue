<template>
  <base-display
    keypath="notes.weather"
    :span-value="weather.toString()"
    template-name="weather"
  />
</template>
<script setup lang="ts">
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";
import { Weather } from "@/constants/enums/Weather";
defineProps<{
  weather: Weather;
}>();
</script>
