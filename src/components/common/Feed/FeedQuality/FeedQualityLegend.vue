<template>
  <v-dialog v-model="feedQualityLegendDialog" class="editor-dialog">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="app-button mx-auto f-15"
        width="200"
        color="blue"
        v-text="$t('feedInformation.feedQuality')"
      />
    </template>
    <div
      class="feed-quality-legend__article px-3 py-5 d-flex flex-column align-center justify-space-around"
    >
      <p class="f-2 mb-3 text-white font-weight-bold">
        {{ $t("feedInformation.feedQualityLegend") }}
      </p>
      <v-sheet
        class="px-3 pt-4 pb-8 d-flex align-center justify-space-around w-100 radius-3 over-hidden"
        color="white"
      >
        <feed-quality-display
          v-for="quality in FeedQuality"
          :key="quality"
          :quality="quality"
          class="pos-relative"
        >
          <template v-if="FEED_QUALITY_WITH_TEXT.includes(quality)" #default>
            <p class="f-15 feed-quality-legend__quality-text">
              {{
                quality === FeedQuality.FIRST
                  ? $t("feedInformation.hightQuality")
                  : $t("feedInformation.lowQuality")
              }}
            </p>
          </template>
        </feed-quality-display>
      </v-sheet>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import FeedQualityDisplay from "@/components/common/Feed/FeedQuality/FeedQualityDisplay.vue";
import { ref } from "vue";
import { FeedQuality } from "@/constants/enums/Feed";

const FEED_QUALITY_WITH_TEXT = [FeedQuality.FIRST, FeedQuality.SEVENTH];
const feedQualityLegendDialog = ref(false);
</script>
<style lang="scss">
.feed-quality-legend__article {
  background-color: rgb(var(--v-theme-violet));
  min-height: 20rem;
}
.feed-quality-legend__quality-text {
  position: absolute;
  bottom: -2.5rem;
}
</style>
