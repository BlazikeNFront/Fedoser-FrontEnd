import { defineStore } from "pinia";
import { HomePageStore } from "@/types/store/HomePageStore";

export const useHomePageStore = defineStore("HomePageStore", {
  state: () =>
    ({
      showVideoPage: true,
    } as HomePageStore),
  actions: {
    setShowVideoPage(showVideo: boolean) {
      this.$state.showVideoPage = showVideo;
    },
  },
});
