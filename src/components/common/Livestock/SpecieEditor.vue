<template>
  <v-col v-bind="$attrs">
    <v-text-field
      :model-value="modelValue.weight"
      @update:model-value="onSpecieWeightInput($event as number)"
      :label="$t('livestockInformation.weight')"
      :rules="[FormRules.numberHigherThan(0)]"
      type="number"
    />
  </v-col>
  <v-col v-bind="$attrs">
    <v-text-field
      :model-value="modelValue.meanWeight"
      @update:model-value="onMeanWeightInput($event as number)"
      :rules="[FormRules.numberHigherThan(0)]"
      :label="$t('livestockInformation.meanWeight')"
      type="number"
    />
  </v-col>
  <v-col cols="12">
    <v-text-field
      :model-value="modelValue.quantity"
      @update:model-value="onFishAmountInput($event as number)"
      :rules="[FormRules.numberHigherThan(0)]"
      type="number"
      :label="$t('livestockInformation.numberOfIndividuals')"
    />
  </v-col>
</template>
<script setup lang="ts">
import { FormRules } from "@/helpers/FormRules";
import { SingleLivestockSpecie } from "@/types/Livestock";

const props = defineProps<{
  modelValue: Omit<SingleLivestockSpecie, "specie">;
}>();

const emits = defineEmits<{
  (
    e: "update:modelValue",
    payload: Omit<SingleLivestockSpecie, "specie">
  ): void;
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
      weight: Math.floor((quantity * +meanWeight) / 1000),
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
      meanWeight: Math.round((weight / quantity) * 1000),
      quantity,
    });
}
</script>
