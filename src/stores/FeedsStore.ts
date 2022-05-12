import { defineStore } from "pinia";
import { FeedStore } from "@/types/store/FeedStore";
import FeedEntityService from "@/services/endpoints/Feeds";
export const useFeedStore = defineStore("FeedStore", {
  state: () =>
    ({
      feeds: [],
    } as FeedStore),
  actions: {
    async getFeeds() {
      const response = await FeedEntityService.fetch();
      if (response.success) this.feeds = response.data;
    },
  },
});
