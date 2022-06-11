<template>
  <v-card class="mx-auto py-3 px-4" color="violet" max-width="1000">
    <h3 class="h-3 text-center" v-text="$t('addTank.mainTankInformation')"></h3>
    <v-form class="pt-4" ref="mainTankInformationForm">
      <v-container
        ><v-row
          ><v-col cols="12" md="6">
            <v-text-field
              v-model.trim="mainTankInformationModel.name"
              :label="$t('global.tankName')"
              :rules="[FormRules.required, FormRules.maxLength(30)]"
              @input="validateMainTankInformation"
              type="text"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="main-tank-information-editor__number-input"
              v-model.number="mainTankInformationModel.volume"
              :rules="[FormRules.required, FormRules.numberLowerThan(1000)]"
              :label="`${$t('global.volume')} (&#13221;)`"
              @input="validateMainTankInformation"
              type="number"
          /></v-col>
          <v-col cols="12">
            <v-textarea
              v-model.trim="mainTankInformationModel.description"
              :rules="[FormRules.maxLength(200)]"
              @input="validateMainTankInformation"
              :label="$t('global.description')"
              persistent-counter
              rows="10"
          /></v-col>
          <slot v-bind="{ validateMainTankInformation }" /> </v-row
      ></v-container>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { MainTankInformation } from "@/types/Tank";
import { FormRules } from "@/helpers/FormRules";
import { VForm } from "vuetify/lib/components";

const props = defineProps<{
  mainTankInformation: MainTankInformation;
}>();

const mainTankInformationModel = computed(() => props.mainTankInformation);
const mainTankInformationForm = ref<InstanceType<typeof VForm> | null>(null);

async function validateMainTankInformation() {
  const validationResult = await mainTankInformationForm.value.validate();
  if (!validationResult.valid) return false;
  return true;
}
</script>
<style lang="scss" scoped>
.main-tank-information-editor__number-input :deep(input) {
  text-align: center;
}
</style>
