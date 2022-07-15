<template>
  <v-card tag="section" color="transparent" flat>
    <h3
      class="my-4 h-3 text-center uppercase"
      v-text="$t('feedInformation.feedInformation')"
    ></h3>
    <v-form>
      <v-container @click="showValidationError = false">
        <v-row
          ><v-col
            cols="12"
            offset-lg="4"
            lg="4"
            class="d-flex align-center justify-center"
          >
            <v-sheet :loading="loader" color="transparent" width="40rem">
              <feed-select
                v-if="feedsForSpecie"
                v-model="copyOfModelValue.currentFeed"
                :feeds-options="feedOptions(mainSpecie)"
                force-eval-on-mounted
              />
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="4" class="d-flex align-end justify-center mb-4"
            ><feed-quality-legend
          /></v-col>
          <v-col cols="12"
            ><dose-updater
              ref="doseUpdater"
              v-model="copyOfModelValue.doseUpdateFrequency"
          /></v-col>
        </v-row>
      </v-container>
      <transition-expand>
        <p
          v-if="showValidationError"
          class="mb-4 f-2 text-center text-error"
          v-text="$t('feedInformation.validationErrorMessage')"
        ></p>
      </transition-expand>
    </v-form>
    <slot v-bind="{ validateFeedInformation }" />
  </v-card>
</template>

<script setup lang="ts">
import FeedSelect from "@/components/common/Feed/FeedSelect.vue";
import DoseUpdater from "@/components/modules/addTank/DoseUpdater.vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { ref, computed, withDefaults, onBeforeMount } from "vue";
import { FeedInformationDto } from "@/types/Feed";
import { TypesOfFeedProgram } from "@/constants/enums/Feed";
import { storeToRefs } from "pinia";
import { useFeedForSpecie } from "@/stores/FeedsForSpecie";
import { SingleLivestockSpecie } from "@/types/Livestock";
import { FeedSelectOptions } from "@/types/FeedSelectOptions";
import FeedQualityLegend from "@/components/common/Feed/FeedQuality/FeedQualityLegend.vue";

const props = withDefaults(
  defineProps<{
    modelValue: FeedInformationDto;
    mainSpecie: SingleLivestockSpecie;
  }>(),
  {
    modelValue: () => new FeedInformationDto({}),
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", feedInformation: FeedInformationDto): void;
}>();

const { feedsForSpecie, loader, specie } = storeToRefs(useFeedForSpecie());

const { getFeedsForSpecie } = useFeedForSpecie();

const doseUpdater = ref<InstanceType<typeof DoseUpdater> | null>(null);

const showValidationError = ref(false);

const copyOfModelValue = computed(() => props.modelValue);
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
          specieFeed.minSize <= meanWeight && specieFeed.maxSize > meanWeight
        );
      });
      feedSelectOption.proposedFeeds = proposedFeeds;
      feedSelectOption.allFeeds = feedsForSpecie.value;

      return feedSelectOption;
    }
);
async function getPropsedFeedsForSpecie() {
  if (specie.value === props.mainSpecie.specie) return;
  await getFeedsForSpecie(props.mainSpecie.specie);
}
async function validateFeedInformation(): Promise<boolean> {
  if (doseUpdater.value && !(await doseUpdater.value.validateDoseUpdate())) {
    showValidationError.value = true;
    return false;
  }

  emit(
    "update:modelValue",
    new FeedInformationDto({
      ...props.modelValue,
      ...{ typeOfProgram: TypesOfFeedProgram.FEED_PROGRAM },
    })
  );
  return true;
}
onBeforeMount(async () => {
  await getPropsedFeedsForSpecie();
});
</script>
