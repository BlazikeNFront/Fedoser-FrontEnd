<template>
  <section class="d-flex flex-column align-center justify-center">
    <h3
      class="my-3 text-h3 text-center"
      v-text="$t('feedInformation.currentfeedProgram')"
    ></h3>
    <feed-information-display
      v-if="tank?.feedInformation"
      :feed-information="tank.feedInformation"
    />
    <dose-manager
      v-if="tank?.feedInformation"
      :feed-program="tank?.feedInformation.feedProgram"
      :type-of-program="tank.feedInformation.typeOfProgram"
      @dose-omitted="terminateDose"
      @dose-terminated="terminateDose"
    />
    <p
      v-else
      class="my-3 f-15 text-center"
      v-text="$t('feedInformation.noFeedProgram')"
    ></p>
  </section>
</template>
<script setup lang="ts">
import { useTankStore } from "@/stores/TankStore";
import { storeToRefs } from "pinia";
import DoseManager from "@/components/common/feedProgram/DoseManager.vue";
import FeedInformationDisplay from "@/components/common/Displays/FeedInformationDisplay.vue";
import { FeedInformationDoseService } from "@/services/endpoints/TankFeedInformation";
import { FeedDose } from "@/types/FeedDose";

const { tank } = storeToRefs(useTankStore());

async function terminateDose(dose: FeedDose) {
  if (!tank.value) return;
  const result = await FeedInformationDoseService.update(
    tank.value._id,
    dose,
    "add-feed-dose"
  );
  if (result.success) {
    console.log(result);
  }
}
</script>
