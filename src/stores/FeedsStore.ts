import { defineStore } from "pinia";
import { FeedsStore } from "@/types/store/FeedsStore";
import { FeedsService } from "@/api/endpoints";
export const useFeedsStore = defineStore("FeedsStore", {
  state: (): FeedsStore => ({ feeds: null, loader: false }),
  actions: {
    async getFeeds() {
      const response = await FeedsService.fetch();
      if (response.success) this.$state.feeds = response.data;
    },
  },
});
