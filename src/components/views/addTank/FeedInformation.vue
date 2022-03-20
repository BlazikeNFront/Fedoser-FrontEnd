<template>
  <div>
    <h3 class="my-4 f-30 text-center uppercase">Select feed</h3>
    <div class="d-flex flex-column">
      <select name="feed" id="feed" v-model="currentOption">
        <option :value="TypesOfFeedProgram.UNSELECTED">
          Dont select any feed
        </option>
        <option :value="TypesOfFeedProgram.FEED_PROGRAM">
          Create feed program
        </option>
        <option :value="TypesOfFeedProgram.DAILY_UPDATES">
          Select feed with daily dose update
        </option>
      </select>
    </div>
    <div v-if="currentOption !== TypesOfFeedProgram.UNSELECTED">
      <div
        class="mb-4 pt-4"
        style="min-height: 350px"
        v-if="currentOption === TypesOfFeedProgram.FEED_PROGRAM"
      >
        <div>
          <stable-feed-program-creator
            v-model="feedInformationModel"
            @update:modelValue="feedInformationModel = $event"
            :livestock-weight="livestockWeight"
          />
        </div>
      </div>
      <div
        class="mb-4 pt-4"
        style="min-height: 350px"
        v-if="currentOption === TypesOfFeedProgram.DAILY_UPDATES"
      >
        <dynamic-feed-program-creator
          v-model:feedInformation="feedInformationModel"
          @update:modelValue="feedInformationModel = $event"
          :livestock-weight="livestockWeight"
        />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, WritableComputedRef } from "vue";
import { TypesOfFeedProgram } from "@/constants/enums/FeedSelect";
import StableFeedProgramCreator from "@/components/common/feedProgram/creators/StableFeedProgramCreator.vue";
import DynamicFeedProgramCreator from "@/components/common/feedProgram/creators/DynamicFeedProgramCreator.vue";
import { FeedInformation } from "@/types/FeedInfomation";

const props = defineProps<{
  modelValue: FeedInformation;
  livestockWeight: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const feedInformationModel: WritableComputedRef<FeedInformation> = computed({
  get(): FeedInformation {
    return props.modelValue;
  },
  set(newFeedInformation: FeedInformation) {
    emit("update:modelValue", newFeedInformation);
  },
});
const currentOption = ref(TypesOfFeedProgram.UNSELECTED);
</script>
