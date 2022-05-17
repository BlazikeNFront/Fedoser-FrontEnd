<template>
  <v-card color="violet" class="specie-feed-table-card pointer" rounded>
    <img :src="feedTableSpecie.imageUrl" :alt="$t('alts.specieFeedTable')" />
    <div class="test"></div>
    <h3
      class="text-h3 text-uppercase text-center d-flex align-center justify-center"
      v-text="feedTableSpecie.specie"
    ></h3>
  </v-card>
</template>
<script setup lang="ts">
import { FeedTableSpecie } from "@/types/FeedTable";
defineProps<{
  feedTableSpecie: FeedTableSpecie;
}>();
</script>
<style lang="scss">
.specie-feed-table-card {
  position: relative;
  height: 30rem;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
  }
  .test {
    position: absolute;
    bottom: 0;
    background-color: rgb(var(--v-theme-violet));
    width: 100%;
    height: 4.5rem;
    max-height: 4.5rem;
    transition: max-height 0.5s ease;
  }
  h3 {
    position: absolute;
    width: 100%;
    height: 4rem;
    max-height: 4rem;
    bottom: 0.4rem;
    letter-spacing: 0.3rem !important;
    transition: all 0.5s ease;
  }
  &:hover {
    .test {
      max-height: 0;
    }
    img {
      transform: scale(1.1);
      height: 100%;
      filter: brightness(0.2);
    }
    h3 {
      height: 100%;
      bottom: 0;
      max-height: 100%;
      font-weight: 700;
      color: rgb(var(--v-theme-yellow));
    }
  }
}
</style>
