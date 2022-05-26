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
              class="default__table radius-4"
              ><thead class="f-15 text-center">
                <tr class="text-center">
                  <th v-text="$t('global.number')"></th>
                  <th v-text="$t('global.date')"></th>
                  <th v-text="$t('feedInformation.dose')"></th>
                  <th v-text="$t('feedInformation.weightGainedAfterDose')"></th>
                  <th v-text="$t('feedInformation.terminated')"></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="dose in terminatedDoseList" :key="dose.number">
                  <td v-text="dose.number"></td>
                  <td v-text="dose.date"></td>
                  <td v-text="dose.amount"></td>
                  <td v-text="dose.weightGainAfterDose"></td>
                  <td>
                    <v-icon
                      :icon="
                        dose.terminated ? Icons.CHECKMARK_CIRCLE : Icons.EXIT
                      "
                      :color="dose.terminated ? 'success' : 'red'"
                    />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </transition-expand>
        </v-col> </v-row
    ></v-container>
  </article>
</template>

<script setup lang="ts">
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { Icons } from "@/constants/icons/MdiIcons";
import { ref } from "vue";
import { FeedDose } from "@/types/Feed";
defineProps<{
  terminatedDoseList: FeedDose[];
}>();

const showAllTerminatedDoses = ref(false);
</script>
