<template>
  <v-card class="w-100 pa-1" color="blue">
    <p class="f-2 font-weight-bold text-center">{{ cardTitle }}</p>
    <div
      v-for="(value, key, index) in specieChangeData"
      :key="index"
      class="d-flex f-2"
    >
      <p class="text-right w-50">{{ $t(`global.${key}`) }}:</p>
      <p class="text-left w-50 pl-4">
        {{ `${value} ${suffixes[index]}` }}
      </p>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { SingleLivestockSpecie } from "@/types/Livestock";

defineProps<{
  cardTitle: string;
  specieChangeData: Omit<SingleLivestockSpecie, "specie">;
}>();
const suffixes = ["kg", "g", ""];
</script>
