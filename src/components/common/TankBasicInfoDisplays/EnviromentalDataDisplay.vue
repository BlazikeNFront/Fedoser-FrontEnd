<template>
  <section>
    <component :is="tag" />
    <v-container
      ><v-row>
        <v-col cols="12" lg="6" v-if="enviromentalData.temperature"
          ><temperature-display :temperature="enviromentalData.temperature"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ammonia"
          ><ammonia-display :ammonia="enviromentalData.ammonia"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ph"
          ><ph-display :ph="enviromentalData.ph"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.weather"
          ><weather-display :weather="enviromentalData.weather"
        /></v-col> </v-row
    ></v-container>
  </section>
</template>
<script setup lang="ts">
import TemperatureDisplay from "@/components/common/TankBasicInfoDisplays/TemperatureDisplay.vue";
import AmmoniaDisplay from "@/components/common/TankBasicInfoDisplays/AmmoniaDisplay.vue";
import PhDisplay from "@/components/common/TankBasicInfoDisplays/PhDisplay.vue";
import WeatherDisplay from "@/components/common/TankBasicInfoDisplays/WeatherDisplay.vue";
import { EnviromentalData } from "@/types/EnviromentalData";
defineProps<{
  tag: string;
  enviromentalData: EnviromentalData;
}>();
</script>
