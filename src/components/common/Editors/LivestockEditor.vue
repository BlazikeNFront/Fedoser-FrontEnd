<template>
  <v-card class="mx-auto py-3 px-4" color="violet" max-width="1000">
    <h3 class="h-3 text-center" v-text="$t('addTank.addLivestock')"></h3>
    <v-container>
      <v-row><v-col cols="12"> </v-col></v-row>
    </v-container>

    <div
      v-if="showLiveStockCreator"
      class="d-flex"
      data-test="le-livestockCreator"
    >
      <div class="d-flex flex-column">
        <div class="d-flex flex-column form-control">
          <label for="selectedSpecie">Specie</label>
          <select name="species" id="species" v-model="specieSelect">
            <option v-for="specie in species" :key="specie" :value="specie">
              {{ specie }}
            </option>
          </select>
          <div v-if="specieSelect === 'Other'">
            <label for="speciesTextfield">Specie</label>
            <input v-model="specieInput" type="text" id="speciesTextfield" />
          </div>
        </div>
        <div class="form-control">
          <label for="specieWeight">Weight</label>
          <input
            type="number"
            v-model="specieWeight"
            id="specieWeight"
            @input="onSpecieWeightInput"
          />
        </div>
        <div class="form-control">
          <label for="meanWeight">Mean Weight</label>
          <input
            type="number"
            v-model="specieMeanWeight"
            id="meanWeight"
            @input="onMeanWeightInput"
          />
        </div>
        <div class="form-control">
          <label for="fishAmount">Amount of fish</label>
          <input
            type="number"
            v-model="fishQuantity"
            id="fishAmount"
            @input="onFishAmountInput"
          />
        </div>
        <button @click="addStockToList">ADD SPECIE TO TANK LIST</button>
      </div>
      <div class="d-flex flex-column">
        <h3 class="text-center">Added livestock</h3>
        <livestock-list
          :livestock-information="props.livestockInformation"
          :deleteOption="true"
          @delete-request="deleteSpecie"
        />
      </div>
    </div>
    <p v-if="errorMsg">{{ errorMsg }}</p>
    <div class="d-flex">
      <button class="button" @click="emit('previous-step-request')">
        Previous
      </button>
      <button class="button" @click="handleNextStepRequest">Next</button>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import { LivestockInformationDTO } from "@/utils/DTOs/LivestockInformation.dto";
import { LivestockInformation, SingleLivestockSpecie } from "@/types/Livestock";
const props = defineProps<{
  livestockInformation: LivestockInformation;
}>();
const livestockInformationModel = computed(() => props.livestockInformation);
const emit = defineEmits([
  "update:livestockInformation",
  "previous-step-request",
  "next-step-request",
]);
const showLiveStockCreator = ref(false);
const specieWeight = ref("");
const specieMeanWeight = ref("");
const specieSelect = ref("");
const specieInput = ref("");
const fishQuantity = ref("");
const errorMsg = ref("");

const species = [
  "Rainbow Trout",
  "Salmon",
  "Tilapia",
  "Whitefish",
  "Brook Trout(Salvelinus)",
  "Other",
];
function onSpecieWeightInput() {
  if (!specieWeight.value || (!specieMeanWeight.value && !fishQuantity.value))
    return;
  if (specieMeanWeight.value) {
    fishQuantity.value = (
      (+specieWeight.value / +specieMeanWeight.value) *
      1000
    ).toFixed(0);
  } else {
    specieMeanWeight.value = (
      (+specieWeight.value / +fishQuantity.value) *
      1000
    ).toFixed(0);
  }
}
function onMeanWeightInput() {
  if (!specieMeanWeight.value || (!specieWeight.value && !fishQuantity.value))
    return;
  if (specieWeight.value) {
    fishQuantity.value = (
      (+specieWeight.value / +specieMeanWeight.value) *
      1000
    ).toFixed(0);
  } else {
    specieWeight.value = (
      (+fishQuantity.value * +specieMeanWeight.value) /
      1000
    ).toFixed(0);
  }
}
function onFishAmountInput() {
  if (!fishQuantity.value || (!specieMeanWeight.value && !specieWeight.value))
    return;
  if (specieMeanWeight.value) {
    specieWeight.value = (
      (+fishQuantity.value * +specieMeanWeight.value) /
      1000
    ).toFixed(0);
  } else {
    specieMeanWeight.value = (
      (+specieWeight.value / +fishQuantity.value) *
      100
    ).toFixed(0);
  }
}
function clearInputs() {
  specieWeight.value = "";
  specieMeanWeight.value = "";
  specieSelect.value = "";
  specieInput.value = "";
  fishQuantity.value = "";
}

