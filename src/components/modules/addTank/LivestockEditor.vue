<template>
  <v-form
    ref="livestockEditorForm"
    color="transparent"
    class="mx-auto py-3 px-4 w-100"
    max-width="1000"
    @input="livestockEditorForm.resetValidation()"
    flat
  >
    <v-container>
      <v-row
        ><v-col cols="12" lg="6">
          <v-container>
            <v-row
              ><v-col cols="12">
                <v-select
                  v-model="formInputs.specieSelect"
                  :items="Object.values(Species)"
                  :label="$t('global.specie')"
                /> </v-col
              ><v-col cols="12">
                <v-text-field
                  :label="$t('livestockInformation.weight')"
                  v-model="formInputs.specieWeight"
                  :rules="[FormRules.numberHigherThan(0)]"
                  type="number"
                  @input="onSpecieWeightInput"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('livestockInformation.meanWeight')"
                  type="number"
                  :rules="[FormRules.numberHigherThan(0)]"
                  v-model="formInputs.specieMeanWeight"
                  @input="onMeanWeightInput"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :label="$t('livestockInformation.numberOfIndividuals')"
                  type="number"
                  :rules="[FormRules.numberHigherThan(0)]"
                  v-model="formInputs.fishQuantity"
                  @input="onFishAmountInput"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-center">
                <v-btn
                  class="mx-auto f-15"
                  color="success"
                  v-text="$t('livestockInformation.addSpecieToLivestock')"
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
            v-text="$t('livestockInformation.addedLivestock')"
          ></p>
          <livestock-list
            :livestock-information="props.livestockInformation"
            :deleteOption="true"
            @delete-request="deleteSpecie"
          />
        </v-col>
      </v-row>
    </v-container>
    <transition-expand>
      <p
        v-if="showNoLivestockError"
        class="my-3 f-2 text-error text-center"
        v-text="$t('livestockInformation.addLivestockOrOmitStep')"
      ></p>
    </transition-expand>

    <slot
      v-bind="{ validateLivestockInformationForm, isAtLeastOneSpieceAdded }"
    />
  </v-form>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import { LivestockInformation } from "@/types/Tank";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { FormRules } from "@/helpers/FormRules";
import { Species } from "@/constants/enums/Species";
import { VForm } from "vuetify/lib/components";
import { SpeciesValues } from "@/types/Livestock";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
const props = defineProps<{
  livestockInformation: LivestockInformation;
}>();

const livestockInformationModel = computed(() => props.livestockInformation);

const emit = defineEmits<{
  (
    e: "update:livestockInformation",
    livestockInformation: LivestockInformation
  ): void;
}>();
const livestockEditorForm = ref<InstanceType<typeof VForm> | null>(null);
const formInputs = reactive({
  specieSelect: Object.values(Species)[0],
  specieWeight: "",
  specieMeanWeight: "",
  fishQuantity: "",
});

const showNoLivestockError = ref(false);

function onSpecieWeightInput() {
  if (
    !formInputs.specieWeight ||
    (!formInputs.specieMeanWeight && !formInputs.fishQuantity)
  )
    return;
  if (formInputs.specieMeanWeight)
    formInputs.fishQuantity = (
      (+formInputs.specieWeight / +formInputs.specieMeanWeight) *
      1000
    ).toFixed(0);
  else
    formInputs.specieMeanWeight = (
      (+formInputs.specieWeight / +formInputs.fishQuantity) *
      1000
    ).toFixed(0);
}
function onMeanWeightInput() {
  if (
    !formInputs.specieMeanWeight ||
    (!formInputs.specieWeight && !formInputs.fishQuantity)
  )
    return;
  if (formInputs.specieWeight)
    formInputs.fishQuantity = (
      (+formInputs.specieWeight / +formInputs.specieMeanWeight) *
      1000
    ).toFixed(0);
  else
    formInputs.specieWeight = (
      (+formInputs.fishQuantity * +formInputs.specieMeanWeight) /
      1000
    ).toFixed(0);
}
function onFishAmountInput() {
  if (
    !formInputs.fishQuantity ||
    (!formInputs.specieMeanWeight && !formInputs.specieWeight)
  )
    return;
  if (formInputs.specieMeanWeight)
    formInputs.specieWeight = (
      (+formInputs.fishQuantity * +formInputs.specieMeanWeight) /
      1000
    ).toFixed(0);
  else
    formInputs.specieMeanWeight = (
      (+formInputs.specieWeight / +formInputs.fishQuantity) *
      100
    ).toFixed(0);
}

