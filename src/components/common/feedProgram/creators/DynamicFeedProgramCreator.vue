<template>
  <div class="d-flex flex-column">
    <feed-select v-model="selectedFeed" />
    <dose-updater v-model="doseUpdateFrequency" />
    <button @click="acceptFeedData">Accept Data</button>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from "vue";
import FeedSelect from "@/components/common/Feed/FeedSelect.vue";
import DoseUpdater from "@/components/common/Feed/DoseUpdater.vue";
import {
  FeedProgramUpdateFrequency,
  TypesOfFeedProgram,
} from "@/constants/enums/FeedSelect";
import { FeedInformation } from "@/types/FeedInfomation";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";

const props = withDefaults(
  defineProps<{
    feedInformation: FeedInformation;
    livestockWeight: number;
  }>(),
  {
    feedInformation: () => new FeedInformationDTO({}),
  }
);

const selectedFeed = ref(null);
const emit = defineEmits(["update:modelValue"]);

const doseUpdateFrequency = ref(FeedProgramUpdateFrequency.WEEK);
function acceptFeedData() {
  const newFeedInformation: Partial<FeedInformation> = {
    currentFeed: selectedFeed.value,
    doseUpdateFrequency: doseUpdateFrequency.value,
    feedProgram: [],
    typeOfProgram: TypesOfFeedProgram.DAILY_UPDATES,
    currentLivestockWeight: props.livestockWeight,
  };
  emit("update:modelValue", new FeedInformationDTO(newFeedInformation));
}
</script>

<style></style>
