<template>
  <v-container
    ><v-row>
      <v-col cols="12" class="d-flex algin-center justify-center">
        <v-select
          v-model="updateFrequency"
          :items="selectValues"
          style="max-width: 25rem"
          :label="$t('feedInformation.updateFrequency')"
          @update:model-value="updateDoseFrequency"
      /></v-col>
      <v-col
        v-if="isCustomFrequencySelected"
        cols="12"
        class="d-flex algin-center justify-center"
      >
        <v-text-field
          v-model="customFrequency"
          type="number"
          style="max-width: 25rem"
          :label="$t('feedInformation.updateFrequency')"
          @update:model-value="updateDoseFrequency"
        /> </v-col></v-row
  ></v-container>
</template>

<script setup lang="ts">
import { FeedProgramUpdateFrequency } from "@/constants/enums/Feed";
import { ref, computed, onBeforeMount } from "vue";

const props = defineProps<{
  modelValue: number | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", doseUpdateFrequency: number): void;
}>();

//key values from enum (avoid numbers after compilation, maybe object enum is better ?)
const selectValues = Object.keys(FeedProgramUpdateFrequency).filter(
  (key) => !Number.isInteger(Number(key))
);

const updateFrequency = ref<string>(selectValues[1]);
const customFrequency = ref<number | null>(null);

const isCustomFrequencySelected = computed(() => {
  return (
    Number(
      FeedProgramUpdateFrequency[
        updateFrequency.value as keyof typeof FeedProgramUpdateFrequency
      ]
    ) === Number(FeedProgramUpdateFrequency.CUSTOM)
  );
});
function updateDoseFrequency(updatePeriod: number | string) {
  if (isCustomFrequencySelected.value)
    emit("update:modelValue", Number(updatePeriod));
  else
    emit(
      "update:modelValue",
      FeedProgramUpdateFrequency[
        updatePeriod as keyof typeof FeedProgramUpdateFrequency
      ]
    );
}
function validateDoseUpdate(): boolean {
  if (isCustomFrequencySelected.value && !customFrequency.value) return false;
  return true;
}

onBeforeMount(() => {
  if (!props.modelValue)
    emit(
      "update:modelValue",
      FeedProgramUpdateFrequency[
        updateFrequency.value as keyof typeof FeedProgramUpdateFrequency
      ]
    );
});

defineExpose({
  validateDoseUpdate,
});
</script>
