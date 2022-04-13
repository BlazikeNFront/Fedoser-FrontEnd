<template>
  <v-form
    color="transparent"
    class="mx-auto py-3 px-4 w-100"
    max-width="1000"
    flat
  >
    <v-container>
      <v-row
        ><v-col cols="12" lg="6">
          <v-container>
            <v-row
              ><v-col cols="12">
                <v-select
                  v-model="specieSelect"
                  :items="species"
                  :label="$t('global.specie')" />
                <v-text-field
                  v-if="specieSelect === 'Other'"
                  :label="$t('livestockEditor.typeSpecie')"
                  v-model="specieInput" /></v-col
              ><v-col cols="12">
                <v-text-field
                  :label="$t('global.weight')"
                  v-model="specieWeight"
                  @input="onSpecieWeightInput"
                  type="number"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('livestockEditor.meanWeight')"
                  type="number"
                  v-model="specieMeanWeight"
                  @input="onMeanWeightInput"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('livestockEditor.numberOfIndividuals')"
                  type="number"
                  v-model="fishQuantity"
                  @input="onFishAmountInput"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-btn
                  class="mx-auto f-15"
                  color="success"
                  v-text="$t('livestockEditor.addSpecieToLivestock')"
                  @click="addStockToList"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          cols="12"
          lg="6"
          class="d-flex flex-column align-center justify-start"
        >
          <p
            class="my-3 f-3 text-center"
            v-text="$t('livestockEditor.addSpecieToLivestock')"
          ></p>
          <livestock-list
            :livestock-information="props.livestockInformation"
            :deleteOption="true"
            @delete-request="deleteSpecie"
          />
        </v-col>
      </v-row>
    </v-container>
    <slot v-bind="{ validateLivestockInformation }" />
  </v-form>
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
const species = [
  "Rainbow Trout",
  "Salmon",
  "Tilapia",
  "Whitefish",
  "Brook Trout(Salvelinus)",
  "Other",
];
const showLiveStockCreator = ref(false);
const specieWeight = ref("");
const specieMeanWeight = ref("");
const specieSelect = ref(species[0]);
const specieInput = ref("");
const fishQuantity = ref("");
const errorMsg = ref("");

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
async function validateLivestockInformation() {
  console.log("validated");
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
