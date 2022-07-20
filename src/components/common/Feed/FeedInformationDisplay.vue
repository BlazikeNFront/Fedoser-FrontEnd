<template>
  <v-card tag="article" flat color="transparent">
    <v-container class="feed-information__flexbox text-center"
      ><v-row
        ><v-col cols="12" class="d-flex align-center justify-center">
          <icon-display
            keypath="tankCard.feedProgram"
            :boolean="!!feedInformation.currentFeed"
            template-name="feedProgram"
            class="f-2 w-100"
          />
        </v-col>
        <v-col v-if="feedInformation.currentFeed" cols="12" class="my-2"
          ><current-feed-display
            :feed="feedInformation.currentFeed.feedForSpecie.feed"
            :size="feedInformation.currentFeed.feedForSpecie.size"
          />
        </v-col>
        <v-col v-if="feedInformation.doseUpdateFrequency" cols="12"
          ><base-display
            :span-value="feedInformation.doseUpdateFrequency.toString()"
            template-name="updateFrequency"
            keypath="feedInformation.doseUpdateFrequencyDisplay"
        /></v-col> </v-row
    ></v-container>
  </v-card>
</template>
<script setup lang="ts">
import { FeedInformationDto } from "@/types/Feed";
import CurrentFeedDisplay from "@/components/common/Tank/TankBasicInfoDisplays/CurrentFeedDisplay.vue";
import IconDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/IconDisplay.vue";
import BaseDisplay from "@/components/common/Tank/TankBasicInfoDisplays/base/BaseDisplay.vue";

defineProps<{
  feedInformation: FeedInformationDto;
}>();
</script>
