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
                  v-model="specieSelect"
                  :items="specieSelectItems"
                  :label="$t('global.specie')"
              /></v-col>
              <specie-editor v-model="specieEditor" />
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
          <livestock-list :livestock="props.livestockInformation.initial">
            <template #action="{ specie }">
              <td class="pa-0 pr-2">
                <v-btn
                  @click="deleteSpecie(specie.specie)"
                  icon
                  color="transparent"
                  ><v-icon color="red" size="25">{{
                    Icons.EXIT
                  }}</v-icon></v-btn
                >
              </td>
            </template>
          </livestock-list>
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
import { ref, computed } from "vue";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import {
  LivestockInformationDto,
  SingleLivestockSpecie,
} from "@/types/Livestock";
import { Species } from "@/constants/enums/Species";
import { VForm } from "vuetify/lib/components";
import { SpeciesValues } from "@/types/Livestock";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { Icons } from "@/constants/icons/MdiIcons";
import SpecieEditor, {
  SpecieEditorModel,
  validateSpecieEditorModel,
} from "@/components/common/Livestock/SpecieEditor.vue";

const props = defineProps<{
  livestockInformation: LivestockInformationDto;
}>();

const livestockInformationModel = computed(() => props.livestockInformation);
//currently only specie is allowed
const specieSelectItems = computed(() =>
  livestockInformationModel.value.initial.length
    ? [livestockInformationModel.value.initial[0].specie]
    : Object.values(Species)
);
const emit = defineEmits<{
  (
    e: "update:livestockInformation",
    livestockInformation: LivestockInformationDto
  ): void;
}>();
const livestockEditorForm = ref<InstanceType<typeof VForm> | null>(null);
const specieSelect = ref<SpeciesValues>(Object.values(Species)[0]);
const specieEditor = ref<
  SpecieEditorModel | Omit<SingleLivestockSpecie, "specie">
>({
  weight: null,
  meanWeight: null,
  quantity: null,
});

const showNoLivestockError = ref(false);

function clearInputs() {
  specieEditor.value.weight = null;
  specieEditor.value.meanWeight = null;
  specieEditor.value.quantity = null;
}

function checkIfSpecieAlreadyWasAddedToList(speciesName: SpeciesValues) {
  return props.livestockInformation.initial.some(
    (specieData) => specieData.specie === speciesName
  );
}

function addWeightAndQuantityToSpecie(
  speciesName: SpeciesValues,
  weightToAdd: number,
  quantityToAdd: number
) {
  const specieIndex = props.livestockInformation.initial.findIndex(
    (specieData) => specieData.specie === speciesName
  );
  livestockInformationModel.value.initial[specieIndex].weight += weightToAdd;
  adjustSpecieMeanWeight(specieIndex);
  addQuantityToSpecie(specieIndex, quantityToAdd);
}

function adjustSpecieMeanWeight(specieIndex: number) {
  livestockInformationModel.value.initial[specieIndex].meanWeight = Number(
    Number(
      (Number(specieEditor.value.meanWeight) +
        props.livestockInformation.initial[specieIndex].meanWeight) /
        2
    ).toFixed(2)
  );
}
function addQuantityToSpecie(specieIndex: number, quantity: number) {
  livestockInformationModel.value.initial[specieIndex].quantity += quantity;
}

async function addStockToList() {
  if (
    (await validateLivestockInformationForm()) &&
    validateSpecieEditorModel(specieEditor.value)
  ) {
    if (checkIfSpecieAlreadyWasAddedToList(specieSelect.value)) {
      addWeightAndQuantityToSpecie(
        specieSelect.value,
        specieEditor.value.weight,
        specieEditor.value.quantity
      );
      return;
    }

    const copyOfLiveStockProp = { ...props.livestockInformation };
    copyOfLiveStockProp.initial.push({
      specie: specieSelect.value,
      ...specieEditor.value,
    });
    emit("update:livestockInformation", copyOfLiveStockProp);
    showNoLivestockError.value = false;
    clearInputs();
  }
}

function deleteSpecie(specieName: string) {
  const copyOfLiveStockProp = { ...props.livestockInformation };
  copyOfLiveStockProp.initial = copyOfLiveStockProp.initial.filter(
    (specieData) => specieData.specie !== specieName
  );
  emit("update:livestockInformation", copyOfLiveStockProp);
}
async function validateLivestockInformationForm() {
  const validationResult = await livestockEditorForm.value.validate();
  if (!validationResult.valid) return false;
  return true;
}
async function isAtLeastOneSpieceAdded() {
  if (!props.livestockInformation.initial.length) {
    livestockEditorForm.value.validate();
    showNoLivestockError.value = true;
    return false;
  }
  return true;
}
</script>
