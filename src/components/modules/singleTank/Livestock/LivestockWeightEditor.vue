<template>
  <v-dialog v-model="livestockEditor.showLivestockEditor" width="100%">
    <template #activator="{ props }">
      <v-btn v-bind="{ ...props }" class="edit-button">{{
        $t("livestockInformation.editWeight")
      }}</v-btn>
    </template>
    <v-card color="violet" tag="dialog">
      <v-container
        ><v-row
          ><v-col cols="12">
            <p class="f-15 my-2 font-weight-bold text-center">
              {{ $t("livestockInformation.editLivestockWeight") }}
            </p>
          </v-col>
          <v-col cols="12">
            <livestock-list
              v-if="tank && livestockChange"
              :livestock="tank.livestockInformation.current"
            >
              <template #header
                ><th>{{ $t("global.edit") }}</th>
              </template>
              <template #action="{ index }">
                <v-text-field
                  v-model="livestockChange[index as  number].newWeight"
                ></v-text-field>
                <!-- <v-btn icon color="yellow">
                  <v-icon>{{ Icons.EDIT }}</v-icon>
                </v-btn> -->
              </template>
            </livestock-list>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-space-around">
            <v-btn
              class="f-15 app-button text-white"
              :disabled="livestockEditor.requestPending"
              @click="livestockEditor.showLivestockEditor = false"
              >{{ $t("global.reject") }}</v-btn
            >
            <v-btn
              class="f-15 save-button text-white"
              :loading="livestockEditor.requestPending"
              @click="onLivestockEditAccept"
              >{{ $t("global.confirm") }}</v-btn
            >
          </v-col>
        </v-row></v-container
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useTankStore } from "../../../../stores/TankStore";

import LivestockList from "@/components/common/Livestock/LivestockList.vue";

import { SpeciesValues } from "@/types/Livestock";
type Test = {
  specie: SpeciesValues;
  newWeight: number;
};
const { tank } = storeToRefs(useTankStore());
const livestockChange = ref<Test[] | null>(null);
const livestockEditor = reactive({
  showLivestockEditor: false,
  requestPending: false,
  error: false,
});
onBeforeMount(() => {
  if (tank.value)
    livestockChange.value = tank.value.livestockInformation.current.map(
      (singleSpecie) => ({
        specie: singleSpecie.specie,
        newWeight: singleSpecie.weight,
      })
    );
});
function filterNotChangedWeights() {
  if (!livestockChange.value) return;
  return livestockChange.value.filter(
    (element, index) =>
      element.newWeight !==
      tank.value?.livestockInformation.current[index].weight
  );
}
async function onLivestockEditAccept() {
  console.log(filterNotChangedWeights());
}
</script>
