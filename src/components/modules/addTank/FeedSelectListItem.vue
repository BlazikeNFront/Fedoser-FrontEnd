<template>
  <v-list-item
    tag="li"
    class="f-15 text-center d-flex flex-column"
    style="border-bottom: 1px solid rgb(var(--v-theme-yellow))"
  >
    <p v-if="isCurrentlySelected">
      {{ $t("feedInformation.currentSelected") }}
    </p>
    <div class="w-100 d-flex align-center justify-space-around">
      <p class="my-3 f-15 w-50">
        {{ `${feedForSpecie.feed.name}` }}
        <br />
        {{ `${feedForSpecie.size}mm` }}
        <br />
        {{
          `${feedForSpecie.minSize}g ${
            feedForSpecie.maxSize ? `- ${feedForSpecie.maxSize}g` : ""
          }`
        }}
      </p>

      <feed-quality-display
        class="mx-auto"
        :quality="feedForSpecie.feed.quality"
      />
    </div>
  </v-list-item>
</template>
<script setup lang="ts">
import FeedQualityDisplay from "@/components/common/Feed/FeedQuality/FeedQualityDisplay.vue";
import { FeedForSpecie } from "@/types/Feed";
defineProps<{
  feedForSpecie: FeedForSpecie;
  isCurrentlySelected?: boolean;
}>();
</script>
