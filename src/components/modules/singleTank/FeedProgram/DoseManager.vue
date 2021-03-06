<template>
  <v-card class="w-90 my-4" color="transparent" elevation="20">
    <v-progress-linear
      :active="loader"
      :indeterminate="loader"
      color="blue"
      height="5"
    />
    <v-form ref="doseManagerForm">
      <v-container
        ><v-row
          ><v-col cols="12">
            <p class="f-2 text-center" v-text="currentDose.number"></p
          ></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="currentDoseDate"
              type="date"
              :rules="[FormRules.required]"
              :label="$t('global.date')"
          /></v-col>
          <v-col
            v-if="feedsForSpecie?.length"
            cols="12"
            class="d-flex align-center justify-center"
          >
            <p
              v-if="
                feedInformation.currentFeed?.feedForSpecie.weightBreakpoints ===
                null
              "
            >
              {{ $t("feedInformation.adLibitumFeedDose") }}
            </p>
            <div v-else class="d-flex align-center">
              <v-tooltip
                v-if="!feedInformation.currentFeed?.isProposed"
                anchor="top"
              >
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-btn
                      disabled
                      class="f-15 disabled-button"
                      v-text="$t('feedInformation.calculateFeedDose')"
                    />
                  </div>
                </template>
                <span class="f-15">{{
                  $t("feedInformation.feedIsNotProposedTooltip")
                }}</span>
              </v-tooltip>
              <v-btn
                v-else
                @click="handleDoseProposeRequest"
                :disabled="!feedInformation.currentFeed?.isProposed"
                class="f-15"
                :class="[
                  feedInformation.currentFeed?.isProposed
                    ? 'app-button'
                    : 'disabled-button',
                ]"
                v-text="$t('feedInformation.calculateFeedDose')"
              />
              <v-tooltip
                v-if="!isUsingPropsedFeedDose && proposedFeedDose"
                anchor="top"
                ><template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    color="yellow"
                    class="ml-2"
                    size="30"
                    :icon="Icons.ALERT"
                  />
                </template>
                <span
                  class="f-15"
                  v-text="$t('feedInformation.diffrentDosesAlert')"
                ></span
              ></v-tooltip></div
          ></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="temperatureInput"
              type="number"
              :label="$t('global.temperature')"
              :rules="[
                FormRules.required,
                FormRules.numberHigherThan(0),
                FormRules.numberLowerThan(50),
              ]"
          /></v-col>
          <v-col cols="12">
            <p
              v-show="!isUsingPropsedFeedDose && proposedFeedDose"
              class="mb-2 f-15"
              v-text="
                $t('feedInformation.proposedDose', { dose: proposedFeedDose })
              "
            ></p>
            <v-text-field
              v-model="feedDoseInput"
              type="number"
              :label="$t('feedInformation.dose')"
              :rules="[FormRules.required, FormRules.numberHigherThan(0)]"
          /></v-col>
          <v-col cols="12">
            <v-text-field
              v-model="weightGainedAfterFeed"
              type="number"
              :rules="[FormRules.required, FormRules.numberHigherThan(0)]"
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
import { ref, computed, watch, reactive, onBeforeMount } from "vue";
import { getCurrentDate } from "@/helpers/date";
import { FeedDoseDto, FeedForSpecie } from "@/types/Feed";

import { DoseTermination } from "@/constants/enums/DoseTermination";
import { Icons } from "@/constants/icons/MdiIcons";
import { FeedInformationDto } from "@/types/Feed";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { useFeedForSpecie } from "@/stores/FeedsForSpecie";
import { storeToRefs } from "pinia";
import { VForm } from "vuetify/lib/components";
import { FormRules } from "@/helpers/FormRules";
import { roundTo2Decimals } from "@/helpers/global";

const props = defineProps<{
  feedInformation: Required<FeedInformationDto>;
  mainSpecie: SingleLivestockSpecie;
  livestockWeight: number;
}>();

const emit = defineEmits<{
  (e: "dose-terminated", dose: FeedDoseDto): void;
}>();

const { feedsForSpecie, loader } = storeToRefs(useFeedForSpecie());
const { getFeedsForSpecie } = useFeedForSpecie();
const currentDoseDate = ref(getCurrentDate());
const doseManagerForm = ref<InstanceType<typeof VForm> | null>(null);
const temperatureFormError = reactive({
  isVisible: false,
  text: "",
});

const currentDose = computed(() => ({
  number: props.feedInformation.feedProgram.length + 1,
  date: getCurrentDate(),
  amount: 0,
  temperature: null,
  weightGainAfterDose: null,
  specie: props.mainSpecie.specie,
}));

const currentCycleDoseNumber = computed(() => {
  const { doseUpdateFrequency } = props.feedInformation;
  if (lastDose.value && doseUpdateFrequency) {
    return lastDose.value?.currentCycleDoseNumber + 1 > doseUpdateFrequency
      ? 1
      : lastDose.value?.currentCycleDoseNumber + 1;
  }
  return 1;
});
const temperatureInput = ref(14);
const feedDoseInput = ref(currentDose.value.amount);
const proposedFeedDose = ref<number | null>(null);
const weightGainedAfterFeed = ref<number | null>(
  currentDose.value.weightGainAfterDose
);
const isUsingPropsedFeedDose = computed(
  () =>
    feedDoseInput.value !== null &&
    proposedFeedDose.value === feedDoseInput.value
);
const lastDose = computed(() => {
  const { feedProgram } = props.feedInformation;
  return feedProgram[feedProgram.length - 1];
});

