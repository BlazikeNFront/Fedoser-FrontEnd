<template>
  <router-link to="/"><button class="button">Back</button></router-link>
  <h3>Main tank info</h3>

  <div class="form-control">
    <label for="tankName">Tank Name</label>
    <input
      v-model.trim="mainTankInformationModel.name"
      type="text"
      id="tankName"
      data-test="mtf-name-input"
    />
  </div>
  <div class="form-control">
    <label for="TankVolume">Tank Volume</label>
    <input
      v-model.number="mainTankInformationModel.volume"
      type="number"
      id="TankVolume"
      data-test="mtf-volume-input"
    />
  </div>
  <div class="form-control">
    <label for="tankDescription">Description</label>
    <textarea
      rows="15"
      v-model.trim="mainTankInformationModel.description"
      type="text"
      id="tankDescription"
      data-test="mtf-description-input"
    />
  </div>
  <p v-if="errorMsg" class="error-form">{{ errorMsg }}</p>
  <div class="d-flex">
    <button
      class="button"
      @click="handleNextStepRequest"
      data-test="mtf-next-button"
    >
      Next
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { MainTankInformation } from "@/types/MainTankInformation";

const props = defineProps<{
  mainTankInformation: MainTankInformation;
}>();
const emit = defineEmits(["next-step-request"]);
const mainTankInformationModel = computed(() => props.mainTankInformation);
const errorMsg = ref<string>("");

function validateMainTankInformation() {
  const { name, volume } = props.mainTankInformation;
  if (!name || !volume) {
    errorMsg.value = "Add neccessery info";
    return false;
  }
  errorMsg.value = "";
  return true;
}

function handleNextStepRequest() {
  if (!validateMainTankInformation()) return;
  emit("next-step-request");
}
</script>
