<template>
  <v-card tag="section" color="transparent" flat>
    <h3
      class="my-4 h-3 text-center uppercase"
      v-text="$t('feedInformation.feedInformation')"
    ></h3>
    <v-form>
      <v-container @click="showValidationError = false">
        <v-row
          ><v-col cols="12">
            <v-sheet :loading="loadingFeeds" color="transparent">
              <feed-select
                v-if="feeds.length"
                v-model="copyOfModelValue.currentFeed"
                :feeds-options="feeds"
              />
            </v-sheet>
          </v-col>
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
import FeedSelect from "@/components/modules/addTank/FeedSelect.vue";
import DoseUpdater from "@/components/modules/addTank/DoseUpdater.vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { ref, computed, withDefaults, onBeforeMount } from "vue";
import { TankFeedInformation } from "@/types/Tank";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { TypesOfFeedProgram } from "@/constants/enums/Feed";
import { useFeedStore } from "@/stores/FeedStore";
import { storeToRefs } from "pinia";

const props = withDefaults(
  defineProps<{
    modelValue: TankFeedInformation;
    livestockWeight: number;
  }>(),
  {
    modelValue: () => new FeedInformationDTO({}),
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", feedInformation: TankFeedInformation): void;
}>();

const { feeds, loadingFeeds } = storeToRefs(useFeedStore());
const { getFeeds } = useFeedStore();

const doseUpdater = ref<InstanceType<typeof DoseUpdater> | null>(null);

const showValidationError = ref(false);

const copyOfModelValue = computed(() => props.modelValue);

async function validateFeedInformation(): Promise<boolean> {
  if (doseUpdater.value && !(await doseUpdater.value.validateDoseUpdate())) {
    showValidationError.value = true;
    return false;
  }

  emit(
    "update:modelValue",
    new FeedInformationDTO({
      ...props.modelValue,
      ...{ typeOfProgram: TypesOfFeedProgram.FEED_PROGRAM },
    })
  );
  return true;
}
onBeforeMount(() => {
  if (!feeds.value.length) getFeeds();
});
</script>
