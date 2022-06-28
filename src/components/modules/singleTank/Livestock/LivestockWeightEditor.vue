<template>
  <v-dialog :model-value="!!modelValue" class="editor-dialog">
    <v-card
      color="violet"
      tag="dialog"
      style="max-height: 90vh; overflow: auto"
    >
      <v-container
        ><v-row
          ><v-col cols="12">
            <p class="f-15 my-2 font-weight-bold text-center">
              {{ $t("livestockInformation.editLivestockWeight") }}
            </p>
          </v-col>
          <v-col cols="12">
            <livestock-list :livestock="[{ ...modelValue }]" />
          </v-col>
          <v-col cols="12">
            <v-form ref="specieEditorForm">
              <v-container
                ><v-row>
                  <specie-editor v-model="changeWeightForm.specieEdtiors" />
                  <v-textarea
                    v-model="changeWeightForm.reason"
                    :label="$t('livestockInformation.reason')"
                    :rules="[
                      FormRules.required,
                      FormRules.minLength(5),
                      FormRules.maxLength(100),
                    ]"
                  /> </v-row
              ></v-container>

              <v-btn
                @click="$emit('update:modelValue', null)"
                :disabled="changeWeightForm.isLoading"
                class="f-15 app-button text-white"
                >{{ $t("global.reject") }}</v-btn
              >
              <v-btn
                class="f-15 save-button text-white"
                :loading="changeWeightForm.isLoading"
                @click="onChangeWeightRequest"
                >{{ $t("global.confirm") }}</v-btn
              >
            </v-form>
          </v-col>
        </v-row></v-container
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { SingleLivestockSpecie } from "@/types/Livestock";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import { FormRules } from "@/helpers/FormRules";
import SpecieEditor from "@/components/common/Livestock/SpecieEditor.vue";
import { storeToRefs } from "pinia";
import { useTankStore } from "@/stores/TankStore";
import { ChangeSpecieWeightDto } from "@/utils/DTOs/ChangeSpecieWeight.dto";
import { VForm } from "vuetify/lib/components";
import { getCurrentDate } from "@/helpers/date";
const props = defineProps<{
  modelValue: SingleLivestockSpecie;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", modelValue: SingleLivestockSpecie | null): void;
}>();
const specieEditorForm = ref<InstanceType<typeof VForm> | null>(null);
const { tank } = storeToRefs(useTankStore());
const { updateCurrentLivestock } = useTankStore();
const changeWeightForm = reactive({
  isLoading: false,
  specieEdtiors: {
    weight: props.modelValue.weight,
    meanWeight: props.modelValue.meanWeight,
    quantity: props.modelValue.quantity,
  },
  reason: "",
});
function isSpecieDataDiffers() {
  return Object.keys(changeWeightForm.specieEdtiors).some(
    (key) =>
      props.modelValue[key as keyof typeof props.modelValue] !==
      changeWeightForm.specieEdtiors[
        key as keyof typeof changeWeightForm.specieEdtiors
      ]
  );
}
async function onChangeWeightRequest() {
  if (
    !tank.value?._id ||
    !isSpecieDataDiffers() ||
    !(await specieEditorForm.value?.validate()).valid
  )
    return;
  changeWeightForm.isLoading = true;
  const { specieEdtiors, reason } = changeWeightForm;
  if (
    await updateCurrentLivestock(
      new ChangeSpecieWeightDto({
        before: { ...props.modelValue },
        after: { ...props.modelValue, ...specieEdtiors },
        reason,
        date: getCurrentDate(),
      })
    )
  )
    emits("update:modelValue", null);
}
</script>
