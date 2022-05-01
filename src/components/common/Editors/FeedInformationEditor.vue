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
            <feed-select v-model="copyOfModelValue.currentFeed" />
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
import { ref, computed, withDefaults } from "vue";
import FeedSelect from "@/components/common/Feed/FeedSelect.vue";
import DoseUpdater from "@/components/common/Feed/DoseUpdater.vue";
import { FeedInformation } from "@/types/FeedInfomation";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import TransitionExpand from "../TransitionExpand.vue";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";

const props = withDefaults(
  defineProps<{
    modelValue: FeedInformation;
    livestockWeight: number;
  }>(),
  {
    modelValue: () => new FeedInformationDTO({}),
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", feedInformation: FeedInformation): void;
}>();
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
</script>
