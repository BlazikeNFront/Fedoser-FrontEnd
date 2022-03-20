<template>
  <div class="feedProgram">
    <div class="d-flex">
      <div>
        <feed-select v-model="selectedFeed" />
        <dose-updater v-model="doseUpdateFrequency" />
        <div class="form-control">
          <label for="desiredWeightInput">Desired Weight</label>
          <input
            name="desiredWeightInput"
            v-model="desiredWeight"
            type="number"
            style="text-align: center"
          />
        </div>
        <div class="form-control">
          <label for="waterTemperature">Water temnperature</label>
          <input
            name="waterTemperature"
            v-model="waterTemperature"
            type="number"
            style="text-align: center"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex flex-column">
        <button class="button" @click="handleFeedProgramRequest">
          Create feed program
        </button>
        <div v-if="proposedFeedProgram" class="d-flex flex-column">
          <ul
            class="d-flex align-center justify-center"
            style="flex-wrap: wrap"
          >
            <li
              class="d-flex flex-column align-center justify-center"
              v-for="dose in proposedFeedProgram"
              :key="dose.number"
              style="border: 1px solid blue; padding: 5px 10px"
            >
              <div class="d-flex align-center justify-center flex-column">
                <div class="d-flex align-center justify-center">
                  <span style="font-size: 15px; font-weight: 600"
                    >{{ dose.number }}.</span
                  >
                  <p>Dose:{{ dose.amount }}kg</p>
                </div>
                <p>
                  Livestock weight gain after dose:{{
                    dose.weightGainAfterDose
                  }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p v-if="formError.isVisible" class="text-center">
        {{ formError.errorText }}
      </p>
    </div>
  </div>
</template>
>

<script setup lang="ts">
import { ref, reactive } from "vue";
import FeedSelect from "@/components/common/Feed/FeedSelect.vue";
import DoseUpdater from "@/components/common/Feed/DoseUpdater.vue";
import { Feed } from "@/types/Feed";
import {
  FeedProgramUpdateFrequency,
  TypesOfFeedProgram,
} from "@/constants/enums/FeedSelect";
import { DoseTermination } from "@/constants/enums/DoseTermination";
import { FeedInformation } from "@/types/FeedInfomation";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
  },
  livestockWeight: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const formError = reactive({
  isVisible: false,
  errorText: "",
});
const formNotification = reactive({
  isVisible: false,
  text: "",
});

const selectedFeed = ref<Feed | null>(null);
const waterTemperature = ref<number | null>(null);
const proposedFeedProgram = ref<FeedDoseDTO[]>([]);
const doseUpdateFrequency = ref<FeedProgramUpdateFrequency | null>(
  FeedProgramUpdateFrequency.WEEK
);
const desiredWeight = ref<number | null>(null);

function validateForm() {
  if (!selectedFeed.value) {
    formError.isVisible = true;
    formError.errorText = "Please select Feed";
    return false;
  }
  if (!desiredWeight.value) {
    formError.isVisible = true;
    formError.errorText = "Please set desired weight";
    return false;
  }
  if (desiredWeight.value <= props.livestockWeight) {
    formError.isVisible = true;
    formError.errorText = "Desired weight need to be higher than current mass";

    return false;
  }
  if (!waterTemperature.value) {
    formError.isVisible = true;
    formError.errorText = "Please select water temperature";
    return false;
  }

  return true;
}

function handleFeedProgramRequest() {
  if (!validateForm()) return;

  proposedFeedProgram.value = createNewFeedProgram();
  acceptFeedProgram();
}

// this function should be on backend
function createNewFeedProgram(): FeedDoseDTO[] {
  if (
    !desiredWeight.value ||
    !doseUpdateFrequency.value ||
    !selectedFeed.value ||
    !waterTemperature.value
  )
    return [];
  const feedProgram: FeedDoseDTO[] = [];
  let weightStamp = props.livestockWeight;

  const doseMultiplier = 1; //THIS NEEDS TO BE DYNAMIC WITH FEED TABLE
  let feedDoseWeight = (+weightStamp / 100) * +doseMultiplier;

  // create dose and add it to feedProgram  until desired weight provided by user will be achived
  for (let i = 1; weightStamp <= desiredWeight.value; i++) {
    if (i % +doseUpdateFrequency.value === 0) {
      feedDoseWeight = Number(
        ((+weightStamp / 100) * +doseMultiplier).toFixed(2)
      );
    }
    const newDose = new FeedDoseDTO({
      number: i,
      amount: feedDoseWeight,
      date: null,
      temperature: waterTemperature.value,
      weightGainAfterDose: Number(
        (+feedDoseWeight * +selectedFeed.value.fcr).toFixed(2)
      ),
      terminated: DoseTermination.NOT_TERMINATED,
    });
    feedProgram.push(newDose);
    weightStamp = Number(
      (+weightStamp + +newDose.weightGainAfterDose).toFixed(2)
    );
  }
  return feedProgram;
}
function acceptFeedProgram() {
  if (proposedFeedProgram.value.length < 1) return;
  formNotification.isVisible = true;
  formNotification.text = "Accepeted";
  const notifTimeOut = setTimeout(() => {
    formNotification.isVisible = false;
    formNotification.text = "";
    clearTimeout(notifTimeOut);
  }, 2000);
  const newFeedInformation: FeedInformation = {
    currentFeed: selectedFeed.value,
    doseUpdateFrequency: doseUpdateFrequency.value,
    feedProgram: proposedFeedProgram.value,
    usedFeedTotalWeight: 0,
    typeOfProgram: TypesOfFeedProgram.FEED_PROGRAM,
    currentLivestockWeight: props.livestockWeight,
  };

  emit("update:modelValue", newFeedInformation);
}
</script>
<style scoped>
.feedDisplay {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
  border: 2px dotted slateblue;
}
</style>
