import { defineStore } from "pinia";
import { HomePageStore } from "@/types/store/HomePageStore";
import { IdAttributes } from "@/constants/IdAttributes";
export const useHomePageStore = defineStore("HomePageStore", {
  state: () =>
    ({
      showAboutSection: false,
    } as HomePageStore),
  actions: {
    scrollIntoAboutSection() {
      if (this.$state.showAboutSection)
        document
          .getElementById(IdAttributes.ABOUT_SECTION)
          ?.scrollIntoView({ behavior: "smooth" });
      else this.$state.showAboutSection = true;
    },
  },
});
