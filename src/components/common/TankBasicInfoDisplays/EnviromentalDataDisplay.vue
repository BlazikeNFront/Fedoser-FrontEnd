<template>
  <section>
    <component
      :is="headerTag"
      v-text="$t('notes.enviromantalData')"
      v-bind="headerAttrs"
    />
    <v-container
      ><v-row>
        <v-col cols="12" lg="6" v-if="enviromentalData.temperature"
          ><temperature-display
            :temperature="enviromentalData.temperature"
            class="shadow-bg f-15 text-white py-2 radius-4"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ammonia"
          ><ammonia-display
            :ammonia="enviromentalData.ammonia"
            class="shadow-bg f-15 text-white py-2 radius-4"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.ph"
          ><ph-display
            :ph="enviromentalData.ph"
            class="shadow-bg f-15 text-white py-2 radius-4"
        /></v-col>
        <v-col cols="12" lg="6" v-if="enviromentalData.weather"
          ><weather-display
            :weather="enviromentalData.weather"
            class="shadow-bg f-15 text-white py-2 radius-4"
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
import { Attrs } from "@/types/Attrs";
defineProps<{
  headerTag: string;
  headerAttrs: Attrs;
  enviromentalData: EnviromentalData;
}>();
</script>
