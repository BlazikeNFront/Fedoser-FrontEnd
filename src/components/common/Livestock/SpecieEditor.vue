<template>
  <v-col>
    <v-text-field
      :model-value="modelValue.weight"
      @update:model-value="onSpecieWeightInput($event as number)"
      :label="$t('livestockInformation.weight')"
      :rules="[FormRules.numberHigherThan(0)]"
      type="number"
    />
  </v-col>
  <v-col>
    <v-text-field
      :model-value="modelValue.meanWeight"
      @update:model-value="onMeanWeightInput($event as number)"
      :rules="[FormRules.numberHigherThan(0)]"
      :label="$t('livestockInformation.meanWeight')"
      type="number"
    />
  </v-col>
  <v-col>
    <v-text-field
      :model-value="modelValue.quantity"
      @update:model-value="onFishAmountInput($event as number)"
      :rules="[FormRules.numberHigherThan(0)]"
      :label="$t('livestockInformation.numberOfIndividuals')"
      type="number"
    />
  </v-col>
</template>

<script lang="ts">
import { SingleLivestockSpecie } from "@/types/Livestock";
export type SpecieEditorModel = {
  [alias in keyof Omit<SingleLivestockSpecie, "specie">]: null | number;
};
export const validateSpecieEditorModel = (
  specieEditor: SpecieEditorModel | Omit<SingleLivestockSpecie, "specie">
): specieEditor is Omit<SingleLivestockSpecie, "specie"> => {
  if (Object.values(specieEditor).some((value) => !value)) return false;
  return true;
};
</script>

<script setup lang="ts">
import { FormRules } from "@/helpers/FormRules";

const props = defineProps<{
  modelValue: SpecieEditorModel;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: SpecieEditorModel): void;
}>();

function onSpecieWeightInput(weight: number) {
  const {
    modelValue: { meanWeight, quantity },
  } = props;

  if (meanWeight)
    emits("update:modelValue", {
      weight,
      meanWeight,
      quantity: Math.round((weight / meanWeight) * 1000),
    });
  else
    emits("update:modelValue", {
      weight,
      meanWeight: quantity
        ? Math.round((weight / quantity) * 1000)
        : meanWeight,
      quantity,
    });
}
function onMeanWeightInput(meanWeight: number) {
  const {
    modelValue: { weight, quantity },
  } = props;

  if (weight)
    emits("update:modelValue", {
      weight,
      meanWeight,
      quantity: Math.round((weight / meanWeight) * 1000),
    });
  else
    emits("update:modelValue", {
      weight: quantity ? Math.floor((quantity * +meanWeight) / 1000) : null,
      meanWeight,
      quantity,
    });
}
function onFishAmountInput(quantity: number) {
  const {
    modelValue: { weight, meanWeight },
  } = props;

  if (meanWeight)
    emits("update:modelValue", {
      weight: Math.round((quantity * meanWeight) / 1000),
      meanWeight,
      quantity,
    });
  else
    emits("update:modelValue", {
      weight,
      meanWeight: weight ? Math.round((weight / quantity) * 1000) : null,
      quantity,
    });
}
</script>
