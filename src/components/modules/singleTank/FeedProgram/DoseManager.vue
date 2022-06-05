<template>
  <v-card class="w-90 my-4" color="transparent" elevation="20">
    <v-progress-linear
      :active="loadingFeeds"
      :indeterminate="loadingFeeds"
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
            <v-btn
              @click="handleDoseProposeRequest"
              :disabled="!feeds.length"
              class="app-button f-15"
              v-text="$t('feedInformation.calculateFeedDose')" />
            <v-tooltip v-if="!isUsingPropsedFeedDose" anchor="top"
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
              ></span></v-tooltip
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
              v-model="feedDose"
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
import { ref, computed, reactive, onBeforeMount } from "vue";
import { getCurrentDate } from "@/helpers/date";
import { FeedDose } from "@/types/Feed";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";
import { DoseTermination } from "@/constants/enums/DoseTermination";
import { Icons } from "@/constants/icons/MdiIcons";
import { useFeedTypesStore } from "@/stores/FeedTypesStore";
import { storeToRefs } from "pinia";
import { TankFeedInformation } from "@/types/Tank";
import { FeedTablesService } from "@/services/endpoints/FeedTables";
import { SingleLivestockSpecie } from "@/types/Livestock";
const props = defineProps<{
  feedInformation: Required<TankFeedInformation>;
  mainSpecie: SingleLivestockSpecie;
}>();

const emit = defineEmits<{
  (e: "dose-terminated", dose: FeedDose): void;
  (e: "dose-omitted", dose: FeedDose): void;
}>();

const { feeds, loadingFeeds } = storeToRefs(useFeedTypesStore());
const { getFeedTypes } = useFeedTypesStore();

const currentDoseDate = ref(getCurrentDate());
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
const feedDose = ref(currentDose.value.amount);
const proposedFeedDose = ref<number | null>(null);
const weightGainedAfterFeed = ref(currentDose.value.weightGainAfterDose);
const isUsingPropsedFeedDose = computed(
  () => feedDose.value !== null && proposedFeedDose.value === feedDose.value
);

const temperatureFormError = reactive({
  isVisible: false,
  text: "",
});
async function fetchFeeds() {
  if (!feeds.value.length) {
    await getFeedTypes();
  }
}

function handleDoseProposeRequest() {
  if (!temperatureInput.value) {
    temperatureFormError.isVisible = true;
    temperatureFormError.text = "Please provide temperature higher than 2*C";
    return;
  }
  proposedFeedDose.value = feedDose.value = 2.5;

  weightGainedAfterFeed.value = proposedFeedDose.value * 1; //FCR;
}
async function getCurrentDose() {
  if (!props.feedInformation.currentFeed) return;
  const response = await FeedTablesService.get(
    props.feedInformation.currentFeed.feed._id,
    "",
    `species/${props.mainSpecie.specie}`
  );
  if (response.success) {
    console.log(response.data);
  }
}
function setDefaultValuesInForm() {
  temperatureInput.value = 14;
  feedDose.value = currentDose.value.amount;
  weightGainedAfterFeed.value = currentDose.value.weightGainAfterDose;
}

function setDoseAsTerminated() {
  const terminatedFeedDose = new FeedDoseDTO({
    number: currentDose.value.number,
    date: currentDoseDate.value,
    amount: feedDose.value,
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
    amount: feedDose.value,
    weightGainAfterDose: weightGainedAfterFeed.value,
    temperature: temperatureInput.value,
    terminated: DoseTermination.OMITTED,
  });
  emit("dose-omitted", terminatedFeedDose);
  setDefaultValuesInForm();
}
onBeforeMount(() => {
  fetchFeeds();
  getCurrentDose();
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