function checkIfSpecieAlreadyWasAddedToList(speciesName: string) {
  return props.livestockInformation.livestock.some(
    (species) => species.name === speciesName
  );
}
function addWeightToSpecie(speciesName: string) {
  const specieIndex = props.livestockInformation.livestock.findIndex(
    (species) => species.name === speciesName
  );
  livestockInformationModel.value.livestock[specieIndex].weight += parseInt(
    specieWeight.value
  );
  adjustSpecieMeanWeight(specieIndex);
}
function adjustSpecieMeanWeight(specieIndex: number) {
  livestockInformationModel.value.livestock[specieIndex].meanWeight = Number(
    Number(
      (Number(specieMeanWeight.value) +
        props.livestockInformation.livestock[specieIndex].meanWeight) /
        2
    ).toFixed(2)
  );
  livestockInformationModel.value.livestock[specieIndex].quantity = Number(
    parseInt(
      fishQuantity.value +
        props.livestockInformation.livestock[specieIndex].quantity
    )
  );
}

function addStockToList() {
  //if specie is selected as other get value from input
  const speciesName =
    specieSelect.value !== species[species.length - 1]
      ? specieSelect.value
      : specieInput.value;
  // if specie already exist in livestock list just add weight
  if (checkIfSpecieAlreadyWasAddedToList(speciesName)) {
    addWeightToSpecie(speciesName);
    return;
  }

  const payload: SingleLivestockSpecie = {
    name: speciesName,
    weight: parseInt(specieWeight.value),
    meanWeight: Number(specieMeanWeight.value),
    quantity: parseInt(fishQuantity.value),
  };
  const copyOfLiveStockProp = { ...props.livestockInformation };
  copyOfLiveStockProp.livestock = [...props.livestockInformation.livestock];
  copyOfLiveStockProp.livestock.push(payload);
  copyOfLiveStockProp.initialLivestockWeight = calcLivestockMass(
    copyOfLiveStockProp.livestock
  );
  emit("update:livestockInformation", copyOfLiveStockProp);
  clearInputs();
}
function calcLivestockMass(livestock: SingleLivestockSpecie[]) {
  return livestock.reduce((acc, element) => acc + element.weight, 0);
}
function deleteSpecie(specieName: string) {
  const copyOfLiveStockProp = { ...props.livestockInformation };
  copyOfLiveStockProp.livestock = [
    ...props.livestockInformation.livestock,
  ].filter((specie) => specie.name !== specieName);
  copyOfLiveStockProp.initialLivestockWeight = calcLivestockMass(
    copyOfLiveStockProp.livestock
  );
  emit("update:livestockInformation", copyOfLiveStockProp);
}

function handleNextStepRequest() {
  const { livestock, initialLivestockWeight } = props.livestockInformation;
  if (
    showLiveStockCreator.value &&
    (!livestock.length || !initialLivestockWeight)
  ) {
    errorMsg.value = "Please add informations";
    return;
  }
  if (!showLiveStockCreator.value) {
    emit("update:livestockInformation", new LivestockInformationDTO({}));
    emit("next-step-request", 2);
    return;
  }
  emit("next-step-request", 1);
}
</script>
<style scoped></style>
