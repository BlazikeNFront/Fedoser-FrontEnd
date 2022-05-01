<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <h4
          class="text-h4 my-4 text-center"
          v-text="$t('tank.tankDescriptors')"
        ></h4>
        <main-tank-information-display
          :main-tank-information="tank.mainTankInformation"
          :single-information-attrs="{
            class:
              'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
          }"
      /></v-col>
      <v-col cols="12" lg="6">
        <h4 class="text-h4 my-4 text-center" v-text="$t('global.others')"></h4>
        <main-specie-display
          :livestock="tank.livestockInformation.livestock"
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
        />
        <livestock-weight-display
          :livestock-weight="
            tank.feedInformation?.currentLivestockWeight ||
            tank.livestockInformation?.initialLivestockWeight ||
            null
          "
          :text-attrs="{ class: 'ml-2 f-15' }"
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
        />
        <annotations-display
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
          :text-attrs="{ class: 'ml-2 f-15' }"
          :annotation-number="tank.annotations.length"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import MainTankInformationDisplay from "@/components/common/Displays/MainTankInformationDisplay.vue";
import LivestockWeightDisplay from "@/components/common/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import MainSpecieDisplay from "@/components/common/TankBasicInfoDisplays/MainSpecieDisplay.vue";
import AnnotationsDisplay from "@/components/common/TankBasicInfoDisplays/AnnotationsDisplay.vue";
import { Tank } from "@/types/Tank";
defineProps<{
  tank: Tank;
}>();
</script>
