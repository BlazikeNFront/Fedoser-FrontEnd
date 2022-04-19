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
          :key="key"
          selected-class="single-tank__tab--active"
          class="f-15 single-tank__tab"
          v-text="$t(`global.${key}`)"
        ></v-tab>
      </v-tabs>
      <v-window v-model="currentTab">
        <v-window-item
          :value="TABS[0]"
          class="d-flex align-center justify-center"
        >
          <main-tank-information-display
            :main-tank-information="tank.mainTankInformation"
            :single-information-attrs="{
              class:
                'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
            }"
        /></v-window-item>
        <v-window-item
          :value="TABS[1]"
          class="d-flex align-center justify-center"
        >
          <main-tank-information-display
            :main-tank-information="tank.mainTankInformation"
            :single-information-attrs="{
              class:
                'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
            }"
        /></v-window-item>
        <v-window-item
          :value="TABS[2]"
          class="d-flex align-center justify-center"
        >
          <main-tank-information-display
            :main-tank-information="tank.mainTankInformation"
            :single-information-attrs="{
              class:
                'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
            }"
        /></v-window-item>
        <v-window-item
          :value="TABS[3]"
          class="d-flex align-center justify-center"
        >
          <main-tank-information-display
            :main-tank-information="tank.mainTankInformation"
            :single-information-attrs="{
              class:
                'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
            }"
        /></v-window-item>
      </v-window>
    </section>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, readonly, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainTankInformationDisplay from "@/components/common/Displays/MainTankInformationDisplay.vue";
import { Tank } from "@/types/Tank";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
import { TANK_ID } from "@/constants/providersNames/providersNames";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { API_DATA_KEY } from "@/constants/global";

const TABS = ["mainData", "livestock", "feedProgram", "annotations"];
const route = useRoute();
const tankId = route.params.id as string;

const router = useRouter();
const tank = ref<Required<Tank> | null>(null);
const currentTab = ref<number>(0);

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
