<template>
  <article class="d-flex flex-column">
    <v-container
      ><v-row
        ><v-col cols="12" class="d-flex align-center justify-center">
          <v-btn
            class="app-button f-15"
            @click="showAllTerminatedDoses = !showAllTerminatedDoses"
            v-text="$t('feedInformation.showTerminateDoses')"
        /></v-col>
        <v-col cols="12">
          <transition-expand>
            <v-table
              v-if="showAllTerminatedDoses"
              class="terminated-dose-list__table radius-4"
              ><thead class="f-15 text-center">
                <tr class="text-center">
                  <th v-text="$t('global.number')"></th>
                  <th v-text="$t('global.date')"></th>
                  <th v-text="$t('feedInformation.dose')"></th>
                  <th v-text="$t('feedInformation.weightGainedAfterDose')"></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="dose in terminatedDoseList" :key="dose.number">
                  <td v-text="dose.number"></td>
                  <td v-text="dose.date"></td>
                  <td v-text="dose.amount"></td>
                  <td v-text="dose.weightGainAfterDose"></td>
                </tr>
              </tbody>
            </v-table>
          </transition-expand>
        </v-col> </v-row
    ></v-container>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { FeedDose } from "@/types/Feed";
defineProps<{
  terminatedDoseList: FeedDose[];
}>();

const showAllTerminatedDoses = ref(false);
</script>
<style lang="scss">
.terminated-dose-list__table {
  @extend .shadow-bg;
  color: white;

  th {
    text-align: center !important;
    font-size: 1.5rem !important;
  }
  td {
    font-size: 1.5rem !important;
  }
  tr:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
}
</style>
