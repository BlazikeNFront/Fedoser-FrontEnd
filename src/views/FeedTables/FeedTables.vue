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
          v-for="(specie, index) in createSpecieList()"
          :key="index"
          cols="12"
          lg="6"
        >
          <feed-table-specie-card
            @click="
              specie.isSupported
                ? $router.push({
                    name: RoutesNames.SPECIE_FEED_TABLES,
                    params: { specie: specie.specie },
                  })
                : null
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
import { Species } from "@/constants/enums/Species";
import { FeedTableSpecie } from "@/types/FeedTablesForSpecie";
import { SpeciesValues } from "@/types/Livestock";
const isLoading = ref(false);

function createSpecieList(): FeedTableSpecie[] {
  return [
    Species.RAINBOW_TROUT,
    "salmon",
    "brookTrout",
    "whitefish",
    "brownTrout",
  ].map((specie) => ({
    specie,
    specieTranslation: `species.${specie}`,
    imageUrl: require(`@/assets/species/${specie}.jpg`),
    isSupported: Object.values(Species).includes(specie as SpeciesValues),
  }));
}
</script>

<style></style>
