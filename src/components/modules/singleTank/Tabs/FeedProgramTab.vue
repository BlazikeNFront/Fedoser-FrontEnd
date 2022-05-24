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
    <div
      v-if="tank?.feedInformation"
      class="d-flex flex-column align-center justify-center"
    >
      <terminated-dose-list
        :terminated-dose-list="tank?.feedInformation.feedProgram"
      />
      <dose-manager
        :feed-program="tank?.feedInformation.feedProgram"
        :type-of-program="tank.feedInformation.typeOfProgram"
        @dose-omitted="terminateDose"
        @dose-terminated="terminateDose"
      />
    </div>
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
import DoseManager from "@/components/modules/singleTank/FeedProgram/DoseManager.vue";
import FeedInformationDisplay from "@/components/common/Feed/FeedInformationDisplay.vue";
import TerminatedDoseList from "@/components/modules/singleTank/FeedProgram/TerminatedDoseList.vue";
import { FeedInformationDoseService } from "@/services/endpoints/TankFeedInformation";
import { FeedDose } from "@/types/Feed";
import { TerminatedFeedDoseDTO } from "@/utils/DTOs/TerminatedFeedDose.dto";
const { tank } = storeToRefs(useTankStore());

async function terminateDose(dose: FeedDose) {
  if (!tank.value || !tank.value.feedInformation.currentLivestockWeight) return;
  const weightsData = {
    currentLivestockWeight: tank.value.feedInformation.currentLivestockWeight,
    usedFeedTotalWeight: tank.value.feedInformation.usedFeedTotalWeight,
  };
  const result = await FeedInformationDoseService.create(
    new TerminatedFeedDoseDTO(dose, weightsData),
    `${tank.value._id}/add-feed-dose`
  );
  if (result.success) {
    tank.value.feedInformation.feedProgram.push(dose);
  }
}
</script>
