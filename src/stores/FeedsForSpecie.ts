import { defineStore } from "pinia";
import { FeedsForSpecieStore } from "@/types/store/FeedsForSpecieStore";
import FeedsForSpecieService from "@/services/endpoints/FeedsForSpecie";
import { SpeciesValues } from "@/types/Livestock";
export const useFeedForSpecie = defineStore("FeedsForSpecieStore", {
  state: (): FeedsForSpecieStore => ({ feedsForSpecie: null, loader: false }),
  actions: {
    async getFeedsForSpecie(specie: SpeciesValues) {
      const response = await FeedsForSpecieService.get(specie);
      if (response.success) this.$state.feedsForSpecie = response.data;
    },
  },
});
