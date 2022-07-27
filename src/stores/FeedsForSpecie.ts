import { defineStore } from "pinia";
import { FeedsForSpecieStore } from "@/types/store/FeedsForSpecieStore";
import { FeedsForSpecieService } from "@/api/endpoints";
import { SpeciesValues } from "@/types/Livestock";
export const useFeedForSpecie = defineStore("FeedsForSpecieStore", {
  state: (): FeedsForSpecieStore => ({
    feedsForSpecie: null,
    specie: null,
    loader: false,
  }),
  actions: {
    async getFeedsForSpecie(specie: SpeciesValues) {
      this.loader = true;
      const response = await FeedsForSpecieService.fetch({
        url: specie,
      });
      if (response.success) {
        this.$state.feedsForSpecie = response.data.sort((a, b) =>
          a.feed.quality > b.feed.quality ? 1 : -1
        );
        this.$state.specie = specie;
      }
      this.loader = false;
    },
  },
  getters: {
    getFeedForSpecieById: (state) => (feedSpecieId: string) => {
      if (!state.feedsForSpecie?.length) return null;
      return (
        state.feedsForSpecie?.find(
          (feedSpecie) => feedSpecie._id === feedSpecieId
        ) || null
      );
    },
  },
});
