import { defineStore } from "pinia";

interface NavDrawerStore {
  showDrawer: boolean;
}
export const useNavDrawer = defineStore("NavDrawer", {
  state: () =>
    ({
      showDrawer: false,
    } as NavDrawerStore),
  actions: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
  },
});
