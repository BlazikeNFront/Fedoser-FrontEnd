import { defineStore } from "pinia";
import { FeedTablesStore } from "@/types/store/FeedTablesStore";
import { FeedTablesService } from "@/services/endpoints/FeedTables";
export const useFeedTablesStore = defineStore("FeedTablesStore", {
  state: () =>
    ({
      feeds: [],
    } as FeedTablesStore),
  actions: {
    async getFeeds() {
      console.log("store");
      const response = await FeedTablesService.fetch();
      if (response.success) this.feeds = response.data;
    },
  },
});
