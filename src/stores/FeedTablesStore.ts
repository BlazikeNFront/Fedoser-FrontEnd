import { defineStore } from "pinia";
import { FeedTablesStore } from "@/types/store/FeedTablesStore";
import FeedEntityService from "@/services/endpoints/FeedTables";
export const useFeedTablesStore = defineStore("FeedTablesStore", {
  state: () =>
    ({
      feeds: [],
    } as FeedTablesStore),
  actions: {
    async getFeeds() {
      const response = await FeedEntityService.fetch();
      if (response.success) this.feeds = response.data;
    },
  },
});
