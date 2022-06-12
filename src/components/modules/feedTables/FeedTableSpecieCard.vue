<template>
  <v-card
    color="violet"
    class="specie-feed-table-card"
    :class="{
      'specie-feed-table-card--not-supported': !feedTableSpecie.isSupported,
    }"
    rounded
  >
    <img
      :src="feedTableSpecie.imageUrl"
      :alt="`${$t('global.image')}${$t(feedTableSpecie.specieTranslation)}`"
    />
    <div class="specie-feed-table-card__text-overlay"></div>
    <h3
      class="text-h3 text-uppercase text-center d-flex align-center justify-center"
      v-text="$t(feedTableSpecie.specieTranslation)"
    ></h3>
    <p
      v-if="!feedTableSpecie.isSupported"
      class="specie-feed-table-card__not-supported-text text-yellow f-2"
      v-text="$t('feedTables.notSupportedSpecie')"
    ></p>
  </v-card>
</template>
<script setup lang="ts">
import { FeedTableSpecie } from "@/types/FeedTablesForSpecie";
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
  .specie-feed-table-card__text-overlay {
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
  .specie-feed-table-card__not-supported-text {
    @extend .w-90;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4000;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  &:hover {
    .specie-feed-table-card__text-overlay {
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
    .specie-feed-table-card__not-supported-text {
      opacity: 1;
    }
  }
}
.specie-feed-table-card--not-supported {
  cursor: not-allowed;

  &:hover {
    .specie-feed-table-card__text-overlay {
      max-height: 4.5rem;
    }
    img {
      transform: scale(1);
      height: 100%;
      filter: grayscale(1) brightness(0.3);
    }
    h3 {
      color: rgb(var(--v-theme-white));
      height: 4rem;
      max-height: 4rem;
      bottom: 0.4rem;
      font-weight: 500;
    }
  }
}
</style>
