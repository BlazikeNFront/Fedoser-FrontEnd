<template>
  <div>
    <terminated-dose-list :terminated-dose-list="terminatedDoses || []" />
    <dose-manager
      :feed-program="feedInformation.feedProgram"
      :type-of-program="feedInformation.typeOfProgram!"
      @dose-terminated="terminateDose"
      @dose-omitted="terminateDose"
    />
  </div>
</template>
<script setup lang="ts">
import { inject, computed } from "vue";
import { FeedInformation } from "@/types/FeedInfomation";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";
import { FeedDose } from "@/types/FeedDose";
import DoseManager from "@/components/common/feedProgram/DoseManager.vue";
import { TANK_ID } from "@/constants/providersNames/providersNames";
import { FeedInformationDoseService } from "@/services/endpoints/TankFeedInformation";
import TerminatedDoseList from "@/components/common/feedProgram/TerminatedDoseList.vue";

const props = defineProps<{
  feedInformation: Required<FeedInformation>;
  livestockWeight: number | null;
}>();

const { tankId } = inject(TANK_ID) as { tankId: string };
const feedInformationModel = computed(() => props.feedInformation);
const terminatedDoses = computed(() =>
  feedInformationModel.value?.feedProgram.filter((dose) => dose.terminated)
);

async function terminateDose(dose: FeedDose) {
  let requestResult;
  console.log(dose);
  if (props.feedInformation.typeOfProgram === TypesOfFeedProgram.FEED_PROGRAM)
    requestResult = await FeedInformationDoseService.update(
      `${tankId}/${dose.number}`,
      dose,
      "terminate"
    );
  else
    requestResult = requestResult = await FeedInformationDoseService.update(
      tankId,
      dose,
      "add-feed-dose"
    );
  if (requestResult.success) {
    console.log(requestResult);
  }
}
</script>