watch(temperatureInput, () => clearDoseRelatedInputs());
async function fetchSpecieFeeds() {
  if (!feedsForSpecie.value?.length && props.mainSpecie) {
    await getFeedsForSpecie(props.mainSpecie.specie);
  }
}

function handleDoseProposeRequest() {
  const { currentFeed, doseUpdateFrequency } = props.feedInformation;
  if (!currentFeed?.feedForSpecie.weightBreakpoints || !props.livestockWeight)
    return;
  if (!temperatureInput.value) {
    temperatureFormError.isVisible = true;
    temperatureFormError.text = "Please provide temperature higher than 2*C";
    return;
  }
  const availableTemperatureRange = Object.keys(
    currentFeed.feedForSpecie.weightBreakpoints
  );
  const doseMulitplier = availableTemperatureRange.includes(
    temperatureInput.value.toString()
  )
    ? currentFeed.feedForSpecie.weightBreakpoints[
        temperatureInput.value.toString() as keyof typeof currentFeed.feedForSpecie.weightBreakpoints
      ]
    : getCorrectDoseMulitplier(
        availableTemperatureRange,
        currentFeed.feedForSpecie as Omit<
          FeedForSpecie,
          "weightBreakpoints"
        > & { weightBreakpoints: Record<string, number> }
      );

  if (
    doseUpdateFrequency &&
    lastDose.value?.currentCycleDoseNumber < doseUpdateFrequency
  ) {
    proposedFeedDose.value = feedDoseInput.value = Math.round(
      getLivestockWeightFromPast(lastDose.value.currentCycleDoseNumber) *
        10 *
        doseMulitplier
    );

    weightGainedAfterFeed.value = +(
      (proposedFeedDose.value * currentFeed.feedForSpecie.fcr) /
      1000
    ).toFixed(2);
    return;
  }

  proposedFeedDose.value = feedDoseInput.value = Math.round(
    (feedDoseInput.value = +(props.livestockWeight * 10 * doseMulitplier))
  );

  weightGainedAfterFeed.value = +(
    (proposedFeedDose.value * currentFeed.feedForSpecie.fcr) /
    1000
  ).toFixed(2);
}
function getCorrectDoseMulitplier(
  availableTemperatureRange: string[],
  feedsForSpecie: Omit<FeedForSpecie, "weightBreakpoints"> & {
    weightBreakpoints: Record<string, number>;
  }
): number {
  return feedsForSpecie.weightBreakpoints[
    availableTemperatureRange.find(
      (temperature) => +temperature > temperatureInput.value
    ) || availableTemperatureRange[availableTemperatureRange.length - 1]
  ];
}
function getLivestockWeightFromPast(doses: number) {
  const {
    feedInformation: {
      feedProgram,
      feedProgram: { length },
    },
    livestockWeight,
  } = props;
  return feedProgram
    .slice(length - doses, length)
    .reduce(
      (acc, dose) => roundTo2Decimals(acc - dose.weightGainAfterDose),
      livestockWeight
    );
}
function clearDoseRelatedInputs() {
  feedDoseInput.value = currentDose.value.amount;
  weightGainedAfterFeed.value = currentDose.value.weightGainAfterDose;
  proposedFeedDose.value = null;
}
function clearForm() {
  temperatureInput.value = 14;
  clearDoseRelatedInputs();
}

async function setDoseAsTerminated() {
  const {
    mainSpecie,
    feedInformation: { doseUpdateFrequency },
  } = props;
  if (
    !(await doseManagerForm.value.validate()).valid ||
    !mainSpecie ||
    !doseUpdateFrequency
  )
    return;
  const terminatedFeedDose = new FeedDoseDto({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: feedDoseInput.value,
    weightGainAfterDose: weightGainedAfterFeed.value || 0,
    temperature: temperatureInput.value,
    terminated: DoseTermination.DONE,
    currentCycleDoseNumber: currentCycleDoseNumber.value,
    specie: props.mainSpecie.specie,
  });
  emit("dose-terminated", terminatedFeedDose);
  clearForm();
}

async function setDoseAsOmitted() {
  const {
    mainSpecie,
    feedInformation: { doseUpdateFrequency },
  } = props;
  if (!mainSpecie || !doseUpdateFrequency) return;
  const terminatedFeedDose = new FeedDoseDto({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    terminated: DoseTermination.OMITTED,
    currentCycleDoseNumber: currentCycleDoseNumber.value,
    specie: props.mainSpecie.specie,
  });
  doseManagerForm.value.resetValidation();
  emit("dose-terminated", terminatedFeedDose);
  clearForm();
}
onBeforeMount(() => fetchSpecieFeeds());
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
