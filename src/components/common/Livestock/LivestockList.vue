<template>
  <v-card flat color="transparent" width="100%">
    <p
      v-if="!livestock.length"
      v-text="$t('livestockInformation.noLivestock')"
      class="f-2 text-center"
    ></p>
    <div v-else>
      <v-table class="default__table">
        <thead class="f-15 text-center">
          <tr>
            <th v-text="$t('global.specie')"></th>
            <th v-text="$t('livestockInformation.weight')"></th>
            <th v-text="$t('livestockInformation.meanWeight')"></th>
            <th v-text="$t('livestockInformation.numberOfIndividuals')"></th>
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="livestocklist__tbody text-center">
          <tr v-for="(specieInfo, index) in livestock" :key="index">
            <td v-text="$t(`species.${specieInfo.specie}`)"></td>
            <td v-text="specieInfo.weight"></td>
            <td v-text="specieInfo.meanWeight"></td>
            <td v-text="specieInfo.quantity"></td>
            <slot name="action" :specie="specieInfo" :index="index" />
          </tr>
        </tbody>
      </v-table>
      <livestock-weight-display
        v-if="livestock.length > 1"
        class="mt-2 f-2 d-flex align-center justify-center"
        :livestock-weight="calcLivestockWeight(livestock)"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import LivestockWeightDisplay from "@/components/common/Tank/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { calcLivestockWeight } from "@/helpers/calcLivestockWeight";
const props = defineProps<{
  livestock: SingleLivestockSpecie[];
  tableClass?: string;
}>();
console.log(props);
</script>
