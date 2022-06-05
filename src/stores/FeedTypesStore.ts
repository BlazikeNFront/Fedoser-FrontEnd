import { defineStore } from "pinia";
import { FeedTypesStore } from "@/types/store/FeedTypesStore";
import FeedService from "@/services/endpoints/FeedType";
export const useFeedTypesStore = defineStore("FeedTypesStore", {
  state: (): FeedTypesStore => ({
    feeds: [],
    loadingFeeds: false,
  }),
  actions: {
    async getFeedTypes() {
      this.loadingFeeds = true;
      const response = await FeedService.fetch();
      if (response.success) this.feeds = response.data;
      this.loadingFeeds = false;
    },
  },
});
