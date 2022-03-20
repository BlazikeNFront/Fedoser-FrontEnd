<template>
  <div>
    <li class="d-flex flex-column align-center justify-center">
      <transition name="hide" mode="out-in">
        <div
          class="d-flex align-center justify-center flex-column"
          style="border: 1px solid blue; padding: 5px 10px"
        >
          <div class="list-element">
            <div class="d-flex flex-column">
              <div>
                <span style="font-size: 15px; font-weight: 600">{{
                  currentDose.number
                }}</span>
                <div class="d-flex align center justify-center flex-column">
                  <p>
                    Date of dose:<span>{{ getCurrentDate() }}</span>
                  </p>

                  <label for="dose date">Dose date</label>
                  <input
                    name="dose date"
                    type="text"
                    v-model="currentDoseDate"
                  />
                </div>
              </div>
              <div class="form-control">
                <label for="temperature">Temperature:</label>
                <input name="temperature" v-model.number="temperatureInput" />
                <button class="button" @click="handleDoseProposeRequest">
                  Calc feed dose
                </button>
                <p v-if="temperatureFormError.isVisible" class="form-error">
                  {{ temperatureFormError.text }}
                </p>
              </div>
              <div class="form-control">
                <label for="temperature">Proposed feed dose:</label>
                <input
                  type="text"
                  class="text-center"
                  :value="proposedFeedDose"
                />g
              </div>
              <div>
                <label for="temperature">Gain weight after feed:</label>
                <input
                  name="temperature"
                  v-model.number="weightGainedAfterFeed"
                />kg
              </div>
              <div class="d-flex">
                <button class="button" @click="setDoseAsTerminated">
                  Mark as Done
                </button>
                <button class="button" @click="setDoseAsOmitted">
                  Mark as Omitted
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
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
  //get dose from stable feed program or create dose in dynamic feed program
  () =>
    new FeedDoseDTO({
      ...(props.feedProgram[indexOfCurrentDose.value] || {
        number: props.feedProgram.length + 1,
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
  if (props.typeOfProgram === TypesOfFeedProgram.DAILY_UPDATES) {
    feedProgramModel.value.push(
      new FeedDoseDTO({ number: currentDose.value.number + 1 })
    );
    setDefaultValuesInForm();
  }
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
  if (props.typeOfProgram === TypesOfFeedProgram.DAILY_UPDATES) {
    setDefaultValuesInForm();
    feedProgramModel.value.push(
      new FeedDoseDTO({ number: currentDose.value.number + 1 })
    );
  }
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
