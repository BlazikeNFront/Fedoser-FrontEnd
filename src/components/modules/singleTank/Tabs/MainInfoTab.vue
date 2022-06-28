<template>
  <v-container>
    <v-row v-if="tank">
      <v-col cols="12" lg="6">
        <h4
          class="text-h4 my-4 text-center"
          v-text="$t('tank.tankDescriptors')"
        ></h4>

        <main-tank-information-display
          :main-tank-information="tank.mainTankInformation"
          :single-information-attrs="{
            class:
              'ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15',
          }"
      /></v-col>
      <v-col cols="12" lg="6">
        <h4 class="text-h4 my-4 text-center" v-text="$t('global.others')"></h4>
        <main-specie-display
          :livestock="tank.livestockInformation.current"
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
        />
        <livestock-weight-display
          :livestock-weight="
            calcLivestockWeight(tank.livestockInformation.current)
          "
          :text-attrs="{ class: 'ml-2 f-15' }"
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
        />
        <annotations-display
          class="shadow-bg ma-2 py-3 px-5 radius-4 d-flex align-center justify-center f-15 font-weight-bold"
          :text-attrs="{ class: 'ml-2 f-15' }"
          :annotation-number="tank.annotations.length"
        />
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-end"
        ><confirmation-dialog
          :message="$t('tankCard.deleteConfirmation')"
          :onAccept="deleteTankAction"
          class="f-15 delete-button text-white"
          v-text="$t('tankCard.deleteTank')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import MainTankInformationDisplay from "@/components/common/Tank/MainTankInformationDisplay.vue";
import LivestockWeightDisplay from "@/components/common/Tank/TankBasicInfoDisplays/LivestockWeightDisplay.vue";
import MainSpecieDisplay from "@/components/common/Tank/TankBasicInfoDisplays/MainSpecieDisplay.vue";
import AnnotationsDisplay from "@/components/common/Tank/TankBasicInfoDisplays/AnnotationsDisplay.vue";
import ConfirmationDialog from "@/components/common/ConfirmationDialog.vue";
import { calcLivestockWeight } from "@/helpers/calcLivestockWeight";
import TankService from "@/services/endpoints/Tank";
import { useTankStore } from "@/stores/TankStore";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { storeToRefs } from "pinia";
const { push } = useRouter();
const { tank } = storeToRefs(useTankStore());
async function deleteTankAction(): Promise<boolean> {
  if (!tank.value) return false;
  const result = await TankService.delete(tank.value._id);
  if (result.success) {
    await push({ name: RoutesNames.USER_TANKS });
    return true;
  }
  return false;
}
</script>
