<template>
  <v-list-item
    tag="li"
    class="text-center"
    style="border-bottom: 1px solid rgb(var(--v-theme-yellow))"
  >
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
  </v-list-item>
</template>
<script setup lang="ts">
import FeedQualityDisplay from "@/components/common/Feed/FeedQuality/FeedQualityDisplay.vue";
import { FeedForSpecie } from "@/types/Feed";
defineProps<{
  feedForSpecie: FeedForSpecie;
}>();
</script>
