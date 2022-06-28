<template>
  <section class="d-flex flex-column align-center justify-center">
    <h3
      class="my-3 text-h3 text-center"
      v-text="$t('feedInformation.currentfeedProgram')"
    ></h3>
    <v-container v-if="tank"
      ><v-row
        ><v-col offset-lg="2" cols="12" lg="8">
          <feed-information-display
            v-if="tank?.feedInformation"
            :feed-information="tank.feedInformation"
          /> </v-col
        ><v-col cols="12" lg="2" class="mt-lg-16 d-flex flex-column">
          <v-dialog
            v-if="tankMainSpecie && !loadingFeedsForSpecie"
            class="editor-dialog"
            v-model="showFeedSelectDialog"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="edit-button mt-lg-3 f-15 font-weight-bold"
                color="black"
                >{{ $t("feedInformation.changeFeed") }}</v-btn
              ></template
            >
            <v-card color="violet" class="pt-2 pb-5 px-4" width="450">
              <p class="mb-4 f-3 text-center">
                {{ $t("feedInformation.selectFeed") }}
              </p>
              <feed-select
                v-if="feedsForSpecie"
                :model-value="tank.feedInformation.currentFeed"
                @update:model-value="onFeedSelectChange($event)"
                :feeds-options="
                  feedOptions(
                    tank.livestockInformation.current[0] || tankMainSpecie
                  )
                "
              />
            </v-card>
          </v-dialog> </v-col></v-row
    ></v-container>

    <div
      v-if="tank?.feedInformation && tankMainSpecie"
      class="d-flex flex-column align-center justify-center"
    >
      <feed-size-info-card v-if="shouldChangeFeedSize" />
      <terminated-dose-list
        v-if="tank.feedInformation.feedProgram.length"
        :terminated-dose-list="tank.feedInformation.feedProgram"
      />

      <dose-manager
        :feed-information="tank.feedInformation"
        :mainSpecie="tankMainSpecie"
        :livestock-weight="tankLivestockWeight"
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
import FeedSelect from "@/components/common/Feed/FeedSelect.vue";
import { useFeedForSpecie } from "@/stores/FeedsForSpecie";
import { FeedSelectOptions } from "@/types/FeedSelectOptions";
import { computed, ref } from "vue";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { CurrentTankFeed } from "@/types/Feed";
import { onBeforeMount } from "vue";
import FeedSizeInfoCard from "@/components/modules/singleTank/FeedProgram/FeedSizeInfoCard.vue";
import { FeedDoseDTO } from "@/utils/DTOs/FeedDose.dto";

const { tank, tankLivestockWeight, tankMainSpecie } = storeToRefs(
  useTankStore()
);
const { changeCurrentTankFeed, terminateTankFeedProgramDose } = useTankStore();

const showFeedSelectDialog = ref(false);
const {
  feedsForSpecie,
  loader: loadingFeedsForSpecie,
  specie: feedsStoreSpecie,
} = storeToRefs(useFeedForSpecie());

const { getFeedsForSpecie } = useFeedForSpecie();
const shouldChangeFeedSize = computed(() => {
  if (
    !tank.value?.feedInformation.currentFeed?.feedForSpecie.maxSize ||
    !tank.value.livestockInformation.current.length
  )
    return false;

  if (
    tank.value.feedInformation.currentFeed.feedForSpecie.maxSize <
    tank.value.livestockInformation.current[0].meanWeight
  )
    return true;
  return false;
});

const feedOptions = computed(
  () =>
    (specie: SingleLivestockSpecie): FeedSelectOptions => {
      const feedSelectOption: FeedSelectOptions = {
        proposedFeeds: [],
        allFeeds: [],
      };
      if (!feedsForSpecie.value) return feedSelectOption;
      const { meanWeight } = specie;
      const proposedFeeds = feedsForSpecie.value.filter((specieFeed) => {
        if (specieFeed.maxSize === null) return specieFeed.minSize < meanWeight;
        return (
          specieFeed.minSize < meanWeight && specieFeed.maxSize > meanWeight
        );
      });
      feedSelectOption.proposedFeeds = proposedFeeds;
      feedSelectOption.allFeeds = feedsForSpecie.value;

      return feedSelectOption;
    }
);
async function terminateDose(dose: FeedDose) {
  if (!tank.value) return;
  const result = await FeedInformationDoseService.create(
    new FeedDoseDTO(dose),
    `${tank.value._id}/add-feed-dose`
  );
  if (result.success) terminateTankFeedProgramDose(dose);
}

async function onFeedSelectChange(selectedFeed: CurrentTankFeed) {
  if (
    !tank.value ||
    selectedFeed.feedForSpecie._id ===
      tank.value?.feedInformation.currentFeed?.feedForSpecie._id
  )
    return;
  await changeCurrentTankFeed(selectedFeed);
  showFeedSelectDialog.value = false;
}
onBeforeMount(async () => {
  if (
    tankMainSpecie.value &&
    feedsStoreSpecie.value !== tankMainSpecie.value?.specie
  )
    await getFeedsForSpecie(tankMainSpecie.value.specie);
});
</script>
