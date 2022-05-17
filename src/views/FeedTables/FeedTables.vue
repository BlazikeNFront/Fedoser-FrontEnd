<template>
  <v-card tag="section" color="transparent" flat>
    <h2 class="text-center h-2" v-text="$t('global.feedTables')"></h2>
    <v-progress-linear
      v-if="isLoading"
      :active="isLoading"
      :indeterminate="isLoading"
      color="blue"
      height="5"
    />
    <v-container
      ><v-row
        ><v-col
          v-for="(specie, index) in speciesList"
          :key="index"
          cols="12"
          lg="6"
        >
          <feed-table-specie-card
            @click="
              $router.push({
                name: RoutesNames.SPECIE_FEED_TABLES,
                params: { specie: specie.specie },
              })
            "
            :feed-table-specie="specie"
          /> </v-col></v-row
    ></v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FeedTableSpecieCard from "@/components/modules/feedTables/FeedTableSpecieCard.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
const isLoading = ref(false);
const speciesList = [
  {
    specie: "Rainbow Trout",
    imageUrl: require("@/assets/species/rainbowTrout.jpg"),
  },
  {
    specie: "Salmon",
    imageUrl: require("@/assets/species/salmon.jpg"),
  },
  {
    specie: "Whitefish",
    imageUrl: require("@/assets/species/whitefish.jpg"),
  },
  {
    specie: "Brook Trout / Arctic char",
    imageUrl: require("@/assets/species/brookTrout.jpg"),
  },
  {
    specie: "Brown Trout",
    imageUrl: require("@/assets/species/brownTrout.jpg"),
  },
];
</script>

<style></style>
