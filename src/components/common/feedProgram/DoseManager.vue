<template>
  <v-card class="w-90 my-4" color="transparent" elevation="20">
    <v-form>
      <v-container
        ><v-row
          ><v-col cols="12">
            <p class="f-2 text-center" v-text="currentDose.number"></p
          ></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="currentDoseDate"
              type="date"
              :label="$t('global.date')"
          /></v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <v-btn
              @click="handleDoseProposeRequest"
              class="app-button f-15"
              v-text="$t('feedInformation.calculateFeedDose')"
          /></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="temperatureInput"
              type="number"
              :label="$t('global.temperature')"
          /></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="proposedFeedDose"
              type="number"
              :label="$t('feedInformation.dose')"
          /></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="weightGainedAfterFeed"
              type="number"
              :label="$t('feedInformation.weightGainedAfterDose')"
          /></v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <v-btn
              @click="setDoseAsTerminated"
              width="150"
              class="save-button f-15 mr-4"
              v-text="$t('feedInformation.markAsDone')" />
            <v-btn
              @click="setDoseAsOmitted"
              width="150"
              class="edit-button f-15"
              v-text="$t('feedInformation.markAsOmitted')"
          /></v-col> </v-row
      ></v-container>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import { getCurrentDate } from "@/helpers/date";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";
import { FeedDose } from "@/types/FeedDose";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
import { DoseTermination } from "@/constants/enums/DoseTermination";

const props = defineProps<{
  feedProgram: FeedDose[];
  typeOfProgram: TypesOfFeedProgram;
}>();
const feedProgramModel = computed(() => props.feedProgram);
const emit = defineEmits<{
  (e: "dose-terminated", dose: FeedDose): void;
  (e: "dose-omitted", dose: FeedDose): void;
}>();
const currentDoseDate = ref(getCurrentDate());
const currentDose = computed(
  () =>
    new FeedDoseDTO({
      ...(props.feedProgram[indexOfCurrentDose.value] || {
        number: props.feedProgram.length + 1,
        date: getCurrentDate(),
      }),
    })
);
const indexOfCurrentDose = computed(() =>
  props.feedProgram.findIndex((dose) => dose.terminated === 0)
);

const temperatureInput = ref(14);
const proposedFeedDose = ref(currentDose.value.amount);
const weightGainedAfterFeed = ref(currentDose.value.weightGainAfterDose);

const temperatureFormError = reactive({
  isVisible: false,
  text: "",
});

function handleDoseProposeRequest() {
  if (!temperatureInput.value) {
    temperatureFormError.isVisible = true;
    temperatureFormError.text = "Please provide temperature higher than 2*C";
    return;
  }
  proposedFeedDose.value = 2.5;
  weightGainedAfterFeed.value = proposedFeedDose.value * 1; //FCR;
}

function setDefaultValuesInForm() {
  temperatureInput.value = 14;
  proposedFeedDose.value = currentDose.value.amount;
  weightGainedAfterFeed.value = currentDose.value.weightGainAfterDose;
}

function setDoseAsTerminated() {
  const terminatedFeedDose = new FeedDoseDTO({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: proposedFeedDose.value,
    weightGainAfterDose: weightGainedAfterFeed.value,
    temperature: temperatureInput.value,
    terminated: DoseTermination.DONE,
  });
  emit("dose-terminated", terminatedFeedDose);
  setDefaultValuesInForm();
}
function setDoseAsOmitted() {
  const terminatedFeedDose = new FeedDoseDTO({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: proposedFeedDose.value,
    weightGainAfterDose: weightGainedAfterFeed.value,
    temperature: temperatureInput.value,
    terminated: DoseTermination.OMITTED,
  });
  emit("dose-omitted", terminatedFeedDose);
  setDefaultValuesInForm();
}
</script>
<style scoped>
.list-element {
  height: 100%;
  overflow: hidden;
}
.hide-leave-active {
  transition: max-height 0.5s linear;
  overflow: hidden;
}
.hide-leave-to {
  max-height: 0;
}
.hide-leave-from {
  max-height: 15rem;
}
</style>
