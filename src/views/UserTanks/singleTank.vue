<template>
  <v-card color="violet" min-height="80vh">
    <section v-if="tank">
      <h2
        class="h-2 text-center py-2"
        v-text="tank.mainTankInformation.name"
      ></h2>
      <v-tabs class="single-tank__tabs" v-model="currentTab" grow show-arrows>
        <v-tab
          v-for="key in TABS"
          :key="key.tab"
          selected-class="single-tank__tab--active"
          class="f-15 single-tank__tab"
          v-text="$t(`global.${key.text}`)"
        />
      </v-tabs>

      <v-window v-model="currentTab">
        <v-window-item :value="0"><main-info-tab :tank="tank" /></v-window-item>
        <v-window-item :value="1"><livestock-tab :tank="tank" /></v-window-item>
        <v-window-item :value="2"><feed-program-tab /></v-window-item>
        <v-window-item :value="3"
          ><notes-tab :notes="tank.annotations"
        /></v-window-item>
      </v-window>
    </section>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import MainInfoTab from "@/components/modules/singleTank/Tabs/MainInfoTab.vue";
import LivestockTab from "@/components/modules/singleTank/Tabs/LivestockTab.vue";
import NotesTab from "@/components/modules/singleTank/Tabs/NotesTab.vue";
import { TankService } from "@/api/endpoints";
import { useTankStore } from "@/stores/TankStore";
import { storeToRefs } from "pinia";
import FeedProgramTab from "@/components/modules/singleTank/Tabs/FeedProgramTab.vue";
// for some reason v-tabs always update as number - maybe its's vuetify beta 'feature'... When it will operate also on string array could be reduced to arrays of texts =>[]string
const TABS = [
  { tab: 0, text: "mainData" },
  { tab: 1, text: "livestock" },
  { tab: 2, text: "feedProgram" },
  { tab: 3, text: "annotations" },
];
const route = useRoute();

const tankStore = useTankStore();
const { tank } = storeToRefs(tankStore);

const tankId = route.params.id as string;
const currentTab = ref<number>(0);

onBeforeMount(async () => {
  const request = await TankService.get({ url: tankId });
  if (request.success) {
    const { setTank } = tankStore;
    setTank(request.data);
  }
});
</script>
<style lang="scss" scoped>
.single-tank__tab {
  background-color: rgba(var(--v-theme-yellow), 0.75);
  &--active {
    background-color: rgba(var(--v-theme-yellow), 1);
  }
}

.single-tank__tabs :deep(.v-tab:first-child) {
  margin-inline-start: 0px !important;
}
.single-tank__tabs :deep(.v-tab:last-child) {
  margin-inline-end: 0px !important;
}
.single-tank__tabs :deep(.v-icon--size-default) {
  font-size: 4rem !important;
}
</style>
