<template>
  <div>
    <back-button :config="{ name: RoutesNames.USER_TANKS }" />
    <button class="button" @click="handleDeleteRequest">DELETE TANK</button>
    <div class="d-flex">
      <button class="button" @click="changeTab(0)">Main</button>
      <button class="button" @click="changeTab(1)">Feed Program</button>
      <button class="button" @click="changeTab(2)">Annotations</button>
    </div>

    <div v-if="tank" class="d-flex flex-column text-center">
      <div v-if="currentTab === 0">
        <h2>User tank details</h2>
        <tank-main-information-display
          :main-tank-information="tank.mainTankInformation"
        />
        <div>
          <livestock-list
            v-if="tank.livestockInformation?.initialLivestockWeight"
            :livestock-information="tank.livestockInformation"
          />
          <button v-else class="button">Add livestock</button>
        </div>
      </div>
      <div v-if="currentTab === 1">
        <div v-if="!tank.feedInformation">
          <button
            v-if="tank.feedInformation === null"
            @click="addFeedInfomartionTemplate"
          >
            Add feed program
          </button>
        </div>
        <feed-information-editor
          v-else-if="
            !tank.feedInformation?.typeOfProgram &&
            tank.livestockInformation?.initialLivestockWeight
          "
          v-model="tank.feedInformation"
          :livestock-weight="tank.livestockInformation.initialLivestockWeight"
        />

        <tank-feed-program
          v-else
          :feed-information="tank.feedInformation"
          :livestock-weight="
            tank.livestockInformation?.initialLivestockWeight || null
          "
        />
      </div>
      <div v-if="currentTab === 2">
        <tank-annotations :annotations="tank.annotations" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, readonly, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import LivestockList from "@/components/common/Livestock/LivestockList.vue";
import TankMainInformationDisplay from "@/components/modules/singleTank/TankMainInformationDisplay.vue";
import FeedInformationEditor from "@/components/common/Editors/FeedInformationEditor.vue";
import { Tank } from "@/types/Tank";
import TankAnnotations from "@/components/modules/singleTank/TankAnnotations/TankAnnotations.vue";
import TankFeedProgram from "@/components/modules/singleTank/TankFeedProgram.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import TankService from "@/services/endpoints/Tank";
import { TANK_ID } from "@/constants/providersNames/providersNames";
import { FeedInformationDTO } from "@/utils/DTOs/FeedInformation.dto";
import { API_DATA_KEY } from "@/constants/global";
import BackButton from "@/components/common/BackButton.vue";
const route = useRoute();
const tankId = route.params.id as string;
const router = useRouter();
const tank = ref<Required<Tank> | null>(null);
const currentTab = ref<number>(0);
function changeTab(tabNumber: number) {
  currentTab.value = tabNumber;
}
onBeforeMount(async () => {
  const request = await TankService.get(tankId);
  if (API_DATA_KEY in request) tank.value = request.data;
  console.log(tank.value);
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
