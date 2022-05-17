<template>
  <v-card></v-card>
</template>
<script setup lang="ts">
import { FeedEntity } from "@/types/FeedEntity";

defineProps<{
  feedTable: FeedEntity;
}>();
</script>
