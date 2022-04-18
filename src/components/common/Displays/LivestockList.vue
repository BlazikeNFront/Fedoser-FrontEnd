<template>
  <v-card flat color="transparent" width="100%">
    <p
      v-if="!livestockInformation.livestock.length"
      v-text="$t('livestockInformation.noLivestock')"
      class="f-2 text-center"
    ></p>
    <div v-else>
      <v-table>
        <thead class="livestocklist__thead f-15">
          <th v-text="$t('global.specie')"></th>
          <th v-text="$t('livestockInformation.weight')"></th>
          <th v-text="$t('livestockInformation.meanWeight')"></th>
          <th v-if="deleteOption"></th>
        </thead>
        <tbody class="livestocklist__tbody text-center">
          <tr
            v-for="(specie, index) in livestockInformation.livestock"
            :key="index"
          >
            <td v-text="specie.name"></td>
            <td v-text="specie.weight"></td>
            <td v-text="specie.meanWeight"></td>
            <td v-if="deleteOption">
              <v-btn
                @click="$emit('delete-request', specie.name)"
                :icon="Icons.EXIT"
                size="x-small"
                color="error"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <livestock-weight-display
        v-if="livestockInformation.livestock.length > 1"
        class="mt-2 f-2 d-flex align-center justify-center"
        :livestock-weight="livestockInformation.initialLivestockWeight"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import { LivestockInformation } from "@/types/Livestock";
import LivestockWeightDisplay from "@/components/common/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import { Icons } from "@/constants/icons/MdiIcons";

withDefaults(
  defineProps<{
    livestockInformation: LivestockInformation;
    deleteOption?: boolean;
    tableClass?: string;
  }>(),
  {
    deleteOption: false,
  }
);
defineEmits<{
  (e: "delete-request", specieName: string): void;
}>();
</script>
<style lang="scss">
.livestocklist__thead {
  th {
    padding: 12px 0;
  }
}
.livestocklist__tbody {
  td {
    font-size: 1.5rem !important;
  }
}
</style>
