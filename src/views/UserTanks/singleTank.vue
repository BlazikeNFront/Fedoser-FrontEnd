<template>
  <v-card color="violet">
    <section v-if="tank">
      <h2
        class="h-2 text-center py-2"
        v-text="tank.mainTankInformation.name"
      ></h2>
      <v-tabs v-model="currentTab" grow>
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
        <v-window-item :value="2"
          ><feed-information-display :feed-information="tank.feedInformation"
        /></v-window-item>
        <v-window-item :value="3"></v-window-item>
      </v-window>
    </section>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, watch, readonly, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainInfoTab from "@/components/modules/singleTank/Tabs/MainInfoTab.vue";
import LivestockTab from "@/components/modules/singleTank/Tabs/LivestockTab.vue";
import { Tank } from "@/types/Tank";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
import { TANK_ID } from "@/constants/providersNames/providersNames";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { API_DATA_KEY } from "@/constants/global";

import FeedInformationDisplay from "@/components/common/Displays/FeedInformationDisplay.vue";
// for some reason v-tabs always update as number - maybe vuetify beta 'feature', when it will operate also on string array could be reduced to arrays of texts =>[]string
const TABS = [
  { tab: 0, text: "mainData" },
  { tab: 1, text: "livestock" },
  { tab: 2, text: "feedProgram" },
  { tab: 3, text: "annotations" },
];
const route = useRoute();
const tankId = route.params.id as string;

const router = useRouter();
const tank = ref<Required<Tank> | null>(null);
const currentTab = ref<number>(0);
watch(currentTab, (newVal) => console.log(newVal));
onBeforeMount(async () => {
  const request = await TankService.get(tankId);

  if (API_DATA_KEY in request) tank.value = request.data;
});

provide(TANK_ID, readonly({ tankId }));

function addFeedInfomartionTemplate() {
  if (tank.value) tank.value.feedInformation = new FeedInformationDTO({});
}
async function handleDeleteRequest() {
  if (!tank.value) return;
  const request = await TankService.delete(tank.value._id);
  if (request.success) router.push({ name: RoutesNames.USER_TANKS });
}
</script>
<style lang="scss">
.single-tank__tab {
  background-color: rgba(var(--v-theme-yellow), 0.75);
  &--active {
    background-color: rgba(var(--v-theme-yellow), 1);
  }
}
</style>
