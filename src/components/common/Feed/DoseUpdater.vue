<template>
  <div class="d-flex flex-column">
    <h5>Update dose frequency:</h5>
    <select
      name="doseUpdateFrequency"
      id="doseUpdateFrequency"
      v-model="updateFrequency"
      @change="updateDoseFrequency"
    >
      <option v-for="(value, key) in selectValues" :key="key" :value="value">
        {{ `${value}` }}
      </option>
    </select>
    <input
      v-if="isCustomFrequencySelected"
      v-model.number="customFrequency"
      type="number"
      style="text-align: center"
    />
  </div>
</template>

<script setup lang="ts">
import { FeedProgramUpdateFrequency } from "@/constants/enums/FeedSelect";
import { ref, computed } from "vue";
const selectValues = Object.keys(FeedProgramUpdateFrequency).filter(
  (key) => !Number.isInteger(Number(key))
);
defineProps<{
  modelValue: number | null;
}>();
const updateFrequency = ref<number>(FeedProgramUpdateFrequency.WEEK);

const customFrequency = ref(null);
defineEmits(["update:modelValue"]);
const isCustomFrequencySelected = computed(() => {
  return (
    Number(FeedProgramUpdateFrequency[updateFrequency.value]) ===
    Number(FeedProgramUpdateFrequency.CUSTOM)
  );
});

function updateDoseFrequency() {
  console.log(updateFrequency.value);
  // if (isCustomFrequencySelected.value)
  //   emit("update:modelValue", customFrequency.value);
  // else emit("update:modelValue", updateFrequency.value);
}
</script>
