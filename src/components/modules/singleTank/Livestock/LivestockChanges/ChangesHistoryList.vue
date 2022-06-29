<template>
  <v-expansion-panels class="livestock-history-panels">
    <v-expansion-panel
      v-for="(change, index) in livestockChanges"
      :key="index"
      bg-color="indigo-darken-4"
      style="border-radius: 10px !important"
    >
      <change-history-list-item :livestock-change="change" />
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { ChangeSpecieWeightPayload } from "@/utils/DTOs/ChangeSpecieWeight.dto";
import ChangeHistoryListItem from "@/components/modules/singleTank/Livestock/LivestockChanges/ChangeHistoryListItem.vue";

defineProps<{
  livestockChanges: ChangeSpecieWeightPayload[];
}>();
</script>
<style lang="scss">
.livestock-history-panels {
  .v-expansion-panel-title__icon {
    font-size: 2rem;
  }
}
</style>
