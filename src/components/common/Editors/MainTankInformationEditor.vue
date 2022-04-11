<template>
  <v-card class="mx-auto py-3 px-4" color="violet" max-width="1000">
    <h3
      class="h-3 text-center"
      v-text="$t('mainTankInformation.mainTankInformation')"
    ></h3>
    <v-form class="pt-4">
      <v-container
        ><v-row
          ><v-col cols="12" md="6">
            <v-text-field
              v-model.trim="mainTankInformationModel.name"
              :label="$t('mainTankInformation.tankName')"
              :rules="[FormRules.required, FormRules.maxLength(30)]"
              type="text"
              data-test="mtf-name-input"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="main-tank-information-editor__number-input"
              v-model.number="mainTankInformationModel.volume"
              :rules="[FormRules.required, FormRules.maxLength(30)]"
              :label="$t('mainTankInformation.tankVolume')"
              type="number"
              data-test="mtf-volume-input"
          /></v-col>
          <v-col cols="12">
            <v-textarea
              v-model.trim="mainTankInformationModel.description"
              :rules="[FormRules.maxLength(200)]"
              :label="$t('mainTankInformation.tankDescription')"
              rows="15"
              hide-details
              data-test="mtf-description-input"
          /></v-col>
          <slot /> </v-row
      ></v-container>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { MainTankInformation } from "@/types/MainTankInformation";
import { FormRules } from "@/helpers/FormRules";

const props = defineProps<{
  mainTankInformation: MainTankInformation;
}>();

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
defineExpose(validateMainTankInformation);
</script>
<style lang="scss" scoped>
.main-tank-information-editor__number-input :deep(input) {
  text-align: center;
}
</style>
