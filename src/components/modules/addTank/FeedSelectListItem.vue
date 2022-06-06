<template>
  <v-list-item tag="li" class="text-center">
    <p class="my-3 f-15 w-50">
      {{ `${feed.feedType.name}` }}
      <br />
      {{ `${feed.size}mm` }}
    </p>

    <feed-quality-display class="mx-auto" :quality="feed.feedType.quality" />
  </v-list-item>
</template>
<script setup lang="ts">
import FeedQualityDisplay from "@/components/common/Feed/FeedQuality/FeedQualityDisplay.vue";
import { Feed } from "@/types/Feed";
const props = defineProps<{
  feed: Feed;
}>();
console.log(props.feed);
</script>
