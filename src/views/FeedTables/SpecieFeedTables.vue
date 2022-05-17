<template>
  <v-card tag="section" color="violet" class="px-3 py-2">
    <h2 class="text-h2">
      {{ $t("feedTables.tableFor") }} <span v-text="$route.params.specie" />
    </h2>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import FeedEntityService from "@/services/endpoints/Feeds";
const { params } = useRoute();
const isLoading = ref(false);
// const feeds = ref<FeedTable[]|null>(null)
async function getFeedsForSpecie() {
  const response = await FeedEntityService.fetch({
    params: { specie: params.specie },
  });
  if (response.success) {
    console.log(response.data);
  }
}
onBeforeMount(() => getFeedsForSpecie());
</script>

<style lang="scss" scoped>
section {
  min-height: 80vh;
}
</style>
