<template>
  <v-card flat color="transparent" width="100%">
    <p
      v-if="!livestock.length"
      v-text="$t('livestockInformation.noLivestock')"
      class="f-2 text-center"
    ></p>
    <div v-else>
      <v-table class="default__table">
        <thead v-if="!hideHeader" class="f-15 text-center">
          <tr>
            <th v-for="(translation, index) in TABLE_HEADERS" :key="index">
              {{ $t(translation) }}
            </th>
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="livestocklist__tbody text-center">
          <tr v-for="(specieInfo, index) in livestock" :key="index">
            <td>{{ $t(`species.${specieInfo.specie}`) }}</td>
            <td>{{ specieInfo.weight.toFixed(2) }}</td>
            <td>{{ specieInfo.meanWeight.toFixed(2) }}</td>
            <td>{{ Math.round(specieInfo.quantity) }}</td>
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
defineProps<{
  livestock: SingleLivestockSpecie[];
  tableClass?: string;
  hideHeader?: boolean;
}>();
const TABLE_HEADERS = [
  "global.specie",
  "livestockInformation.weight",
  "livestockInformation.meanWeight",
  "livestockInformation.numberOfIndividuals",
];
</script>
