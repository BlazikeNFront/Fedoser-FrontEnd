<template>
  <v-card class="w-90 my-4" color="transparent" elevation="20">
    <v-progress-linear
      :active="loader"
      :indeterminate="loader"
      color="blue"
      height="5"
    />
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
          <v-col
            v-if="feedInformation.currentFeed?.isProposed"
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
            <div v-else>
              <v-btn
                @click="handleDoseProposeRequest"
                :disabled="!feedsForSpecie?.length"
                class="app-button f-15"
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
import { ref, computed, watch, reactive, onBeforeMount } from "vue";
import { getCurrentDate } from "@/helpers/date";
import { FeedDose, FeedForSpecie } from "@/types/Feed";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
import { DoseTermination } from "@/constants/enums/DoseTermination";
import { Icons } from "@/constants/icons/MdiIcons";
import { TankFeedInformation } from "@/types/Tank";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { useFeedForSpecie } from "@/stores/FeedsForSpecie";
import { storeToRefs } from "pinia";
const props = defineProps<{
  feedInformation: Required<TankFeedInformation>;
  mainSpecie: SingleLivestockSpecie | null;
}>();

const emit = defineEmits<{
  (e: "dose-terminated", dose: FeedDose): void;
  (e: "dose-omitted", dose: FeedDose): void;
}>();

const { feedsForSpecie, loader } = storeToRefs(useFeedForSpecie());
const { getFeedsForSpecie } = useFeedForSpecie();
const currentDoseDate = ref(getCurrentDate());
const temperatureFormError = reactive({
  isVisible: false,
  text: "",
});
const currentDose = computed(
  () =>
    new FeedDoseDTO({
      ...(props.feedInformation.feedProgram[indexOfCurrentDose.value] || {
        number: props.feedInformation.feedProgram.length + 1,
        date: getCurrentDate(),
      }),
    })
);
const indexOfCurrentDose = computed(() =>
  props.feedInformation.feedProgram.findIndex((dose) => dose.terminated === 0)
);
const temperatureInput = ref(14);
const feedDoseInput = ref(currentDose.value.amount);
const proposedFeedDose = ref<number | null>(null);
const weightGainedAfterFeed = ref(currentDose.value.weightGainAfterDose);
const isUsingPropsedFeedDose = computed(
  () =>
    feedDoseInput.value !== null &&
    proposedFeedDose.value === feedDoseInput.value
);
watch(temperatureInput, () => clearDoseRelatedInputs());
async function fetchSpecieFeeds() {
  if (!feedsForSpecie.value?.length && props.mainSpecie) {
    await getFeedsForSpecie(props.mainSpecie.specie);
  }
}

function handleDoseProposeRequest() {
  const { currentLivestockWeight, currentFeed } = props.feedInformation;
  if (!currentFeed?.feedForSpecie.weightBreakpoints || !currentLivestockWeight)
    return;
  if (!temperatureInput.value) {
    temperatureFormError.isVisible = true;
    temperatureFormError.text = "Please provide temperature higher than 2*C";
    return;
  }
  const availableTemperatureRange = Object.keys(
    currentFeed.feedForSpecie.weightBreakpoints
  );
  const doseMulitplier: number = availableTemperatureRange.includes(
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
  proposedFeedDose.value = feedDoseInput.value = +(
    (currentLivestockWeight / 100) *
    doseMulitplier
  ).toFixed(2);

  weightGainedAfterFeed.value = +(
    proposedFeedDose.value * currentFeed.feedForSpecie.fcr
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
function clearDoseRelatedInputs() {
  feedDoseInput.value = currentDose.value.amount;
  weightGainedAfterFeed.value = currentDose.value.weightGainAfterDose;
  proposedFeedDose.value = null;
}
function clearForm() {
  temperatureInput.value = 14;
  clearDoseRelatedInputs();
}

function setDoseAsTerminated() {
  const terminatedFeedDose = new FeedDoseDTO({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: feedDoseInput.value,
    weightGainAfterDose: weightGainedAfterFeed.value,
    temperature: temperatureInput.value,
    terminated: DoseTermination.DONE,
  });
  emit("dose-terminated", terminatedFeedDose);
  clearForm();
}
function setDoseAsOmitted() {
  const terminatedFeedDose = new FeedDoseDTO({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: feedDoseInput.value,
    weightGainAfterDose: weightGainedAfterFeed.value,
    temperature: temperatureInput.value,
    terminated: DoseTermination.OMITTED,
  });
  emit("dose-omitted", terminatedFeedDose);
  clearForm();
}
onBeforeMount(() => {
  fetchSpecieFeeds();
});
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