function clearInputs() {
  formInputs.specieWeight = "";
  formInputs.specieMeanWeight = "";
  formInputs.specieSelect = Object.values(Species)[0];
  formInputs.fishQuantity = "";
}

function checkIfSpecieAlreadyWasAddedToList(speciesName: SpeciesValues) {
  return props.livestockInformation.livestock.some(
    (specieData) => specieData.specie === speciesName
  );
}

function addWeightToSpecie(speciesName: SpeciesValues) {
  const specieIndex = props.livestockInformation.livestock.findIndex(
    (specieData) => specieData.specie === speciesName
  );
  livestockInformationModel.value.livestock[specieIndex].weight += parseInt(
    formInputs.specieWeight
  );
  adjustSpecieMeanWeight(specieIndex);
}

function adjustSpecieMeanWeight(specieIndex: number) {
  livestockInformationModel.value.livestock[specieIndex].meanWeight = Number(
    Number(
      (Number(formInputs.specieMeanWeight) +
        props.livestockInformation.livestock[specieIndex].meanWeight) /
        2
    ).toFixed(2)
  );
  livestockInformationModel.value.livestock[specieIndex].quantity = Number(
    parseInt(
      formInputs.fishQuantity +
        props.livestockInformation.livestock[specieIndex].quantity
    )
  );
}

async function addStockToList() {
  if (!(await validateLivestockInformationForm())) return;
  //if specie is selected as other get value from input
  const { specieSelect, specieWeight, specieMeanWeight, fishQuantity } =
    formInputs;
  // if specie already exist in livestock list just add weight
  if (checkIfSpecieAlreadyWasAddedToList(specieSelect)) {
    addWeightToSpecie(specieSelect);
    return;
  }

  const payload: SingleLivestockSpecie = {
    specie: specieSelect,
    weight: parseInt(specieWeight),
    meanWeight: Number(specieMeanWeight),
    quantity: parseInt(fishQuantity),
  };
  const copyOfLiveStockProp = { ...props.livestockInformation };
  copyOfLiveStockProp.livestock.push(payload);
  copyOfLiveStockProp.initialLivestockWeight = calcLivestockMass(
    copyOfLiveStockProp.livestock
  );
  emit("update:livestockInformation", copyOfLiveStockProp);
  showNoLivestockError.value = false;
  clearInputs();
}

function calcLivestockMass(livestock: SingleLivestockSpecie[]) {
  return livestock.reduce((acc, element) => acc + element.weight, 0);
}

function deleteSpecie(specieName: string) {
  const copyOfLiveStockProp = { ...props.livestockInformation };
  copyOfLiveStockProp.livestock = copyOfLiveStockProp.livestock.filter(
    (specieData) => specieData.specie !== specieName
  );
  copyOfLiveStockProp.initialLivestockWeight = calcLivestockMass(
    copyOfLiveStockProp.livestock
  );
  emit("update:livestockInformation", copyOfLiveStockProp);
}
async function validateLivestockInformationForm() {
  const validationResult = await livestockEditorForm.value.validate();
  if (!validationResult.valid) return false;
  return true;
}
async function isAtLeastOneSpieceAdded() {
  if (!props.livestockInformation.livestock.length) {
    livestockEditorForm.value.validate();
    showNoLivestockError.value = true;
    return false;
  }
  return true;
}
</script>
