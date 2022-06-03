import { defineStore } from "pinia";
import { FeedStore } from "@/types/store/FeedStore";
import FeedService from "@/services/endpoints/Feeds";
export const useFeedStore = defineStore("FeedStore", {
  state: (): FeedStore => ({
    feeds: [],
    loadingFeeds: false,
  }),
  actions: {
    async getFeeds() {
      this.loadingFeeds = true;
      const response = await FeedService.fetch();
      if (response.success) this.feeds = response.data;
      this.loadingFeeds = false;
    },
  },
});
