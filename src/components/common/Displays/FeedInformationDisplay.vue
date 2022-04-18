<template>
  <v-card tag="article" flat color="transparent">
    <v-container class="feed-information__flexbox"
      ><v-row
        ><v-col cols="12" class="d-flex align-center justify-center">
          <feed-program-display
            class="f-2"
            :is-feed-program-set="!!feedInformation.currentFeed"
          />
        </v-col>
        <v-col v-if="feedInformation.currentFeed" cols="12" class="my-2"
          ><current-feed-display :feed="feedInformation.currentFeed" />
        </v-col>
        <v-col v-if="feedInformation.doseUpdateFrequency" cols="12"
          ><dose-update-frequency-display
            class="f-2 text-center"
            :update-frequency="feedInformation.doseUpdateFrequency"
        /></v-col> </v-row
    ></v-container>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { FeedInformation } from "@/types/FeedInfomation";
import FeedProgramDisplay from "@/components/common/TankBasicInfoDisplays/FeedProgramDisplay.vue";
import CurrentFeedDisplay from "@/components/common/TankBasicInfoDisplays/CurrentFeedDisplay.vue";
import DoseUpdateFrequencyDisplay from "@/components/common/TankBasicInfoDisplays/DoseUpdateFrequencyDisplay.vue";
const props = defineProps<{
  feedInformation: FeedInformation;
}>();
onMounted(() => {
  console.log(props.feedInformation);
});
</script>
<style lang="scss">
.feed-information__flexbox {
  .v-col {
    @extend .shadow-bg, .radius-4;
  }
}
</style>
