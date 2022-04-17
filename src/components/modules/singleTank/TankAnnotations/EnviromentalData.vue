<template>
  <div>
    <div class="form-control">
      <label>Temperature</label>
      <input type="number" v-model="enviromentalDataProp.temperature" />
    </div>
    <div class="form-control">
      <label>Ammonia</label>
      <input type="number" v-model="enviromentalDataProp.ammonia" />
    </div>
    <div class="form-control">
      <label>Ph</label>
      <input type="number" v-model="enviromentalDataProp.ph" />
    </div>
    <div class="form-control">
      <label>Weather</label>
      <select v-model="enviromentalDataProp.weather">
        <option
          v-for="key in weatherSelectValues"
          :key="key"
          :value="weatherSelectValues[+key]"
        >
          {{ Weather[+key] }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EnviromentalData } from "@/types/EnviromentalData";
import { enviromentalDataFactory } from "@/utils/factories/EnviromentalData";
import { Weather } from "@/constants/enums/Weather";
import { computed, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: EnviromentalData;
  }>(),
  {
    modelValue: () => enviromentalDataFactory(),
  }
);

const weatherSelectValues = computed(() =>
  Object.values(Weather).filter((key) => Number.isInteger(Number(key)))
);

const enviromentalDataProp = computed(() => props.modelValue);

onMounted(() => {
  console.log(props.modelValue, "haloo");
});
</script>

<style></style>
