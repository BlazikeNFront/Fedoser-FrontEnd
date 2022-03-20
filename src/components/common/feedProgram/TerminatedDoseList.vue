<template>
  <div class="d-flex flex-column">
    <button
      class="button"
      @click="showAllTerminatedDoses = !showAllTerminatedDoses"
    >
      Show all doses
    </button>
    <transition-expand>
      <ul v-if="showAllTerminatedDoses">
        <li
          class="d-flex align-center justify-center"
          v-for="(dose, index) in terminatedDoseList"
          :key="dose.number"
        >
          <div
            class="d-flex align-center justify-center flex-column"
            style="border: 1px solid blue; padding: 5px 10px"
          >
            <div class="d-flex flex-column align-center justify-center">
              <button
                v-if="index === terminatedDoseList.length - 1"
                class="button"
                @click="showEditDialog = true"
              >
                EDIT
              </button>
              <span style="font-size: 15px; font-weight: 600"
                >{{ dose.number }}.</span
              >
              <p>Terminated date: {{ dose.date }}</p>
              <div v-if="dose.terminated === DoseTermination.DONE">
                <p>Dose:{{ dose.amount }}kg</p>
                <p>
                  Livestock weight gain after dose:{{
                    dose.weightGainAfterDose
                  }}
                </p>
              </div>
              <p v-else>Dose marked as omitted</p>
            </div>
          </div>
        </li>
      </ul>
    </transition-expand>
    <li
      v-if="!showAllTerminatedDoses && lastDose"
      class="d-flex align-center justify-center"
    >
      <div
        class="d-flex align-center justify-center flex-column"
        style="border: 1px solid blue; padding: 5px 10px"
      >
        <div class="d-flex flex-column align-center justify-center">
          <button class="button">EDIT</button>
          <span style="font-size: 15px; font-weight: 600"
            >{{ lastDose.number }}.</span
          >
          <p>Terminated date: {{ lastDose.date }}</p>
          <div v-if="lastDose.terminated === DoseTermination.DONE">
            <p>Dose:{{ lastDose.amount }}kg</p>
            <p>
              Livestock weight gain after dose:{{
                lastDose.weightGainAfterDose
              }}
            </p>
          </div>
          <p v-else>Dose marked as omitted</p>
        </div>
      </div>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { DoseTermination } from "@/constants/enums/DoseTermination";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { FeedDose } from "@/types/FeedDose";
const props = defineProps<{
  terminatedDoseList: FeedDose[];
}>();

const showAllTerminatedDoses = ref(false);
const showEditDialog = ref(false);
const lastDose = computed(() =>
  props.terminatedDoseList.find(
    (_, index) => index === props.terminatedDoseList.length - 1
  )
);
</script>

<style></style>
